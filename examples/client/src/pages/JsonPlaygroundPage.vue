<script setup lang="ts">
  import { computed, ref } from 'vue';
  import { Button as VanButton } from 'vant';
  import type { A2uiClientAction, A2uiMessage } from '@a2ui/web_core/v0_9';
  import { A2UIProvider, ComponentNode } from '@demo-renderer';
  import JsonCodeEditor from '../components/JsonCodeEditor.vue';
  import { createDemoProcessor, getPlaygroundExamples } from '../demo-data';

  const playgroundSurfaceId = ref('playground-surface');
  const playgroundError = ref('');
  const statusMessage = ref('Ready');
  const examples = getPlaygroundExamples();
  const playgroundInput = ref(examples[1]?.value ?? examples[0]?.value ?? '[]');

  const actionLog = ref<string[]>([]);
  const playgroundProcessor = ref(
    createDemoProcessor((action: A2uiClientAction) => {
      actionLog.value = [
        `${new Date().toLocaleTimeString()} ${action.name} ${JSON.stringify(action.context ?? {})}`,
        ...actionLog.value,
      ].slice(0, 10);
    }),
  );

  const helperTips = computed(() => [
    '输入 messages 数组，或形如 { "messages": [...] } 的对象。',
    '编辑器支持 JSON 校验、行号、自动换行和基础 A2UI 字段提示。',
    '常用补全包括 createSurface、updateComponents、updateDataModel 和常见组件名。',
  ]);

  const parsePlaygroundMessages = (input: string): A2uiMessage[] => {
    const parsed = JSON.parse(input);
    if (Array.isArray(parsed)) {
      return parsed as A2uiMessage[];
    }

    if (parsed && typeof parsed === 'object' && Array.isArray((parsed as { messages?: unknown }).messages)) {
      return (parsed as { messages: A2uiMessage[] }).messages;
    }

    throw new Error('JSON 必须是 messages 数组，或者形如 { "messages": [...] } 的对象。');
  };

  const detectSurfaceId = (messages: A2uiMessage[]) => {
    for (const message of messages) {
      if ('createSurface' in message) return message.createSurface.surfaceId;
      if ('updateComponents' in message) return message.updateComponents.surfaceId;
      if ('updateDataModel' in message) return message.updateDataModel.surfaceId;
    }
    return 'playground-surface';
  };

  const applyPlaygroundJson = () => {
    playgroundError.value = '';

    try {
      const messages = parsePlaygroundMessages(playgroundInput.value);
      const nextProcessor = createDemoProcessor((action: A2uiClientAction) => {
        actionLog.value = [
          `${new Date().toLocaleTimeString()} ${action.name} ${JSON.stringify(action.context ?? {})}`,
          ...actionLog.value,
        ].slice(0, 10);
      });
      const nextSurfaceId = detectSurfaceId(messages);

      nextProcessor.processMessages(messages);
      playgroundSurfaceId.value = nextSurfaceId;
      playgroundProcessor.value = nextProcessor;
      statusMessage.value = `Applied ${messages.length} message(s) to surface ${nextSurfaceId}`;
    } catch (error) {
      playgroundError.value = error instanceof Error ? error.message : String(error);
      statusMessage.value = 'Invalid JSON';
    }
  };

  const injectPlaygroundExample = (value: string) => {
    playgroundInput.value = value;
    applyPlaygroundJson();
  };

  const formatPlaygroundJson = () => {
    playgroundError.value = '';

    try {
      const parsed = JSON.parse(playgroundInput.value);
      playgroundInput.value = JSON.stringify(parsed, null, 2);
      statusMessage.value = 'JSON formatted';
    } catch (error) {
      playgroundError.value = error instanceof Error ? `格式化失败：${error.message}` : String(error);
    }
  };

  const copyPlaygroundJson = async () => {
    playgroundError.value = '';

    try {
      await navigator.clipboard.writeText(playgroundInput.value);
      statusMessage.value = 'JSON copied to clipboard';
    } catch (error) {
      playgroundError.value = error instanceof Error ? `复制失败：${error.message}` : String(error);
    }
  };

  applyPlaygroundJson();
</script>

<template>
  <div class="page-shell">
    <div class="playground-status">
      <strong>Status</strong>
      <span>{{ statusMessage }}</span>
    </div>

    <main class="playground-grid">
      <section class="playground-panel playground-panel--editor">
        <div class="playground-toolbar">
          <VanButton
            type="primary"
            @click="applyPlaygroundJson"
          >
            应用 JSON
          </VanButton>
          <VanButton
            plain
            @click="formatPlaygroundJson"
          >
            格式化 JSON
          </VanButton>
          <VanButton
            plain
            @click="copyPlaygroundJson"
          >
            复制当前 JSON
          </VanButton>
        </div>

        <div class="playground-examples">
          <span class="playground-examples-label">快速示例：</span>
          <VanButton
            v-for="example in examples"
            :key="example.label"
            size="small"
            plain
            @click="injectPlaygroundExample(example.value)"
          >
            {{ example.label }}
          </VanButton>
        </div>

        <JsonCodeEditor
          v-model="playgroundInput"
          placeholder="Paste A2UI messages JSON here"
        />

        <p
          v-if="playgroundError"
          class="playground-error"
        >
          {{ playgroundError }}
        </p>

        <ul class="playground-tips">
          <li
            v-for="tip in helperTips"
            :key="tip"
          >
            {{ tip }}
          </li>
        </ul>
      </section>

      <div class="playground-right">
        <section class="playground-panel">
          <div class="playground-preview-header">
            <div>
              <h2>Preview</h2>
              <p>Surface: {{ playgroundSurfaceId }}</p>
            </div>
          </div>

          <A2UIProvider
            :processor="playgroundProcessor"
            :surface-id="playgroundSurfaceId"
          >
            <ComponentNode id="root" />
          </A2UIProvider>
        </section>

        <aside class="playground-panel playground-panel--log">
          <h2>Action Log</h2>
          <p v-if="actionLog.length === 0">Use the preview to emit actions from your JSON.</p>
          <ul v-else>
            <li
              v-for="entry in actionLog"
              :key="entry"
            >
              {{ entry }}
            </li>
          </ul>
        </aside>
      </div>
    </main>
  </div>
</template>

<style scoped>
  .page-shell {
    display: flex;
    flex-direction: column;
    gap: 16px;
  }

  .playground-status {
    display: flex;
    align-items: center;
    gap: 10px;
    padding: 12px 14px;
    border-radius: 16px;
    background: rgba(255, 255, 255, 0.82);
    border: 1px solid rgba(15, 23, 42, 0.08);
    color: #334155;
    box-shadow: 0 12px 30px rgba(15, 23, 42, 0.06);
  }

  .playground-grid {
    display: grid;
    grid-template-columns: minmax(420px, 640px) minmax(420px, 1fr);
    gap: 20px;
    align-items: start;
  }

  .playground-panel {
    background: rgba(255, 255, 255, 0.88);
    border: 1px solid rgba(15, 23, 42, 0.08);
    border-radius: 22px;
    padding: 16px;
    box-shadow: 0 18px 50px rgba(15, 23, 42, 0.08);
  }

  .playground-panel--editor {
    display: flex;
    flex-direction: column;
    gap: 12px;
  }

  .playground-right {
    display: flex;
    flex-direction: column;
    gap: 20px;
    min-width: 0;
  }

  .playground-toolbar,
  .playground-examples {
    display: flex;
    gap: 8px;
    flex-wrap: wrap;
    align-items: center;
  }

  .playground-examples-label,
  .playground-preview-header p {
    font-size: 13px;
    color: #6b7280;
    margin: 0;
  }

  .playground-preview-header h2,
  .playground-panel--log h2 {
    margin: 0 0 4px;
    font-size: 18px;
  }

  .playground-panel--log {
    max-height: 320px;
    overflow: auto;
  }

  .playground-error {
    margin: 0;
    color: #dc2626;
    font-size: 13px;
  }

  .playground-tips,
  .playground-panel--log ul {
    margin: 0;
    padding-left: 18px;
    color: #475569;
    font-size: 13px;
    line-height: 1.5;
  }

  @media (max-width: 1024px) {
    .playground-grid {
      grid-template-columns: 1fr;
    }
  }
</style>

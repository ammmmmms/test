<script setup lang="ts">
  import { computed, ref, watchEffect } from 'vue';
  import { Button as VanButton, NoticeBar as VanNoticeBar } from 'vant';
  import { type A2uiClientAction } from '@a2ui/web_core/v0_9';
  import { A2UIProvider, ComponentNode, VANT_CATALOG_ID, BASIC_CATALOG_ID } from '@demo-renderer';
  import { createDemoProcessor, DEMO_SURFACE_ID, getDemoMessages, type DemoMode } from '../demo-data';
  import { getCatalogSchema } from '@demo-renderer';
  import {defaultRegistry} from '@demo-renderer/core/ComponentRegistry'

  console.log(getCatalogSchema(defaultRegistry,VANT_CATALOG_ID))

  type DeliveryMode = 'instant' | 'stream';

  const mode = ref<DemoMode>('vant');
  const deliveryMode = ref<DeliveryMode>('stream');
  const actionLog = ref<string[]>([]);
  const streamState = ref('Idle');
  let streamTimer: ReturnType<typeof setTimeout> | null = null;

  const clearStreamTimer = () => {
    if (streamTimer) {
      clearTimeout(streamTimer);
      streamTimer = null;
    }
  };

  const processor = ref(
    createDemoProcessor((action: A2uiClientAction) => {
      actionLog.value = [
        `${new Date().toLocaleTimeString()} ${action.name} ${JSON.stringify(action.context ?? {})}`,
        ...actionLog.value,
      ].slice(0, 8);
    }),
  );

  const currentCatalogId = computed(() =>
    mode.value === 'basic' ? BASIC_CATALOG_ID : VANT_CATALOG_ID,
  );

  const demoTitle = computed(() =>
    deliveryMode.value === 'stream' ? 'Streaming delivery enabled' : 'All messages delivered at once',
  );

  const buildStreamBatches = (messages: ReturnType<typeof getDemoMessages>) => {
    const componentPayload = messages.find(
      (message): message is Extract<(typeof messages)[number], { updateComponents: { surfaceId: string; components: any[] } }> =>
        'updateComponents' in message,
    );
    const componentList = componentPayload?.updateComponents.components ?? [];

    return [
      [messages[0]],
      [messages[1]],
      [
        {
          version: 'v0.9' as const,
          updateComponents: {
            surfaceId: DEMO_SURFACE_ID,
            components: componentList.slice(0, 4),
          },
        },
      ],
      [
        {
          version: 'v0.9' as const,
          updateComponents: {
            surfaceId: DEMO_SURFACE_ID,
            components: componentList.slice(4, 14),
          },
        },
      ],
      [
        {
          version: 'v0.9' as const,
          updateComponents: {
            surfaceId: DEMO_SURFACE_ID,
            components: componentList.slice(14),
          },
        },
      ],
    ];
  };

  const runStreamingDemo = (messages: ReturnType<typeof getDemoMessages>) => {
    clearStreamTimer();
    const nextProcessor = createDemoProcessor((action: A2uiClientAction) => {
      actionLog.value = [
        `${new Date().toLocaleTimeString()} ${action.name} ${JSON.stringify(action.context ?? {})}`,
        ...actionLog.value,
      ].slice(0, 8);
    });
    processor.value = nextProcessor;

    const batches = buildStreamBatches(messages);
    let index = 0;

    const flushNextBatch = () => {
      const batch = batches[index];
      if (!batch) {
        streamState.value = 'Streaming complete';
        streamTimer = null;
        return;
      }

      streamState.value = `Streaming batch ${index + 1} / ${batches.length}`;
      nextProcessor.processMessages(batch as any);
      index += 1;
      streamTimer = setTimeout(flushNextBatch, 1000);
    };

    flushNextBatch();
  };

  const loadDemo = (selectedMode: DemoMode) => {
    clearStreamTimer();
    actionLog.value = [];
    streamState.value = deliveryMode.value === 'stream' ? 'Preparing stream' : 'Delivered instantly';

    const messages = getDemoMessages(selectedMode, DEMO_SURFACE_ID);
    if (deliveryMode.value === 'stream') {
      runStreamingDemo(messages);
      return;
    }

    const nextProcessor = createDemoProcessor((action: A2uiClientAction) => {
      actionLog.value = [
        `${new Date().toLocaleTimeString()} ${action.name} ${JSON.stringify(action.context ?? {})}`,
        ...actionLog.value,
      ].slice(0, 8);
    });
    nextProcessor.processMessages(messages);
    processor.value = nextProcessor;
  };

  watchEffect(() => {
    loadDemo(mode.value);
  });
</script>

<template>
  <div class="page-shell">
    <div class="page-actions">
      <VanButton
        :type="mode === 'basic' ? 'primary' : 'default'"
        @click="mode = 'basic'"
      >
        Basic
      </VanButton>
      <VanButton
        :type="mode === 'vant' ? 'primary' : 'default'"
        @click="mode = 'vant'"
      >
        Vant
      </VanButton>
      <VanButton
        :type="mode === 'list' ? 'primary' : 'default'"
        @click="mode = 'list'"
      >
        List
      </VanButton>
      <VanButton
        :type="deliveryMode === 'instant' ? 'primary' : 'default'"
        @click="deliveryMode = 'instant'"
      >
        Instant
      </VanButton>
      <VanButton
        :type="deliveryMode === 'stream' ? 'primary' : 'default'"
        @click="deliveryMode = 'stream'"
      >
        Stream
      </VanButton>
    </div>

    <VanNoticeBar
      left-icon="info-o"
      :text="`Current catalog: ${currentCatalogId} · ${demoTitle} · ${streamState}`"
    />

    <main class="demo-grid">
      <section class="demo-surface">
        <A2UIProvider
          :processor="processor"
          :surface-id="DEMO_SURFACE_ID"
        >
          <ComponentNode id="root" />
        </A2UIProvider>
      </section>

      <aside class="demo-log">
        <h2>Action Log</h2>
        <p v-if="actionLog.length === 0">Interact with the rendered UI to emit actions.</p>
        <ul v-else>
          <li
            v-for="entry in actionLog"
            :key="entry"
          >
            {{ entry }}
          </li>
        </ul>
      </aside>
    </main>
  </div>
</template>

<style scoped>
  .page-shell {
    display: flex;
    flex-direction: column;
    gap: 16px;
  }

  .page-actions {
    display: flex;
    flex-wrap: wrap;
    gap: 8px;
  }

  .demo-grid {
    display: grid;
    grid-template-columns: minmax(0, 1fr) 320px;
    gap: 20px;
  }

  .demo-surface,
  .demo-log {
    background: rgba(255, 255, 255, 0.86);
    border: 1px solid rgba(15, 23, 42, 0.08);
    border-radius: 20px;
    padding: 16px;
    box-shadow: 0 18px 50px rgba(15, 23, 42, 0.08);
  }

  .demo-log h2 {
    margin-top: 0;
    font-size: 18px;
  }

  .demo-log ul {
    margin: 0;
    padding-left: 18px;
    color: #374151;
  }

  @media (max-width: 900px) {
    .demo-grid {
      grid-template-columns: 1fr;
    }
  }
</style>

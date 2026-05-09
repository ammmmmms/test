<script setup lang="ts">
  import { computed, ref, watchEffect } from 'vue';
  import { Button as VanButton, NoticeBar as VanNoticeBar } from 'vant';
  import { Catalog, MessageProcessor, type A2uiClientAction, type A2uiMessage } from '@a2ui/web_core/v0_9';
  import {
    A2UIProvider,
    BASIC_CATALOG_ID,
    BASIC_COMPONENTS,
    BASIC_FUNCTIONS,
    BASIC_THEME_SCHEMA,
    ComponentNode,
    VANT_CATALOG_ID,
    VANT_COMPONENTS,
    VANT_FUNCTIONS,
    VANT_THEME_SCHEMA,
    getCatalogSchema,
    defaultRegistry
  } from '@demo-renderer';
  import { SmartSummaryApi } from './customCatalog';
  type DemoMode = 'basic' | 'vant' | 'list';
  type DeliveryMode = 'instant' | 'stream';
  type PageMode = 'demo' | 'playground';

  const pageMode = ref<PageMode>('demo');
  const mode = ref<DemoMode>('vant');
  const deliveryMode = ref<DeliveryMode>('stream');
  const surfaceId = 'demo-surface';
  const actionLog = ref<string[]>([]);
  const streamState = ref('Idle');
  const playgroundSurfaceId = ref('playground-surface');
  const playgroundError = ref('');
  let streamTimer: ReturnType<typeof setTimeout> | null = null;

  const clearStreamTimer = () => {
    if (streamTimer) {
      clearTimeout(streamTimer);
      streamTimer = null;
    }
  };

  const createProcessor = () =>
    new MessageProcessor(
      [
        new Catalog(
          BASIC_CATALOG_ID,
          BASIC_COMPONENTS,
          BASIC_FUNCTIONS,
          BASIC_THEME_SCHEMA,
        ),
        new Catalog(
          VANT_CATALOG_ID,
          [...VANT_COMPONENTS, SmartSummaryApi],
          VANT_FUNCTIONS,
          VANT_THEME_SCHEMA,
        ),
      ],
      (action: A2uiClientAction) => {
        actionLog.value = [
          `${new Date().toLocaleTimeString()} ${action.name} ${JSON.stringify(action.context ?? {})}`,
          ...actionLog.value,
        ].slice(0, 8);
      },
    );

  console.log('getCatalogSchema', getCatalogSchema(defaultRegistry, VANT_CATALOG_ID))
  const processor = ref(createProcessor());
  const playgroundProcessor = ref(createProcessor());

  const currentCatalogId = computed(() =>
    mode.value === 'basic' ? BASIC_CATALOG_ID : VANT_CATALOG_ID,
  );

  const demoTitle = computed(() =>
    deliveryMode.value === 'stream' ? 'Streaming delivery enabled' : 'All messages delivered at once',
  );

  const getBasicMessages = (): A2uiMessage[] => ([
    {
      version: 'v0.9',
      createSurface: {
        surfaceId,
        catalogId: BASIC_CATALOG_ID,
        theme: {
          colorPrimary: '#2563eb',
          colorBackground: '#f8fafc',
          colorSurface: '#ffffff',
        },
        sendDataModel: true,
      },
    },
    {
      version: 'v0.9',
      updateDataModel: {
        surfaceId,
        value: {
          profile: {
            name: 'Lee',
            role: 'Product Engineer',
            summary: 'Editing Lee (Product Engineer)',
            status: 'Change the display name, then blur the field or press save.',
          },
        },
      },
    },
    {
      version: 'v0.9',
      updateComponents: {
        surfaceId,
        components: [
          { id: 'root', component: 'Card', child: 'content' },
          { id: 'content', component: 'Column', children: ['title', 'subtitle', 'hint', 'input', 'submit'] },
          { id: 'title', component: 'Text', text: 'Basic Catalog Demo', variant: 'h3' },
          { id: 'subtitle', component: 'Text', text: { path: '/profile/summary' } },
          { id: 'hint', component: 'Text', text: { path: '/profile/status' }, variant: 'caption' },
          {
            id: 'input',
            component: 'TextField',
            label: 'Display Name',
            value: { path: '/profile/name' },
            action: {
              event: {
                name: 'name_blur',
                context: { name: { path: '/profile/name' } },
              },
            },
          },
          {
            id: 'submit',
            component: 'Button',
            child: 'submit-label',
            variant: 'primary',
            action: {
              event: {
                name: 'save_profile',
                context: {
                  name: { path: '/profile/name' },
                  role: { path: '/profile/role' },
                },
              },
            },
          },
          { id: 'submit-label', component: 'Text', text: 'Save Profile' },
        ],
      },
    },
  ]);

  const getVantMessages = (): A2uiMessage[] => ([
    {
      version: 'v0.9',
      createSurface: {
        surfaceId,
        catalogId: VANT_CATALOG_ID,
        theme: {
          colorPrimary: '#14b8a6',
          colorBackground: '#f0fdfa',
          colorSurface: '#ffffff',
        },
        sendDataModel: true,
      },
    },
    {
      version: 'v0.9',
      updateDataModel: {
        surfaceId,
        value: {
          order: {
            note: 'Less ice',
            topping: 'Pearls',
            sweetness: 60,
            summary: 'Pearls, 60% sweet, less ice',
            syncedSummary: '',
          },
        },
      },
    },
    {
      version: 'v0.9',
      updateComponents: {
        surfaceId,
        components: [
          { id: 'root', component: 'Column', children: ['hero-card', 'builder-group', 'summary-card', 'cta-card', 'stream-card'] },
          { id: 'hero-card', component: 'Card', child: 'hero-content' },
          { id: 'hero-content', component: 'Column', children: ['tag', 'icon-row', 'preview'] },
          { id: 'tag', component: 'Tag', text: 'Mobile Catalog', type: 'success' },
          {
            id: 'icon-row',
            component: 'Row',
            align: 'center',
            children: ['icon-primary', 'icon-warning', 'icon-default'],
          },
          {
            id: 'icon-primary',
            component: 'Icon',
            name: 'success',
            size: 20,
            type: 'primary',
          },
          {
            id: 'icon-warning',
            component: 'Icon',
            name: 'warning-o',
            size: 24,
            type: 'warning',
          },
          {
            id: 'icon-default',
            component: 'Icon',
            name: 'setting-o',
            size: 18,
            type: 'default',
          },
          { id: 'preview', component: 'Text', text: { path: '/order/summary' }, variant: 'caption' },
          { id: 'builder-group', component: 'CellGroup', title: 'Bubble Tea Builder', inset: true, children: ['note', 'picker', 'sweetness'] },
          {
            id: 'note',
            component: 'TextField',
            label: 'Order Note',
            placeholder: 'No ice / less sugar / extra tea',
            value: { path: '/order/note' },
            action: {
              event: {
                name: 'note_blur',
                context: {
                  note: { path: '/order/note' },
                },
              },
            },
          },
          {
            id: 'picker',
            component: 'ChoicePicker',
            label: 'Topping',
            options: ['Pearls', 'Coconut Jelly', 'Pudding'],
            value: { path: '/order/topping' },
            variant: 'mutuallyExclusive',
            displayStyle: 'list',
          },
          {
            id: 'sweetness',
            component: 'Slider',
            value: { path: '/order/sweetness' },
            min: 0,
            max: 100,
            step: 10,
          },
          { id: 'summary-card', component: 'Card', child: 'summary-content' },
          { id: 'summary-content', component: 'Column', children: ['smart-summary', 'synced-summary'] },
          {
            id: 'smart-summary',
            component: 'SmartSummary',
            title: 'useA2UI Example',
            ctaText: 'Build Custom Summary',
            paths: ['/order/note', '/order/topping', '/order/sweetness'],
            labels: ['Note', 'Topping', 'Sweetness'],
            persistTo: '/order/syncedSummary',
            action: {
              event: {
                name: 'sync_summary',
                context: {
                  synced: { path: '/order/syncedSummary' },
                },
              },
            },
          },
          { id: 'synced-summary', component: 'Text', text: { path: '/order/syncedSummary' }, variant: 'caption' },
          { id: 'cta-card', component: 'Card', child: 'cta' },
          {
            id: 'cta',
            component: 'Button',
            child: 'cta-label',
            variant: 'primary',
            block: true,
            action: {
              event: {
                name: 'submit_order',
                context: {
                  note: { path: '/order/note' },
                  topping: { path: '/order/topping' },
                  sweetness: { path: '/order/sweetness' },
                },
              },
            },
          },
          { id: 'cta-label', component: 'Text', text: 'Submit Order' },
          { id: 'stream-card', component: 'Card', child: 'stream-content' },
          { id: 'stream-content', component: 'Column', children: ['stream-title', 'stream-body'] },
          { id: 'stream-title', component: 'Text', text: 'Streaming tail', variant: 'h4' },
          { id: 'stream-body', component: 'Text', text: 'This block was appended in a later component batch.', variant: 'caption' },
        ],
      },
    },
  ]);

  const getListMessages = (): A2uiMessage[] => ([
    {
      version: 'v0.9',
      createSurface: {
        surfaceId,
        catalogId: VANT_CATALOG_ID,
        theme: {
          colorPrimary: '#0f766e',
          colorBackground: '#f8fafc',
          colorSurface: '#ffffff',
          colorOnBackground: '#0f172a',
          colorBorder: '#dbe4ee',
        },
        sendDataModel: true,
      },
    },
    {
      version: 'v0.9',
      updateDataModel: {
        surfaceId,
        value: {
          products: [
            {
              id: 'coffee-latte',
              name: '燕麦拿铁',
              priceText: '¥28',
              description: '奶香顺滑，适合早餐时段。',
              tags: [
                { label: '热销', detail: '近7天销量最高', icon: 'fire-o' },
                { label: '奶香', detail: '口感更顺滑', icon: 'like-o' },
              ],
            },
            {
              id: 'coffee-americano',
              name: '冰美式',
              priceText: '¥22',
              description: '口感更干净，偏苦更明显。',
              tags: [
                { label: '清爽', detail: '更适合夏天', icon: 'guide-o' },
                { label: '低糖', detail: '默认不额外加糖', icon: 'passed' },
              ],
            },
            {
              id: 'coffee-matcha',
              name: '抹茶拿铁',
              priceText: '¥32',
              description: '茶感更重，回甘明显。',
              tags: [
                { label: '新品', detail: '本周新上线', icon: 'new-o' },
                { label: '回甘', detail: '尾调更明显', icon: 'award-o' },
              ],
            },
          ],
        },
      },
    },
    {
      version: 'v0.9',
      updateComponents: {
        surfaceId,
        components: [
          {
            id: 'root',
            component: 'Column',
            children: ['list-header-card', 'product-list'],
          },
          {
            id: 'list-header-card',
            component: 'Card',
            child: 'list-header-content',
          },
          {
            id: 'list-header-content',
            component: 'Column',
            children: ['list-title', 'list-hint'],
          },
          {
            id: 'list-title',
            component: 'Text',
            text: '数组模板列表示例',
            variant: 'h3',
          },
          {
            id: 'list-hint',
            component: 'Text',
            text: '下面的卡片不是手写三份，而是通过 /products 数组 + componentId 模板重复渲染出来的。',
            variant: 'caption',
          },
          {
            id: 'product-list',
            component: 'List',
            children: {
              componentId: 'product-card',
              path: '/products',
            },
          },
          {
            id: 'product-card',
            component: 'Card',
            child: 'product-card-content',
          },
          {
            id: 'product-card-content',
            component: 'Column',
            children: ['product-head', 'product-tags', 'product-description', 'product-cta'],
          },
          {
            id: 'product-head',
            component: 'Row',
            justify: 'spaceBetween',
            align: 'center',
            children: ['product-name', 'product-price'],
          },
          {
            id: 'product-name',
            component: 'Text',
            text: { path: 'name' },
            variant: 'h4',
          },
          {
            id: 'product-price',
            component: 'Text',
            text: { path: 'priceText' },
            variant: 'body',
          },
          {
            id: 'product-tags',
            component: 'List',
            direction: 'horizontal',
            children: {
              componentId: 'product-tag-item',
              path: 'tags',
            },
          },
          {
            id: 'product-tag-item',
            component: 'Row',
            align: 'center',
            children: ['product-tag-icon', 'product-tag-copy'],
          },
          {
            id: 'product-tag-icon',
            component: 'Icon',
            name: { path: 'icon' },
            size: 14,
            type: 'primary',
          },
          {
            id: 'product-tag-copy',
            component: 'Column',
            children: ['product-tag-label', 'product-tag-detail'],
          },
          {
            id: 'product-tag-label',
            component: 'Text',
            text: { path: 'label' },
            variant: 'body',
          },
          {
            id: 'product-tag-detail',
            component: 'Text',
            text: { path: 'detail' },
            variant: 'caption',
          },
          {
            id: 'product-description',
            component: 'Text',
            text: { path: 'description' },
            variant: 'caption',
          },
          {
            id: 'product-cta',
            component: 'Button',
            label: '加入购物车',
            variant: 'primary',
            action: {
              event: {
                name: 'add_to_cart',
                context: {
                  productId: { path: 'id' },
                  productName: { path: 'name' },
                },
              },
            },
          },
        ],
      },
    },
  ]);

  const playgroundExamples = computed(() => [
    {
      label: '基础表单',
      value: JSON.stringify(getBasicMessages(), null, 2),
    },
    {
      label: '商品模板列表',
      value: JSON.stringify(getListMessages(), null, 2),
    },
    {
      label: '移动端表单',
      value: JSON.stringify(getVantMessages(), null, 2),
    },
  ]);
  const playgroundInput = ref(playgroundExamples.value[1].value);

  const buildStreamBatches = (messages: A2uiMessage[]) => {
    const componentPayload = messages[2];

    return [
      [messages[0]],
      [messages[1]],
      [
        {
          version: 'v0.9',
          updateComponents: {
            surfaceId,
            components: componentPayload.updateComponents?.components.slice(0, 4) ?? [],
          },
        },
      ],
      [
        {
          version: 'v0.9',
          updateComponents: {
            surfaceId,
            components: componentPayload.updateComponents?.components.slice(4, 14) ?? [],
          },
        },
      ],
      [
        {
          version: 'v0.9',
          updateComponents: {
            surfaceId,
            components: componentPayload.updateComponents?.components.slice(14) ?? [],
          },
        },
      ],
    ];
  };

  const runStreamingDemo = (nextProcessor: MessageProcessor, messages: A2uiMessage[]) => {
    clearStreamTimer();

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
      nextProcessor.processMessages(batch);
      index += 1;
      streamTimer = setTimeout(flushNextBatch, 1000);
    };

    flushNextBatch();
  };

  const loadDemo = (selectedMode: DemoMode) => {
    clearStreamTimer();
    actionLog.value = [];
    streamState.value = deliveryMode.value === 'stream' ? 'Preparing stream' : 'Delivered instantly';

    const nextProcessor = createProcessor();

    processor.value = nextProcessor;

    const messages = selectedMode === 'basic'
      ? getBasicMessages()
      : selectedMode === 'vant'
        ? getVantMessages()
        : getListMessages();
    if (deliveryMode.value === 'stream') {
      runStreamingDemo(nextProcessor, messages);
      return;
    }

    nextProcessor.processMessages(messages);
  };

  watchEffect(() => {
    if (pageMode.value !== 'demo') return;
    loadDemo(mode.value);
  });

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
      const nextProcessor = createProcessor();
      const nextSurfaceId = detectSurfaceId(messages);

      nextProcessor.processMessages(messages);
      playgroundSurfaceId.value = nextSurfaceId;
      playgroundProcessor.value = nextProcessor;
    } catch (error) {
      playgroundError.value = error instanceof Error ? error.message : String(error);
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
    } catch (error) {
      playgroundError.value = error instanceof Error ? `格式化失败：${error.message}` : String(error);
    }
  };

  const copyPlaygroundJson = async () => {
    playgroundError.value = '';

    try {
      await navigator.clipboard.writeText(playgroundInput.value);
    } catch (error) {
      playgroundError.value = error instanceof Error ? `复制失败：${error.message}` : String(error);
    }
  };

  applyPlaygroundJson();
</script>

<template>
  <div class="demo-shell">
    <header class="demo-header">
      <div>
        <h1>A2UI Vue + Vant Demo</h1>
        <p>Switch between the official demo gallery and a JSON playground for direct rendering.</p>
      </div>
      <div class="demo-actions">
        <VanButton
          :type="pageMode === 'demo' ? 'primary' : 'default'"
          @click="pageMode = 'demo'"
        >
          Demo
        </VanButton>
        <VanButton
          :type="pageMode === 'playground' ? 'primary' : 'default'"
          @click="pageMode = 'playground'"
        >
          Playground
        </VanButton>
      </div>
    </header>

    <template v-if="pageMode === 'demo'">
      <div class="demo-actions demo-actions--secondary">
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
            :surface-id="surfaceId"
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
    </template>

    <template v-else>
      <VanNoticeBar
        left-icon="edit"
        text="在左侧输入 messages JSON，点击应用后会直接在右侧渲染。支持直接粘贴数组，或 { messages: [...] }。"
      />

      <main class="demo-grid playground-grid">
        <section class="demo-surface playground-editor">
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
            <VanButton
              plain
              @click="playgroundInput = ''"
            >
              清空
            </VanButton>
          </div>

          <div class="playground-examples">
            <span class="playground-examples-label">快速示例：</span>
            <VanButton
              v-for="example in playgroundExamples"
              :key="example.label"
              size="small"
              plain
              @click="injectPlaygroundExample(example.value)"
            >
              {{ example.label }}
            </VanButton>
          </div>

          <textarea
            v-model="playgroundInput"
            class="playground-textarea"
            spellcheck="false"
          />

          <p
            v-if="playgroundError"
            class="playground-error"
          >
            {{ playgroundError }}
          </p>
        </section>

        <section class="demo-surface">
          <A2UIProvider
            :processor="playgroundProcessor"
            :surface-id="playgroundSurfaceId"
          >
            <ComponentNode id="root" />
          </A2UIProvider>
        </section>
      </main>
    </template>
  </div>
</template>

<style scoped>
  .demo-shell {
    min-height: 100vh;
    background:
      radial-gradient(circle at top left, rgba(20, 184, 166, 0.12), transparent 32%),
      linear-gradient(180deg, #f8fffe 0%, #eef6ff 100%);
    padding: 20px;
    box-sizing: border-box;
  }

  .demo-header {
    display: flex;
    justify-content: space-between;
    align-items: flex-start;
    gap: 16px;
    margin-bottom: 20px;
  }

  .demo-header h1 {
    margin: 0 0 8px;
    font-size: 28px;
    line-height: 1.1;
  }

  .demo-header p {
    margin: 0;
    max-width: 560px;
    color: #4b5563;
  }

  .demo-actions {
    display: flex;
    flex-wrap: wrap;
    gap: 8px;
  }

  .demo-actions--secondary {
    margin-bottom: 16px;
  }

  .demo-grid {
    display: grid;
    grid-template-columns: minmax(0, 1fr) 320px;
    gap: 20px;
    margin-top: 20px;
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

  .playground-grid {
    grid-template-columns: minmax(360px, 520px) minmax(0, 1fr);
  }

  .playground-editor {
    display: flex;
    flex-direction: column;
    gap: 12px;
  }

  .playground-toolbar {
    display: flex;
    gap: 8px;
  }

  .playground-examples {
    display: flex;
    flex-wrap: wrap;
    gap: 8px;
    align-items: center;
  }

  .playground-examples-label {
    font-size: 13px;
    color: #6b7280;
  }

  .playground-textarea {
    min-height: 560px;
    width: 100%;
    resize: vertical;
    border: 1px solid rgba(15, 23, 42, 0.12);
    border-radius: 16px;
    padding: 14px;
    box-sizing: border-box;
    font-family: ui-monospace, SFMono-Regular, Menlo, Monaco, Consolas, monospace;
    font-size: 13px;
    line-height: 1.5;
    color: #0f172a;
    background: #f8fafc;
  }

  .playground-error {
    margin: 0;
    color: #dc2626;
    font-size: 13px;
  }

  @media (max-width: 900px) {
    .demo-grid {
      grid-template-columns: 1fr;
    }

    .demo-header {
      flex-direction: column;
    }
  }
</style>

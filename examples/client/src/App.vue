<script setup lang="ts">
  import { computed, ref, watchEffect } from 'vue';
  import { Button as VanButton, NoticeBar as VanNoticeBar } from 'vant';
  import { Catalog, MessageProcessor, type A2uiClientAction } from '@a2ui/web_core/v0_9';
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
  } from '@demo-renderer';
  import { SmartSummaryApi } from './customCatalog';
  type DemoMode = 'basic' | 'vant';

  const mode = ref<DemoMode>('vant');
  const surfaceId = 'demo-surface';
  const actionLog = ref<string[]>([]);

  const processor = ref(
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
    ),
  );

  const currentCatalogId = computed(() =>
    mode.value === 'basic' ? BASIC_CATALOG_ID : VANT_CATALOG_ID,
  );

  const loadDemo = (selectedMode: DemoMode) => {
    actionLog.value = [];

    const nextProcessor = new MessageProcessor(
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

    if (selectedMode === 'basic') {
      nextProcessor.processMessages([
        {
          version: 'v0.9',
          createSurface: {
            surfaceId,
            catalogId: BASIC_CATALOG_ID,
            theme: {
              primaryColor: '#2563eb',
              backgroundColor: '#f8fafc',
              surfaceColor: '#ffffff',
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
    } else {
      nextProcessor.processMessages([
        {
          version: 'v0.9',
          createSurface: {
            surfaceId,
            catalogId: VANT_CATALOG_ID,
            theme: {
              primaryColor: '#14b8a6',
              backgroundColor: '#f0fdfa',
              surfaceColor: '#ffffff',
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
              { id: 'root', component: 'Column', children: ['hero-card', 'builder-group', 'summary-card', 'cta-card'] },
              { id: 'hero-card', component: 'Card', child: 'hero-content' },
              { id: 'hero-content', component: 'Column', children: ['tag', 'preview'] },
              { id: 'tag', component: 'Tag', text: 'Mobile Catalog', type: 'success' },
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
            ],
          },
        },
      ]);
    }

    processor.value = nextProcessor;
  };

  watchEffect(() => {
    loadDemo(mode.value);
  });
</script>

<template>
  <div class="demo-shell">
    <header class="demo-header">
      <div>
        <h1>A2UI Vue + Vant Demo</h1>
        <p>Switch between the official basic catalog and a Vant-flavored mobile catalog.</p>
      </div>
      <div class="demo-actions">
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
      </div>
    </header>

    <VanNoticeBar
      left-icon="info-o"
      :text="`Current catalog: ${currentCatalogId}`"
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
    gap: 8px;
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

  @media (max-width: 900px) {
    .demo-grid {
      grid-template-columns: 1fr;
    }

    .demo-header {
      flex-direction: column;
    }
  }
</style>

import { Catalog, MessageProcessor, type A2uiClientAction, type A2uiMessage } from '@a2ui/web_core/v0_9';
import {
  BASIC_CATALOG_ID,
  BASIC_COMPONENTS,
  BASIC_FUNCTIONS,
  BASIC_THEME_SCHEMA,
  VANT_CATALOG_ID,
  VANT_COMPONENTS,
  VANT_FUNCTIONS,
  VANT_THEME_SCHEMA,
} from '@demo-renderer';
import { SmartSummaryApi } from './customCatalog';

export type DemoMode = 'basic' | 'vant' | 'list';
export const DEMO_SURFACE_ID = 'demo-surface';

export function createDemoProcessor(onAction?: (action: A2uiClientAction) => void) {
  return new MessageProcessor(
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
    onAction,
  );
}

export const getBasicMessages = (surfaceId: string = DEMO_SURFACE_ID): A2uiMessage[] => ([
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

export const getVantMessages = (surfaceId: string = DEMO_SURFACE_ID): A2uiMessage[] => ([
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

export const getListMessages = (surfaceId: string = DEMO_SURFACE_ID): A2uiMessage[] => ([
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
          style: {
            backgroundColor: '#ecfeff',
            border: '1px solid #99f6e4',
            padding: '16px',
            borderRadius: '16px',
          },
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
          style: {
            backgroundColor: '#f8fafc',
            border: '1px solid #dbe4ee',
            padding: '16px',
            borderRadius: '16px',
          },
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

export function getDemoMessages(mode: DemoMode, surfaceId: string = DEMO_SURFACE_ID) {
  if (mode === 'basic') return getBasicMessages(surfaceId);
  if (mode === 'vant') return getVantMessages(surfaceId);
  return getListMessages(surfaceId);
}

export function getPlaygroundExamples() {
  return [
    {
      label: '基础表单',
      value: JSON.stringify(getBasicMessages('playground-surface'), null, 2),
    },
    {
      label: '商品模板列表',
      value: JSON.stringify(getListMessages('playground-surface'), null, 2),
    },
    {
      label: '移动端表单',
      value: JSON.stringify(getVantMessages('playground-surface'), null, 2),
    },
  ];
}

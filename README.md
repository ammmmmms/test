# A2UI Vant Renderer

这是一个基于 `Vue 3 + Vant` 的 A2UI v0.9 渲染器，支持：

- 官方 `basic catalog`
- 自定义 `vant catalog`
- 同一个客户端同时注册多套 `catalogId`
- 通过 `catalogId` 决定当前 surface 用哪套组件协议

## 这个项目提供什么

- 一套可复用的 Vue 渲染内核
- 一套官方 `basic catalog` 的 Vue/Vant 实现
- 一套偏移动端的 `Vant catalog`
- 一套按 `catalogId` 组织的组件注册机制
- 一套可导出的运行时 schema，方便给 agent / prompt / tooling 使用

## 内置 Catalog ID

- `BASIC_CATALOG_ID`
  `https://a2ui.org/specification/v0_9/basic_catalog.json`
- `VANT_CATALOG_ID`
  `urn:a2ui:catalog:vant:v1`

## 业务工程需要安装什么包

业务工程至少需要这些依赖：

```bash
pnpm add vue vant @a2ui/web_core
```

如果你的业务工程本身是 Vite + Vue 项目，通常还会有这些开发依赖：

```bash
pnpm add -D vite @vitejs/plugin-vue typescript vue-tsc
```

样式入口里需要引入：

```ts
import 'vant/lib/index.css';
import '@your-renderer/style.css';
```

## 两种接入方式

### 方式一：把这个 renderer 当成包直接引入

适合场景：

- 你准备把它作为 workspace 包使用
- 或者后续打算发私有 npm 包
- 不想把 renderer 源码复制进业务仓库

业务代码里通常要引入这些内容：

- `A2UiVueRenderer`
- `A2UIProvider`
- `ComponentNode`
- `BASIC_CATALOG_ID` / `VANT_CATALOG_ID`
- `BASIC_COMPONENTS` / `VANT_COMPONENTS`
- `BASIC_FUNCTIONS` / `VANT_FUNCTIONS`
- `BASIC_THEME_SCHEMA` / `VANT_THEME_SCHEMA`

最小接线示例：

```ts
import { createApp } from 'vue';
import { Catalog, MessageProcessor } from '@a2ui/web_core/v0_9';
import {
  A2UiVueRenderer,
  BASIC_CATALOG_ID,
  VANT_CATALOG_ID,
  BASIC_COMPONENTS,
  VANT_COMPONENTS,
  BASIC_FUNCTIONS,
  VANT_FUNCTIONS,
  BASIC_THEME_SCHEMA,
  VANT_THEME_SCHEMA,
} from '@your-renderer';

const processor = new MessageProcessor([
  new Catalog(
    BASIC_CATALOG_ID,
    BASIC_COMPONENTS,
    BASIC_FUNCTIONS,
    BASIC_THEME_SCHEMA,
  ),
  new Catalog(
    VANT_CATALOG_ID,
    VANT_COMPONENTS,
    VANT_FUNCTIONS,
    VANT_THEME_SCHEMA,
  ),
]);

createApp(App)
  .use(A2UiVueRenderer, {
    registerBasicCatalog: true,
    registerVantCatalog: true,
  })
  .mount('#app');
```

页面里渲染某个 surface：

```vue
<script setup lang="ts">
import { A2UIProvider, ComponentNode } from '@your-renderer';

defineProps<{
  processor: any;
  surfaceId: string;
}>();
</script>

<template>
  <A2UIProvider
    :processor="processor"
    :surface-id="surfaceId"
  >
    <ComponentNode id="root" />
  </A2UIProvider>
</template>
```

### 方式二：把源码复制进业务工程，本地维护

适合场景：

- 你明确知道后续要大量魔改
- 你希望 renderer 和业务代码同仓库维护
- 你不想先处理 package 发布 / workspace 管理

推荐至少复制这些目录：

- [src](/Users/lee/a2ui-vant-renderer/src)
- [src/components](/Users/lee/a2ui-vant-renderer/src/components)
- [src/catalog](/Users/lee/a2ui-vant-renderer/src/catalog)
- [src/composables](/Users/lee/a2ui-vant-renderer/src/composables)
- [src/core](/Users/lee/a2ui-vant-renderer/src/core)
- [src/utils](/Users/lee/a2ui-vant-renderer/src/utils)
- [src/style.css](/Users/lee/a2ui-vant-renderer/src/style.css)

如果你业务工程缺少对应构建配置，再参考这些文件：

- [package.json](/Users/lee/a2ui-vant-renderer/package.json)
- [vite.config.ts](/Users/lee/a2ui-vant-renderer/vite.config.ts)
- [tsconfig.json](/Users/lee/a2ui-vant-renderer/tsconfig.json)
- [tsconfig.app.json](/Users/lee/a2ui-vant-renderer/tsconfig.app.json)
- [tsconfig.node.json](/Users/lee/a2ui-vant-renderer/tsconfig.node.json)

如果你的业务项目已经有自己的 Vite / TS 配置，通常不用照搬这些配置文件。一般只需要：

- 复制 `src/` 目录
- 把依赖补进你业务工程自己的 `package.json`
- 在你自己的 `vite.config.ts` 里配置别名或导入路径

## 哪些文件最关键

如果你想快速理解这套 renderer，优先看这些文件：

- [src/A2UIRendererPlugin.ts](/Users/lee/a2ui-vant-renderer/src/A2UIRendererPlugin.ts)
  Vue 插件入口，负责注册 catalog
- [src/composables/A2UIProvider.vue](/Users/lee/a2ui-vant-renderer/src/composables/A2UIProvider.vue)
  把 `MessageProcessor` 桥接到 Vue 组件树
- [src/composables/useA2UI.ts](/Users/lee/a2ui-vant-renderer/src/composables/useA2UI.ts)
  负责动态值解析、action 发送、数据写回
- [src/core/ComponentNode.vue](/Users/lee/a2ui-vant-renderer/src/core/ComponentNode.vue)
  递归渲染节点
- [src/core/defaultCatalog.ts](/Users/lee/a2ui-vant-renderer/src/core/defaultCatalog.ts)
  内置 `basic` 和 `vant` catalog 的注册位置
- [src/catalog/index.ts](/Users/lee/a2ui-vant-renderer/src/catalog/index.ts)
  对外导出组件 API、函数、主题 schema、catalog schema

## 业务工程里最少要写哪些代码

通常只要这几块：

1. 创建一个 `MessageProcessor`
2. 把你支持的 catalog 都注册进去
3. 在和 agent 握手时上报 `supportedCatalogIds`
4. 用 `A2UIProvider + ComponentNode` 渲染某个 `surfaceId`

也就是说，业务工程通常只需要：

- 一个 `processor.ts`
- 一个渲染容器组件
- 一个接收 agent 消息并调用 `processor.processMessages(...)` 的入口

## 如何同时支持多套 Catalog

如果你想同一个客户端同时支持 `basic` 和 `vant`：

```ts
const processor = new MessageProcessor([
  new Catalog(
    BASIC_CATALOG_ID,
    BASIC_COMPONENTS,
    BASIC_FUNCTIONS,
    BASIC_THEME_SCHEMA,
  ),
  new Catalog(
    VANT_CATALOG_ID,
    VANT_COMPONENTS,
    VANT_FUNCTIONS,
    VANT_THEME_SCHEMA,
  ),
]);
```

然后在客户端能力协商里上报：

```ts
const supportedCatalogIds = [VANT_CATALOG_ID, BASIC_CATALOG_ID];
```

如果当前终端是移动端优先，建议把 `VANT_CATALOG_ID` 放前面。

## 如果你要加第三套自定义 Catalog

你需要做四件事：

1. 写新的 Vue 组件
2. 写对应的 `ComponentApi`
3. 给它分配新的 `catalogId`
4. 把这个 `catalogId` 上报给 agent

注册入口是：

- [registerCatalogDefinition](/Users/lee/a2ui-vant-renderer/src/core/defaultCatalog.ts)

示例：

```ts
import { registerCatalogDefinition, defaultRegistry } from '@your-renderer';

registerCatalogDefinition(
  defaultRegistry,
  'urn:my:catalog:v1',
  {
    MyCard: MyCardComponent,
    MyChart: MyChartComponent,
  },
  {
    MyCard: MyCardApi,
    MyChart: MyChartApi,
  },
);
```

## 常见坑

- `createSurface.catalogId` 和本地注册的 `catalogId` 不一致时，页面不会渲染
- 只注册了组件实现、没注册对应 `ComponentApi` 时，agent 侧 schema 会不完整
- 动态列表模板里，不要自己直接 `dataModel.set(...)`，应该走 [useA2UI.ts](/Users/lee/a2ui-vant-renderer/src/composables/useA2UI.ts) 提供的写回逻辑，否则相对路径很容易写坏
- 如果你只想支持 Vant，可以把 `registerBasicCatalog: false`

## Demo

已经带了一个可运行 demo：

- [examples/client](/Users/lee/a2ui-vant-renderer/examples/client)

构建主包：

```bash
cd /Users/lee/a2ui-vant-renderer
pnpm build
```

启动 demo：

```bash
cd /Users/lee/a2ui-vant-renderer/examples/client
pnpm build
pnpm dev
```

## 当前状态说明

这版已经可以作为业务接入起点使用，但定位仍然是“第一版可扩展实现”，不是所有 Vant 组件都已经补全。

目前已经具备：

- `basic catalog` 可渲染的核心组件
- `vant catalog` 的基础移动端组件
- 多 catalog 注册
- 相对路径写回
- 本地 demo

后续如果要继续增强，优先建议：

1. 补更多 Vant 组件映射
2. 补单测，尤其是动态列表表单写回
3. 补 agent prompt / schema 接入示例

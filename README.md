# A2UI Vant Renderer

这是一个基于 `Vue 3 + Vant` 的 A2UI v0.9 渲染器。

它的目标很明确：

- 让你的 Vue 客户端可以直接渲染 A2UI 的 `surface`
- 同时支持官方 `basic catalog` 和一套偏移动端的 `vant catalog`
- 允许你继续注册第三套、第四套自己的 catalog
- 给你一套“标准组件”和“特殊组件”都能继续扩展下去的开发方式

这份 README 按新手视角来写。你不需要先懂 A2UI 全部细节，照着这里走，先把项目跑起来，再开始加自己的组件。

## 1. 先用一句话理解这个项目

你可以把它理解成三层：

1. `@a2ui/web_core`
   A2UI 的运行时内核。负责 `Catalog`、`MessageProcessor`、`SurfaceModel`、动态值解析、数据写回、action 分发。

2. 这个仓库的 `src/`
   Vue 渲染层。负责把 A2UI 组件模型渲染成 Vue + Vant 组件。

3. 你的业务工程
   负责接 agent 消息、创建 `MessageProcessor`、注册 catalog、把 surface 渲染到页面上。

如果你以前做过前端，你可以把它理解成：

- `web_core` 像状态机 + 协议引擎
- 这个 renderer 像 Vue 适配层
- 你的业务工程像宿主应用

## 2. 这个项目现在提供什么

- 一套 `Vue 3` 的 A2UI 渲染内核
- 官方 `basic catalog` 的 Vue 实现
- 一套偏移动端的 `vant catalog`
- 多 `catalogId` 注册能力
- 运行时 catalog schema 导出能力
- demo 工程

## 3. 你先要知道的几个核心概念

### 3.1 什么是 surface

一个 `surface` 就是一块完整的 A2UI 界面树。

比如：

- 一个表单页
- 一个卡片区域
- 一个聊天面板里的一段动态 UI

在代码里，页面通常是这样渲染的：

```vue
<A2UIProvider :processor="processor" :surface-id="surfaceId">
  <ComponentNode id="root" />
</A2UIProvider>
```

意思就是：

- `A2UIProvider` 提供运行时上下文
- `surfaceId` 指定渲染哪一块 surface
- `ComponentNode id="root"` 从根节点开始递归渲染

### 3.2 什么是 catalog

你可以把 `catalog` 理解成“这套 UI 允许用哪些组件、函数、主题字段”。

比如：

- `basic catalog` 更接近官方基础组件
- `vant catalog` 更偏移动端交互

一个 `surface` 只能对应一个 `catalogId`。

这个点非常重要：

- 不能在 `vant` 的 surface 里直接塞另一个 catalog 独有的组件
- 如果你想扩展 `vant`，应该把你的新组件注册到同一个 `VANT_CATALOG_ID` 下
- 如果你真的想做一套完全独立协议，就新建一个新的 `catalogId`

### 3.3 什么是 ComponentApi

每个 A2UI 组件都要有一份 `ComponentApi`。

它至少包含两样东西：

- `name`
- `schema`

示意：

```ts
export const VantButtonApi = {
  name: 'Button',
  schema: z.object({
    label: DynamicStringSchema.optional(),
    action: ActionSchema,
  }).strict(),
} satisfies ComponentApi;
```

这份 schema 的作用是：

- 告诉 agent 这个组件能接收什么字段
- 告诉 renderer 如何绑定这些字段
- 给本地工具和类型系统提供基础信息

## 4. 内置 Catalog ID

- `BASIC_CATALOG_ID`
  `https://a2ui.org/specification/v0_9/basic_catalog.json`
- `VANT_CATALOG_ID`
  `urn:a2ui:catalog:vant:v1`

## 5. 最短上手路径

如果你什么都还没接，最短路径就是：

1. 安装依赖
2. 注册 renderer 插件
3. 创建 `MessageProcessor`
4. 注册 `basic` / `vant` catalog
5. 用 `A2UIProvider + ComponentNode` 渲染页面

## 6. 业务工程要安装什么

至少这些：

```bash
pnpm add vue vant @a2ui/web_core
```

如果你是 `Vite + Vue` 项目，通常还需要：

```bash
pnpm add -D vite @vitejs/plugin-vue typescript vue-tsc
```

样式入口通常要引入：

```ts
import 'vant/lib/index.css';
import '@your-renderer/style.css';
```

## 7. 两种接入方式

### 7.1 方式一：把 renderer 当包使用

适合：

- 你希望作为 workspace 包引用
- 你以后可能发私有 npm 包
- 你不想把源码复制进业务仓库

最小接线示例：

```ts
import { createApp } from 'vue';
import { Catalog, MessageProcessor } from '@a2ui/web_core/v0_9';
import {
  A2UiVueRenderer,
  BASIC_CATALOG_ID,
  BASIC_COMPONENTS,
  BASIC_FUNCTIONS,
  BASIC_THEME_SCHEMA,
  VANT_CATALOG_ID,
  VANT_COMPONENTS,
  VANT_FUNCTIONS,
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

### 7.2 方式二：把源码复制进业务工程，本地维护

适合：

- 你已经确定后续会大量魔改
- 你希望 renderer 和业务一起维护
- 你现在不想处理包发布

推荐至少复制这些目录：

- [src](/Users/lee/a2ui-vant-renderer/src)
- [src/components](/Users/lee/a2ui-vant-renderer/src/components)
- [src/catalog](/Users/lee/a2ui-vant-renderer/src/catalog)
- [src/composables](/Users/lee/a2ui-vant-renderer/src/composables)
- [src/core](/Users/lee/a2ui-vant-renderer/src/core)
- [src/utils](/Users/lee/a2ui-vant-renderer/src/utils)
- [src/style.css](/Users/lee/a2ui-vant-renderer/src/style.css)

如果你要参考构建配置，再看这些：

- [package.json](/Users/lee/a2ui-vant-renderer/package.json)
- [vite.config.ts](/Users/lee/a2ui-vant-renderer/vite.config.ts)
- [tsconfig.json](/Users/lee/a2ui-vant-renderer/tsconfig.json)
- [tsconfig.app.json](/Users/lee/a2ui-vant-renderer/tsconfig.app.json)
- [tsconfig.node.json](/Users/lee/a2ui-vant-renderer/tsconfig.node.json)

## 8. 这个项目里最关键的文件

如果你想快速理解这套 renderer，优先看这几个：

- [src/A2UIRendererPlugin.ts](/Users/lee/a2ui-vant-renderer/src/A2UIRendererPlugin.ts)
  Vue 插件入口，负责注册 catalog
- [src/composables/A2UIProvider.vue](/Users/lee/a2ui-vant-renderer/src/composables/A2UIProvider.vue)
  把 `MessageProcessor` 桥接进 Vue 组件树，同时把 theme 写成 CSS 变量
- [src/core/ComponentNode.vue](/Users/lee/a2ui-vant-renderer/src/core/ComponentNode.vue)
  根据节点类型找到组件实现，然后递归渲染
- [src/core/defaultCatalog.ts](/Users/lee/a2ui-vant-renderer/src/core/defaultCatalog.ts)
  内置 catalog 的注册位置
- [src/catalog/index.ts](/Users/lee/a2ui-vant-renderer/src/catalog/index.ts)
  对外导出 catalog 相关内容
- [src/composables/useBoundProps.ts](/Users/lee/a2ui-vant-renderer/src/composables/useBoundProps.ts)
  标准组件推荐的绑定方式
- [src/composables/useA2UI.ts](/Users/lee/a2ui-vant-renderer/src/composables/useA2UI.ts)
  特殊组件的底层工具

## 9. 推荐开发方式：先分清两类组件

这里是这套 renderer 最重要的开发约定。

你以后写组件，先问自己一句：

“这是标准 schema 组件，还是一个自定义逻辑组件？”

### 9.1 第一类：标准组件

特点：

- 字段结构固定
- schema 能明确描述
- 主要工作是渲染、双向绑定、发 action

例子：

- `Button`
- `TextField`
- `CheckBox`
- `ChoicePicker`
- `Slider`
- `DateTimeInput`

这类组件推荐用：

- `ComponentApi`
- `useBoundProps`

### 9.2 第二类：特殊组件

特点：

- 输入结构更开放
- 组件内部要自己做组合、解释、计算
- 不只是“按字段渲染”

例子：

- 多字段汇总卡片
- 条件规则面板
- 解释一组路径后生成摘要
- 有点像 `computed` / selector 的组件

这类组件推荐用：

- 自己定义 schema
- `useA2UI`

## 10. 标准组件怎么写：推荐用 `useBoundProps`

### 10.1 为什么推荐 `useBoundProps`

它会帮你做这些事：

- 根据 `api.schema` 自动解析动态值
- 自动生成 `setValue()` 这种 setter
- 自动把 `action` 变成可执行函数
- 自动处理 `checks` 派生出来的校验结果

也就是说，组件里尽量不要自己手写：

- `resolveValue(...)`
- `setData(...)`
- `dispatchNodeAction(...)`

而是尽量先拿到“处理后的 props”。

### 10.2 一个最小示例

```ts
import { computed, toRef } from 'vue';
import { useBoundProps } from '../composables/useBoundProps';
import { VantTextFieldApi } from '../catalog/vant-components';

const props = defineProps<{ node: ComponentModel }>();
const { boundProps } = useBoundProps(toRef(props, 'node'), VantTextFieldApi);

const label = computed(() => boundProps.value.label ?? '');

const modelValue = computed({
  get: () => boundProps.value.value ?? '',
  set: (value: string) => {
    boundProps.value.setValue?.(value);
  },
});
```

### 10.3 什么时候适合它

适合：

- 表单组件
- 按钮组件
- 简单展示组件
- 大多数 catalog 里的常规组件

不太适合：

- 输入结构很开放的组件
- 你自己要解释一堆路径或规则的组件

## 11. 特殊组件怎么写：用 `useA2UI`

### 11.1 `useA2UI` 是干什么的

它是底层工具，不是默认首选，但非常有用。

它提供这些能力：

- `resolveValue(...)`
- `resolveDynamicChildren(...)`
- `setData(...)`
- `dispatchNodeAction(...)`

适合“标准 schema 绑定不够表达”的场景。

### 11.2 一个真实例子

demo 里已经带了一个专门的示例组件：

- [examples/client/src/components/A2UISmartSummary.vue](/Users/lee/a2ui-vant-renderer/examples/client/src/components/A2UISmartSummary.vue)

这个组件的思路是：

- schema 里定义 `paths: string[]`
- 组件内部逐个 `resolveValue({ path })`
- 把多个值拼成一段 summary
- 点击按钮时写回到 `persistTo`
- 再发一个 action

它不是标准表单组件，更像一个“带业务计算的小组件”。

### 11.3 最小写法长这样

```ts
const { resolveValue, setData, dispatchNodeAction } = useA2UI();

const entries = computed(() => {
  return paths.value.map((path) => {
    return resolveValue({ path });
  });
});

const syncSummary = () => {
  setData('/some/path', summary.value);
  dispatchNodeAction(props.node, { summary: summary.value });
};
```

### 11.4 什么时候该用它

如果你遇到下面这些情况，就优先考虑 `useA2UI`：

- schema 里不是固定几个字段，而是一组路径 / 规则 / 映射配置
- 组件需要自己组合多个值
- 组件需要跨多个路径做派生逻辑
- 组件要自己决定如何回写数据
- 组件更像一个“小解释器”或“小计算器”

### 11.5 一个容易误解的点

不是“你把 `DynamicStringSchema` 改成数组”。

更准确地说，是：

- 你自定义了一个新的组件 schema
- 在这个 schema 里新增了自己的字段，比如 `paths: string[]`
- 然后组件内部再自己调用 `resolveValue({ path })`

这是自定义组件协议，不是修改 A2UI 官方 `DynamicStringSchema`。

## 12. `useBoundProps` 和 `useA2UI` 怎么选

记住这一条就够了：

- 标准 catalog 组件，优先 `useBoundProps`
- 特殊逻辑组件，优先 `useA2UI`

更具体一点：

- 固定字段表单组件：`useBoundProps`
- 固定字段展示组件：`useBoundProps`
- 布局组件：两种都可以，当前这套 renderer 统一也走了 `useBoundProps`
- 自定义聚合 / 规则 / 汇总组件：`useA2UI`

## 13. 如何新增一个组件

如果你是第一次加组件，照这 5 步做就行。

### 13.1 第一步：先决定加到哪套 catalog

你先想清楚：

- 是加到 `basic`
- 还是加到 `vant`
- 还是新建第三套 catalog

如果只是给 `vant` 补一个新移动端组件，通常直接加到 `VANT_CATALOG_ID` 就行。

### 13.2 第二步：写 `ComponentApi`

比如：

```ts
export const MyBadgeApi = {
  name: 'MyBadge',
  schema: z.object({
    text: DynamicStringSchema,
    color: DynamicStringSchema.optional(),
  }).strict(),
} satisfies ComponentApi;
```

注意：

- 尽量用 `satisfies ComponentApi`
- 不要写成 `const xxx: ComponentApi = ...`

原因是前者能保留更精确的 schema 类型，后续 `useBoundProps` 才更有意义。

### 13.3 第三步：写 Vue 组件

标准组件：

- 优先 `useBoundProps`

特殊组件：

- 优先 `useA2UI`

### 13.4 第四步：注册到 catalog

如果是内置 `vant` 组件：

- 在 [src/catalog/vant-components.ts](/Users/lee/a2ui-vant-renderer/src/catalog/vant-components.ts) 里补 API
- 在 [src/components/vant.ts](/Users/lee/a2ui-vant-renderer/src/components/vant.ts) 里补实现映射

如果是第三套 catalog：

- 用 [registerCatalogDefinition](/Users/lee/a2ui-vant-renderer/src/core/defaultCatalog.ts)
- 或者在插件初始化时通过 `catalogs` 传进去

### 13.5 第五步：别忘了把 API 也注册进去

只注册组件实现不够。

你还要注册对应的 `ComponentApi`，否则：

- agent 看不到完整 schema
- `getCatalogSchema()` 不完整
- 运行时的 catalog 能力说明也不完整

## 14. 如何同时支持多套 catalog

示例：

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

客户端能力协商时，通常也要上报：

```ts
const supportedCatalogIds = [VANT_CATALOG_ID, BASIC_CATALOG_ID];
```

如果你是移动端优先，建议把 `VANT_CATALOG_ID` 放前面。

## 15. 如何加第三套自定义 catalog

推荐顺序：

1. 写 Vue 组件
2. 写 `ComponentApi`
3. 定义新的 `catalogId`
4. 注册组件实现和 `api`
5. 把这个 `catalogId` 上报给 agent

注册入口：

- [registerCatalogDefinition](/Users/lee/a2ui-vant-renderer/src/core/defaultCatalog.ts)

示例：

```ts
import { registerCatalogDefinition, defaultRegistry } from '@your-renderer';

registerCatalogDefinition(
  defaultRegistry,
  'urn:my:catalog:v1',
  {
    MyCard: MyCardComponent,
  },
  {
    MyCard: MyCardApi,
  },
);
```

如果你只是给 `vant` 扩一两个组件，不一定要单独开新 `catalogId`。

很多时候更简单的做法是：

- 仍然注册到 `VANT_CATALOG_ID`
- 把 `VANT_COMPONENTS` 和你的新 `api` 合并后一起给 `MessageProcessor`

因为一个 surface 只能有一个 `catalogId`。

## 16. 主题怎么理解

这套 renderer 现在走的是：

- `createSurface.theme`
- 进入 `surface.theme`
- `A2UIProvider` 转成 CSS 变量
- 组件再消费这些 CSS 变量

关键文件：

- [A2UIProvider.vue](/Users/lee/a2ui-vant-renderer/src/composables/A2UIProvider.vue)

比如现在已经接上的主题变量有：

- `--a2ui-primary-color`
- `--a2ui-error-color`
- `--a2ui-background-color`
- `--a2ui-surface-color`

目前按钮已经明确吃到了 `--a2ui-primary-color`。

## 17. 间距 / spacing 现在的现状

这点要说清楚，免得你误会。

当前 renderer：

- 有默认间距
- 但大多是写死在样式里的
- 还没有一套完整的“通过 schema 配 gap / margin / padding”的能力

比如：

- `Row / Column / List` 现在默认有 `gap`
- `Card / Modal` 默认有 `padding`
- 但这些不是通用 schema 能力

所以如果 demo 看起来有点挤，很多时候需要：

- 先通过 JSON 结构重新分组
- 或者后续再补真正的 spacing schema

## 18. Vant 示例里为什么有 `Card`、`CellGroup`、`Column`

因为它们职责不一样：

- `CellGroup`
  更像一组 Vant cell / 表单项的容器
- `Card`
  更适合把一整块内容包起来
- `Column`
  更适合在几个区块之间拉开垂直间距

如果你发现所有内容都挤在一个 `CellGroup` 里，通常应该优先改 JSON 结构，而不是先去改组件代码。

## 19. 一些你刚上手最容易踩的坑

- `createSurface.catalogId` 和本地注册的 `catalogId` 不一致，页面不会按预期渲染
- 一个 surface 只能用一个 `catalogId`
- 只注册了组件实现、没注册 `ComponentApi`，schema 会不完整
- 自定义组件如果其实只是扩展 `vant`，不要轻易新开 catalog
- `ChoicePicker` 和 `CheckBox` 语义不同
  - `CheckBox` 是单个布尔开关
  - `ChoicePicker` 是一组选项选择器
- 动态列表或相对路径写回时，不要自己乱操作底层数据对象，优先走 renderer 提供的绑定方式
- 如果你写布局组件，`children` 可能既有字符串数组，也有对象数组
  - 当前仓库已经用 [normalizeChildren.ts](/Users/lee/a2ui-vant-renderer/src/composables/normalizeChildren.ts) 统一处理

## 20. Demo 在哪里

可运行 demo：

- [examples/client](/Users/lee/a2ui-vant-renderer/examples/client)

主要文件：

- [examples/client/src/App.vue](/Users/lee/a2ui-vant-renderer/examples/client/src/App.vue)
- [examples/client/src/main.ts](/Users/lee/a2ui-vant-renderer/examples/client/src/main.ts)
- [examples/client/src/customCatalog.ts](/Users/lee/a2ui-vant-renderer/examples/client/src/customCatalog.ts)
- [examples/client/src/components/A2UISmartSummary.vue](/Users/lee/a2ui-vant-renderer/examples/client/src/components/A2UISmartSummary.vue)

## 21. 怎么运行

构建主包：

```bash
cd /Users/lee/a2ui-vant-renderer
pnpm build
```

运行 demo：

```bash
cd /Users/lee/a2ui-vant-renderer/examples/client
pnpm build
pnpm dev
```

## 22. 现在这个项目适合你拿来做什么

它现在已经适合：

- 作为业务工程接入起点
- 继续补 Vant 组件映射
- 维护自己的 catalog
- 给 agent 提供可运行的 renderer

它现在还不算：

- 一个已经完整覆盖全部 Vant 组件的成品库
- 一个 spacing / theme / design token 都完全成熟的设计系统

## 23. 给刚接手的人一个最短建议

如果你是第一次接手这个项目，不要一上来就大改。

建议顺序：

1. 先跑通 demo
2. 看懂 `MessageProcessor + Catalog + A2UIProvider + ComponentNode`
3. 先用 `useBoundProps` 写一个简单标准组件
4. 再看 `A2UISmartSummary`，理解 `useA2UI` 适合什么场景
5. 最后再开始补自己的 catalog

这样最稳，也最不容易把自己绕进去。

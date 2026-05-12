export { A2UiVueRenderer, default as plugin } from './A2UIRendererPlugin';
export type {
  A2UiVueRendererOptions,
  CatalogRegistration,
} from './A2UIRendererPlugin';

export { default as A2UIProvider } from './composables/A2UIProvider.vue';
export { A2UI_CONTEXT_KEY, useA2UI } from './composables/useA2UI';
export type { A2UIActionPayload, A2UIContext } from './composables/useA2UI';
export { useDynamicProps } from './composables/useDynamicProps';

export { default as ComponentNode } from './core/ComponentNode.vue';
export {
  A2UI_REGISTRY_KEY,
  ComponentRegistry,
  defaultRegistry,
} from './core/ComponentRegistry';
export {
  BASIC_CATALOG_ID,
  VANT_CATALOG_ID,
  DEFAULT_CATALOG_ID,
} from './core/constants';
export type {
  A2UIRuntimeOptions,
  A2UIRuntimePlatform,
} from './core/runtimeOptions';
export {
  registerBasicCatalog,
  registerVantCatalog,
  registerCatalogDefinition,
} from './core/defaultCatalog';
export { getCatalogSchema } from './core/getCatalogSchema';
export type { GetCatalogSchemaOptions } from './core/getCatalogSchema';
export { catalogFilters } from './core/catalogFilters';
export type { CatalogFilter } from './core/catalogFilters';
export {
  BASIC_COMPONENTS,
  BASIC_FUNCTIONS,
  BASIC_THEME_SCHEMA,
  VANT_COMPONENTS,
  VANT_FUNCTIONS,
  VANT_THEME_SCHEMA,
  basicCatalogSchema,
  vantCatalogSchema,
} from './catalog';

export type { ComponentModel } from '@a2ui/web_core/v0_9';

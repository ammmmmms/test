import type { App, Component, Plugin } from 'vue';
import A2UIProvider from './composables/A2UIProvider.vue';
import ComponentNode from './core/ComponentNode.vue';
import {
  A2UI_REGISTRY_KEY,
  defaultRegistry,
  type ComponentRegistry,
} from './core/ComponentRegistry';
import {
  registerBasicCatalog,
  registerCatalogDefinition,
  registerVantCatalog,
} from './core/defaultCatalog';
import {
  A2UI_RUNTIME_OPTIONS_KEY,
  type A2UIRuntimeOptions,
} from './core/runtimeOptions';
import type { ComponentApi } from '@a2ui/web_core/v0_9';

export interface CatalogRegistration {
  catalogId: string;
  components: Record<string, Component>;
  apis?: Record<string, ComponentApi>;
}

export interface A2UiVueRendererOptions {
  registry?: ComponentRegistry;
  registerBasicCatalog?: boolean;
  registerVantCatalog?: boolean;
  runtime?: A2UIRuntimeOptions;
  catalogs?: CatalogRegistration[];
}

export const A2UiVueRenderer: Plugin = {
  install(app: App, options?: A2UiVueRendererOptions) {
    const registry = options?.registry ?? defaultRegistry;

    app.component('A2uiProvider', A2UIProvider);
    app.component('A2uiComponentNode', ComponentNode);
    app.provide(A2UI_REGISTRY_KEY, registry);
    app.provide(A2UI_RUNTIME_OPTIONS_KEY, options?.runtime ?? {});

    if (options?.registerBasicCatalog !== false) {
      registerBasicCatalog(registry);
    }

    if (options?.registerVantCatalog !== false) {
      registerVantCatalog(registry);
    }

    for (const catalog of options?.catalogs ?? []) {
      registerCatalogDefinition(
        registry,
        catalog.catalogId,
        catalog.components,
        catalog.apis,
      );
    }
  },
};

export default A2UiVueRenderer;

import type { ComponentApi } from '@a2ui/web_core/v0_9';
import type { Component } from 'vue';
import { BASIC_CATALOG_ID, VANT_CATALOG_ID } from './constants';
import { defaultRegistry, type ComponentRegistry } from './ComponentRegistry';
import { basicComponentImplementations } from '../components/basic';
import { vantComponentImplementations } from '../components/vant';
import { BASIC_COMPONENTS, VANT_COMPONENTS } from '../catalog';

function toApiMap(apis: ComponentApi[]): Record<string, ComponentApi> {
  return Object.fromEntries(apis.map((api) => [api.name, api]));
}

export function registerCatalogDefinition(
  registry: ComponentRegistry,
  catalogId: string,
  components: Record<string, Component>,
  apis?: Record<string, ComponentApi>,
) {
  registry.registerAll(catalogId, components, apis);
}

export function registerBasicCatalog(registry: ComponentRegistry = defaultRegistry) {
  registerCatalogDefinition(
    registry,
    BASIC_CATALOG_ID,
    basicComponentImplementations,
    toApiMap(BASIC_COMPONENTS),
  );
}

export function registerVantCatalog(registry: ComponentRegistry = defaultRegistry) {
  registerCatalogDefinition(
    registry,
    VANT_CATALOG_ID,
    vantComponentImplementations,
    toApiMap(VANT_COMPONENTS),
  );
}

import { Component, Plugin } from 'vue';
import { ComponentRegistry } from './core/ComponentRegistry';
import { ComponentApi } from '@a2ui/web_core/v0_9';
export interface CatalogRegistration {
    catalogId: string;
    components: Record<string, Component>;
    apis?: Record<string, ComponentApi>;
}
export interface A2UiVueRendererOptions {
    registry?: ComponentRegistry;
    registerBasicCatalog?: boolean;
    registerVantCatalog?: boolean;
    catalogs?: CatalogRegistration[];
}
export declare const A2UiVueRenderer: Plugin;
export default A2UiVueRenderer;

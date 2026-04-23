import { ComponentApi } from '@a2ui/web_core/v0_9';
import { Component, InjectionKey } from 'vue';
export declare const A2UI_REGISTRY_KEY: InjectionKey<ComponentRegistry>;
export declare class ComponentRegistry {
    private catalogs;
    private apis;
    register(catalogId: string, type: string, component: Component, api?: ComponentApi): void;
    registerAll(catalogId: string, components: Record<string, Component>, apis?: Record<string, ComponentApi>): void;
    get(catalogId: string, type: string): Component | undefined;
    getApi(catalogId: string, type: string): ComponentApi | undefined;
    has(catalogId: string, type: string): boolean;
    keys(catalogId: string): string[];
}
export declare const defaultRegistry: ComponentRegistry;

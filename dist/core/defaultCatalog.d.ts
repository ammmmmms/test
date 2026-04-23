import { ComponentApi } from '@a2ui/web_core/v0_9';
import { Component } from 'vue';
import { ComponentRegistry } from './ComponentRegistry';
export declare function registerCatalogDefinition(registry: ComponentRegistry, catalogId: string, components: Record<string, Component>, apis?: Record<string, ComponentApi>): void;
export declare function registerBasicCatalog(registry?: ComponentRegistry): void;
export declare function registerVantCatalog(registry?: ComponentRegistry): void;

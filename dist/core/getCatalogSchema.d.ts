import { ComponentRegistry } from './ComponentRegistry';
import { CatalogFilter } from './catalogFilters';
export interface GetCatalogSchemaOptions {
    filter?: CatalogFilter;
}
export declare function getCatalogSchema(registry: ComponentRegistry, catalogId: string, options?: GetCatalogSchemaOptions): Record<string, any>;

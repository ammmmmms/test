export type CatalogFilter = (componentName: string) => boolean;
/**
 * Pre-built filter predicates for use with `getCatalogSchema`.
 *
 * @example
 * ```ts
 * import { getCatalogSchema, catalogFilters } from '@a2ui/vue-renderer'
 *
 * // Only custom (non-built-in) components
 * getCatalogSchema(registry, catalogId, { filter: catalogFilters.customOnly })
 *
 * // Only specific components
 * getCatalogSchema(registry, catalogId, { filter: catalogFilters.only('Button', 'TextField') })
 *
 * // Everything except a few
 * getCatalogSchema(registry, catalogId, { filter: catalogFilters.exclude('Table', 'Calendar') })
 * ```
 */
export declare const catalogFilters: {
    /** Keeps only components that are NOT in the built-in basic/vant catalogs. */
    customOnly: CatalogFilter;
    /** Keeps only the listed component names. */
    only(...names: string[]): CatalogFilter;
    /** Keeps everything except the listed component names. */
    exclude(...names: string[]): CatalogFilter;
};

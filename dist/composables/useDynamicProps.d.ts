import { MaybeRefOrGetter, Ref } from 'vue';
/**
 * A composable that automatically resolves data bindings for a given A2UI node.
 * Useful for authoring custom components without needing to manually wrap every property in `resolveValue`.
 *
 * @param node The A2UI component node definition.
 * @returns A computed ref containing the resolved properties.
 */
export declare function useDynamicProps<T extends Record<string, any>>(node: MaybeRefOrGetter<T>): Ref<Record<string, any>>;

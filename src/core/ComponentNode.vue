<script setup lang="ts">
  import { computed, inject, provide } from 'vue';
  import { A2UI_CONTEXT_KEY } from '../composables/useA2UI';
  import { A2UI_REGISTRY_KEY, ComponentRegistry, defaultRegistry } from './ComponentRegistry';
  import { DEFAULT_CATALOG_ID } from './constants';

  const props = defineProps<{
    id: string;
    path?: string; // Optional path override for dynamic template children
  }>();

  const context = inject(A2UI_CONTEXT_KEY);
  const registry = inject<ComponentRegistry>(A2UI_REGISTRY_KEY, defaultRegistry);

  // If this node is rendered with a dynamic list path, provide a new context downwards
  if (context && props.path !== undefined) {
    provide(A2UI_CONTEXT_KEY, {
      ...context,
      dataContextPath: props.path,
    });
  }

  const surface = computed(() => {
    if (!context) return undefined;
    return context.processor.model?.getSurface(context.surfaceId);
  });

  const node = computed(() => {
    return surface.value?.componentsModel?.get(props.id);
  });

  const catalogId = computed(() => {
    return surface.value?.catalogId || DEFAULT_CATALOG_ID;
  });

  const componentType = computed(() => {
    return node.value?.type;
  });

  const layoutStyle = computed(() => {
    if (!node.value) return {};
    const weight = node.value.properties.weight;

    if (typeof weight === 'number') {
      return ({ flexGrow: weight });
    }
    return {};
  });

  const resolvedComponent = computed(() => {
    if (!componentType.value) return undefined;
    return registry.get(catalogId.value, componentType.value);
  });
</script>

<template>
  <template v-if="node">
    <component
      v-if="resolvedComponent"
      :is="resolvedComponent"
      :node="node"
      :style="layoutStyle"
    />
    <div
      v-else
      class="a2ui-error-fallback"
      style="color: red; border: 1px solid red; padding: 4px"
      :style="layoutStyle"
    >
      Unknown component type: {{ componentType }}
    </div>
  </template>
  <template v-else />
</template>

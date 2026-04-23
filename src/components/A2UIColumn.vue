<script setup lang="ts">
  import type { ComponentModel } from '@a2ui/web_core/v0_9';
  import { computed } from 'vue';
  import ComponentNode from '../core/ComponentNode.vue';
  import { useA2UI } from '../composables/useA2UI';

  const props = defineProps<{ node: ComponentModel }>();
  const { resolveDynamicChildren, resolveValue } = useA2UI();

  const children = computed(() => resolveDynamicChildren(props.node.properties.children));
  const justify = computed(() => resolveValue<string | undefined>(props.node.properties.justify) ?? 'start');
  const align = computed(() => resolveValue<string | undefined>(props.node.properties.align) ?? 'stretch');
</script>

<template>
  <div
    class="a2ui-column"
    :data-justify="justify"
    :data-align="align"
  >
    <ComponentNode
      v-for="(child, index) in children"
      :key="`${child.id}-${index}`"
      :id="child.id"
      :path="child.path"
    />
  </div>
</template>

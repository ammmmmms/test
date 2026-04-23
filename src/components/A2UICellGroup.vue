<script setup lang="ts">
  import { CellGroup as VanCellGroup } from 'vant';
  import type { ComponentModel } from '@a2ui/web_core/v0_9';
  import { computed } from 'vue';
  import ComponentNode from '../core/ComponentNode.vue';
  import { useA2UI } from '../composables/useA2UI';

  const props = defineProps<{ node: ComponentModel }>();
  const { resolveDynamicChildren, resolveValue } = useA2UI();

  const title = computed(() => resolveValue<string | undefined>(props.node.properties.title) ?? '');
  const inset = computed(() => !!resolveValue<boolean | undefined>(props.node.properties.inset));
  const children = computed(() => resolveDynamicChildren(props.node.properties.children));
</script>

<template>
  <VanCellGroup :title="title || undefined" :inset="inset">
    <ComponentNode
      v-for="(child, index) in children"
      :key="`${child.id}-${index}`"
      :id="child.id"
      :path="child.path"
    />
  </VanCellGroup>
</template>

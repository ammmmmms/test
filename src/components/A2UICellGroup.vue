<script setup lang="ts">
  import { CellGroup as VanCellGroup } from 'vant';
  import type { ComponentModel } from '@a2ui/web_core/v0_9';
  import { computed, toRef } from 'vue';
  import ComponentNode from '../core/ComponentNode.vue';
  import { CellGroupApi } from '../catalog/vant-components';
  import { useBoundProps } from '../composables/useBoundProps';
  import { normalizeChildren } from '../composables/normalizeChildren';

  const props = defineProps<{ node: ComponentModel }>();
  const { boundProps } = useBoundProps(toRef(props, 'node'), CellGroupApi);

  const title = computed(() => boundProps.value.title ?? '');
  const inset = computed(() => !!boundProps.value.inset);
  const children = computed(() => normalizeChildren(boundProps.value.children));
</script>

<template>
  <VanCellGroup :title="title || undefined" :inset="inset">
    <ComponentNode
      v-for="(child, index) in children"
      :key="`${child.id}-${index}`"
      :id="child.id"
      :path="child.basePath"
    />
  </VanCellGroup>
</template>

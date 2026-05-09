<script setup lang="ts">
  import type { ComponentModel } from '@a2ui/web_core/v0_9';
  import type { CSSProperties } from 'vue';
  import { computed, toRef } from 'vue';
  import { VantColumnApi } from '../catalog/vant-components';
  import ComponentNode from '../core/ComponentNode.vue';
  import { useBoundProps } from '../composables/useBoundProps';
  import { normalizeChildren } from '../composables/normalizeChildren';

  const props = defineProps<{ node: ComponentModel }>();
  const { boundProps } = useBoundProps(toRef(props, 'node'), VantColumnApi);

  const children = computed(() => normalizeChildren(boundProps.value.children));
  const justify = computed(() => boundProps.value.justify ?? 'start');
  const align = computed(() => boundProps.value.align ?? 'stretch');
  const columnStyle = computed<CSSProperties>(() => {
    const gap = Number(boundProps.value.gap);
    return Number.isFinite(gap) && gap >= 0 ? { gap: `${gap}px` } : {};
  });
</script>

<template>
  <div
    class="a2ui-column"
    :data-justify="justify"
    :data-align="align"
    :style="columnStyle"
  >
    <ComponentNode
      v-for="(child, index) in children"
      :key="`${child.id}-${index}`"
      :id="child.id"
      :path="child.basePath"
    />
  </div>
</template>

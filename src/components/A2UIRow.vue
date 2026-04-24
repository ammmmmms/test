<script setup lang="ts">
  import type { ComponentModel } from '@a2ui/web_core/v0_9';
  import { RowApi } from '@a2ui/web_core/v0_9/basic_catalog';
  import { computed, toRef } from 'vue';
  import ComponentNode from '../core/ComponentNode.vue';
  import { useBoundProps } from '../composables/useBoundProps';
  import { normalizeChildren } from '../composables/normalizeChildren';

  const props = defineProps<{ node: ComponentModel }>();
  const { boundProps } = useBoundProps(toRef(props, 'node'), RowApi);

  const children = computed(() => normalizeChildren(boundProps.value.children));
  const justify = computed(() => boundProps.value.justify ?? 'start');
  const align = computed(() => boundProps.value.align ?? 'stretch');
</script>

<template>
  <div
    class="a2ui-row"
    :data-justify="justify"
    :data-align="align"
  >
    <ComponentNode
      v-for="(child, index) in children"
      :key="`${child.id}-${index}`"
      :id="child.id"
      :path="child.basePath"
    />
  </div>
</template>

<script setup lang="ts">
  import type { ComponentModel } from '@a2ui/web_core/v0_9';
  import { computed, toRef, type CSSProperties } from 'vue';
  import ComponentNode from '../core/ComponentNode.vue';
  import { useBoundProps } from '../composables/useBoundProps';
  import { VantCardApi } from '../catalog/vant-components';

  const props = defineProps<{ node: ComponentModel }>();
  const { boundProps } = useBoundProps(toRef(props, 'node'), VantCardApi);
  const childId = computed(() => boundProps.value.child);
  const cardStyle = computed<CSSProperties>(() => {
    const style = boundProps.value.style;
    if (!style || typeof style !== 'object') return {};
    return style as CSSProperties;
  });
</script>

<template>
  <div
    class="a2ui-card"
    :style="cardStyle"
  >
    <ComponentNode
      v-if="childId"
      :id="childId"
    />
  </div>
</template>

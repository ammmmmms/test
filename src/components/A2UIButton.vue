<script setup lang="ts">
  import { Button as VanButton } from 'vant';
  import type { ComponentModel } from '@a2ui/web_core/v0_9';
  import { computed, toRef } from 'vue';
  import ComponentNode from '../core/ComponentNode.vue';
  import { useBoundProps } from '../composables/useBoundProps';
  import { VantButtonApi } from '../catalog/vant-components';

  const props = defineProps<{ node: ComponentModel }>();
  const { boundProps } = useBoundProps(toRef(props, 'node'), VantButtonApi);

  const childId = computed(() => boundProps.value.child);
  const hhhh = computed(() => boundProps.value.hhhh);
  const label = computed(() => {
    return boundProps.value.label ?? boundProps.value.text ?? '';
  });
  const type = computed(() => {
    const variant = boundProps.value.variant;
    switch (variant) {
      case 'primary':
        return 'primary';
      case 'danger':
        return 'danger';
      case 'success':
        return 'success';
      default:
        return 'default';
    }
  });
  const plain = computed(() => boundProps.value.variant === 'borderless');
  const block = computed(() => !!boundProps.value.block);
  const variantClass = computed(() => {
    const variant = boundProps.value.variant ?? 'default';
    return `a2ui-button--${variant}`;
  });
</script>

<template>
  <VanButton
    class="a2ui-button"
    :class="variantClass"
    :type="type"
    :plain="plain"
    :block="block"
    @click="boundProps.action?.()"
  >
    <ComponentNode
      v-if="childId"
      :id="childId"
    />
    <template v-else>{{ label || hhhh }}</template>
  </VanButton>
</template>

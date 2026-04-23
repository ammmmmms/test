<script setup lang="ts">
  import { Button as VanButton } from 'vant';
  import type { ComponentModel } from '@a2ui/web_core/v0_9';
  import { computed } from 'vue';
  import ComponentNode from '../core/ComponentNode.vue';
  import { useA2UI } from '../composables/useA2UI';

  const props = defineProps<{ node: ComponentModel }>();
  const { resolveValue, dispatchNodeAction } = useA2UI();

  const childId = computed(() => resolveValue<string | undefined>(props.node.properties.child));
  const label = computed(() => {
    return (
      resolveValue<string | undefined>(props.node.properties.label) ??
      resolveValue<string | undefined>(props.node.properties.text) ??
      ''
    );
  });
  const type = computed(() => {
    const variant = resolveValue<string | undefined>(props.node.properties.variant);
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
  const plain = computed(() => resolveValue<string | undefined>(props.node.properties.variant) === 'borderless');
  const block = computed(() => !!resolveValue<boolean | undefined>(props.node.properties.block));
  const variantClass = computed(() => {
    const variant = resolveValue<string | undefined>(props.node.properties.variant) ?? 'default';
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
    @click="dispatchNodeAction(node)"
  >
    <ComponentNode
      v-if="childId"
      :id="childId"
    />
    <template v-else>{{ label }}</template>
  </VanButton>
</template>

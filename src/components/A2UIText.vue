<script setup lang="ts">
  import type { ComponentModel } from '@a2ui/web_core/v0_9';
  import { computed } from 'vue';
  import { useA2UI } from '../composables/useA2UI';

  const props = defineProps<{ node: ComponentModel }>();
  const { resolveValue } = useA2UI();

  const text = computed(() => resolveValue<string | undefined>(props.node.properties.text) ?? '');
  const variant = computed(() => resolveValue<string | undefined>(props.node.properties.variant) ?? 'body');
</script>

<template>
  <div :class="['a2ui-text', `a2ui-text--${variant}`]">{{ text }}</div>
</template>

<script setup lang="ts">
  import type { ComponentModel } from '@a2ui/web_core/v0_9';
  import { TextApi } from '@a2ui/web_core/v0_9/basic_catalog';
  import { computed, toRef } from 'vue';
  import { useBoundProps } from '../composables/useBoundProps';

  const props = defineProps<{ node: ComponentModel }>();
  const { boundProps } = useBoundProps(toRef(props, 'node'), TextApi);

  const text = computed(() => boundProps.value.text ?? '');
  const variant = computed(() => boundProps.value.variant ?? 'body');
</script>

<template>
  <div :class="['a2ui-text', `a2ui-text--${variant}`]">{{ text }}</div>
</template>

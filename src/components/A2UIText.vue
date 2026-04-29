<script setup lang="ts">
  import { renderMarkdown } from '@a2ui/markdown-it';
  import type { ComponentModel } from '@a2ui/web_core/v0_9';
  import { TextApi } from '@a2ui/web_core/v0_9/basic_catalog';
  import { computed, ref, toRef, watchEffect } from 'vue';
  import { useBoundProps } from '../composables/useBoundProps';

  const props = defineProps<{ node: ComponentModel }>();
  const { boundProps } = useBoundProps(toRef(props, 'node'), TextApi);

  const text = computed(() => boundProps.value.text ?? '');
  const variant = computed(() => boundProps.value.variant ?? 'body');
  const hasText = computed(() => {
    const value = text.value;
    return value !== null && value !== undefined && String(value) !== '';
  });
  const renderedCaptionHtml = ref('');

  watchEffect(async () => {
    if (variant.value !== 'caption') {
      renderedCaptionHtml.value = '';
      return;
    }

    renderedCaptionHtml.value = await renderMarkdown(String(text.value ?? ''));
  });
</script>

<template>
  <div
    v-if="hasText"
    :class="['a2ui-text', `a2ui-text--${variant}`]"
  >
    <div
      v-if="variant === 'caption'"
      v-html="renderedCaptionHtml"
    />
    <template v-else>{{ text }}</template>
  </div>
</template>

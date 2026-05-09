<script setup lang="ts">
  import { renderMarkdown } from '@a2ui/markdown-it';
  import type { CSSProperties } from 'vue';
  import type { ComponentModel } from '@a2ui/web_core/v0_9';
  import { computed, ref, toRef, watchEffect } from 'vue';
  import { VantTextApi } from '../catalog/vant-components';
  import { useBoundProps } from '../composables/useBoundProps';

  const props = defineProps<{ node: ComponentModel }>();
  const { boundProps } = useBoundProps(toRef(props, 'node'), VantTextApi);

  const text = computed(() => boundProps.value.text ?? '');
  const variant = computed(() => boundProps.value.variant ?? 'body');
  const lineCount = computed(() => {
    const value = Number(boundProps.value.lines);
    return Number.isFinite(value) && value > 0 ? Math.floor(value) : undefined;
  });
  const textStyle = computed<CSSProperties>(() => {
    const style = { ...(boundProps.value.style ?? {}) } as CSSProperties;

    if (lineCount.value) {
      style.display = '-webkit-box';
      style.WebkitBoxOrient = 'vertical';
      style.WebkitLineClamp = String(lineCount.value);
      style.overflow = 'hidden';
      style.textOverflow = 'ellipsis';
    }

    return style;
  });
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
    :style="textStyle"
  >
    <div
      v-if="variant === 'caption'"
      v-html="renderedCaptionHtml"
    />
    <template v-else>{{ text }}</template>
  </div>
</template>

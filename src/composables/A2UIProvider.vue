<script setup lang="ts">
  import { computed, provide, shallowRef, onMounted, onUnmounted } from 'vue';
  import { A2UI_CONTEXT_KEY } from './useA2UI';

  const props = defineProps<{
    processor: any;
    surfaceId: string;
    onAction?: (action: any) => void;
  }>();

  const updateKey = shallowRef(0);

  const handleUpdate = () => {
    updateKey.value++;
  };

  onMounted(() => {
    if (typeof props.processor?.addEventListener === 'function') {
      props.processor.addEventListener('update', handleUpdate);
    }
  });

  onUnmounted(() => {
    if (typeof props.processor?.removeEventListener === 'function') {
      props.processor.removeEventListener('update', handleUpdate);
    }
  });

  const surface = computed(() => props.processor?.model?.getSurface(props.surfaceId));
  const themeStyle = computed<Record<string, string>>(() => {
    const theme = surface.value?.theme ?? {};
    return {
      '--a2ui-color-primary': theme.colorPrimary ?? theme.primaryColor ?? '',
      '--a2ui-color-background': theme.colorBackground ?? theme.backgroundColor ?? '',
      '--a2ui-color-surface': theme.colorSurface ?? theme.surfaceColor ?? '',
      '--a2ui-color-on-background': theme.colorOnBackground ?? '',
      '--a2ui-color-on-surface': theme.colorOnSurface ?? '',
      '--a2ui-color-border': theme.colorBorder ?? '',
      '--a2ui-border-radius': theme.borderRadius ?? theme.roundRadius ?? '',
      '--a2ui-font-size': theme.fontSize ?? '',
      '--a2ui-font-scale': theme.fontScale ?? '',
      '--a2ui-spacing-m': theme.spacingM ?? '',

      // Bridge A2UI theme values into Vant variables where it helps visual parity.
      '--van-primary-color': theme.colorPrimary ?? theme.primaryColor ?? '',
      '--van-success-color': theme.colorSuccess ?? theme.successColor ?? '',
      '--van-warning-color': theme.colorWarning ?? theme.warningColor ?? '',
      '--van-danger-color': theme.errorColor ?? '',
      '--van-background': theme.colorBackground ?? theme.backgroundColor ?? '',
      '--van-background-2': theme.colorSurface ?? theme.surfaceColor ?? '',
      '--van-text-color': theme.colorOnBackground ?? '',
      '--van-border-color': theme.colorBorder ?? '',
      '--van-radius-lg': theme.borderRadius ?? theme.roundRadius ?? '',
      '--van-radius-md': theme.borderRadius ?? theme.roundRadius ?? '',
    };
  });

  provide(A2UI_CONTEXT_KEY, {
    get surfaceId() {
      return props.surfaceId;
    },
    get processor() {
      return props.processor;
    },
    onAction: (action: any) => {
      props.onAction?.(action);
    },
  });
</script>

<template>
  <div
    :key="updateKey"
    class="a2ui-provider"
    :style="themeStyle"
  >
    <slot />
  </div>
</template>

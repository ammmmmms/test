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
      '--a2ui-primary-color': theme.primaryColor ?? '',
      '--a2ui-error-color': theme.errorColor ?? '',
      '--a2ui-background-color': theme.backgroundColor ?? '',
      '--a2ui-surface-color': theme.surfaceColor ?? '',
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

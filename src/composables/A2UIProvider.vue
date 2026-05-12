<script setup lang="ts">
  import { computed, inject, provide, shallowRef, watch } from 'vue';
  import { A2UI_CONTEXT_KEY } from './useA2UI';
  import {
    A2UI_RUNTIME_OPTIONS_KEY,
    DEFAULT_A2UI_RUNTIME_OPTIONS,
    type A2UIRuntimeOptions,
  } from '../core/runtimeOptions';

  const props = defineProps<{
    processor: any;
    surfaceId: string;
    onAction?: (action: any) => void;
    runtime?: A2UIRuntimeOptions;
  }>();

  type Unsubscribable = { unsubscribe: () => void };

  const renderVersion = shallowRef(0);
  const pluginRuntime = inject(A2UI_RUNTIME_OPTIONS_KEY, {});
  const runtime = computed(() => ({
    ...DEFAULT_A2UI_RUNTIME_OPTIONS,
    ...pluginRuntime,
    ...(props.runtime ?? {}),
  }));

  const bumpRenderVersion = () => {
    renderVersion.value++;
  };

  const surface = computed(() => {
    renderVersion.value;
    return props.processor?.model?.getSurface(props.surfaceId);
  });

  watch(
    () => [props.processor, props.surfaceId] as const,
    ([processor, surfaceId], _previous, onCleanup) => {
      const subscriptions: Unsubscribable[] = [];
      let componentSubscriptions: Unsubscribable[] = [];

      const cleanupComponentSubscriptions = () => {
        for (const subscription of componentSubscriptions) {
          subscription.unsubscribe();
        }
        componentSubscriptions = [];
      };

      const attachSurfaceSubscriptions = (nextSurface: any) => {
        cleanupComponentSubscriptions();

        if (!nextSurface || nextSurface.id !== surfaceId) {
          return;
        }

        componentSubscriptions = [
          nextSurface.componentsModel.onCreated.subscribe(() => {
            bumpRenderVersion();
          }),
          nextSurface.componentsModel.onDeleted.subscribe(() => {
            bumpRenderVersion();
          }),
        ];
      };

      if (typeof processor?.onSurfaceCreated === 'function') {
        subscriptions.push(
          processor.onSurfaceCreated((createdSurface: any) => {
            if (createdSurface.id !== surfaceId) return;
            attachSurfaceSubscriptions(createdSurface);
            bumpRenderVersion();
          }),
        );
      }

      if (typeof processor?.onSurfaceDeleted === 'function') {
        subscriptions.push(
          processor.onSurfaceDeleted((deletedSurfaceId: string) => {
            if (deletedSurfaceId !== surfaceId) return;
            cleanupComponentSubscriptions();
            bumpRenderVersion();
          }),
        );
      }

      attachSurfaceSubscriptions(processor?.model?.getSurface(surfaceId));
      bumpRenderVersion();

      onCleanup(() => {
        cleanupComponentSubscriptions();
        for (const subscription of subscriptions) {
          subscription.unsubscribe();
        }
      });
    },
    { immediate: true },
  );
  const themeStyle = computed<Record<string, string>>(() => {
    const theme = surface.value?.theme ?? {};
    const styles: Record<string, string | undefined> = {
      '--a2ui-color-primary': theme.colorPrimary,
      '--a2ui-color-background': theme.colorBackground,
      '--a2ui-color-surface': theme.colorSurface,
      '--a2ui-color-on-background': theme.colorOnBackground,
      '--a2ui-color-on-surface': theme.colorOnSurface,
      '--a2ui-color-border': theme.colorBorder,
      '--a2ui-border-radius': theme.borderRadius,
      '--a2ui-font-size': theme.fontSize,
      '--a2ui-font-scale': theme.fontScale,
      '--a2ui-spacing-m': theme.spacingM,

      // Bridge A2UI theme values into Vant variables where it helps visual parity.
      '--van-primary-color': theme.colorPrimary,
      '--van-success-color': theme.colorSuccess,
      '--van-warning-color': theme.colorWarning,
      '--van-danger-color': theme.colorDanger,
      '--van-background': theme.colorBackground,
      '--van-background-2': theme.colorSurface,
      '--van-text-color': theme.colorOnBackground,
      '--van-border-color': theme.colorBorder,
      '--van-radius-lg': theme.borderRadius,
      '--van-radius-md': theme.borderRadius,
    };

    return Object.fromEntries(
      Object.entries(styles).filter(([, value]) => value !== undefined && value !== ''),
    ) as Record<string, string>;
  });

  provide(A2UI_CONTEXT_KEY, {
    get surfaceId() {
      return props.surfaceId;
    },
    get processor() {
      return props.processor;
    },
    get runtime() {
      return runtime.value;
    },
    onAction: (action: any) => {
      props.onAction?.(action);
    },
  });
</script>

<template>
  <div
    :key="renderVersion"
    class="a2ui-provider"
    :style="themeStyle"
  >
    <slot />
  </div>
</template>

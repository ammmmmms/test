import {
  ComponentContext,
  GenericBinder,
  type ComponentApi,
  type ComponentModel,
  type InferredComponentApiSchemaType,
  type ResolveA2uiProps,
} from '@a2ui/web_core/v0_9';
import { computed, inject, onUnmounted, shallowRef, watch, type MaybeRefOrGetter, toValue } from 'vue';
import { A2UI_CONTEXT_KEY } from './useA2UI';

type BoundProps<Api extends ComponentApi> = ResolveA2uiProps<
  InferredComponentApiSchemaType<Api>
>;

export function useBoundProps<Api extends ComponentApi>(
  nodeSource: MaybeRefOrGetter<ComponentModel>,
  api: Api,
) {
  const context = inject(A2UI_CONTEXT_KEY);

  if (!context) {
    throw new Error('useBoundProps must be used within an A2UIProvider');
  }

  const boundPropsRef = shallowRef<BoundProps<Api>>({} as BoundProps<Api>);
  let binder: GenericBinder<BoundProps<Api>> | null = null;
  let unsubscribe: (() => void) | null = null;

  const cleanup = () => {
    unsubscribe?.();
    unsubscribe = null;
    binder?.dispose();
    binder = null;
  };

  watch(
    () => {
      const node = toValue(nodeSource);
      return {
        processor: context.processor,
        surfaceId: context.surfaceId,
        dataContextPath: context.dataContextPath || '/',
        nodeId: node.id,
      };
    },
    ({ processor, surfaceId, dataContextPath, nodeId }) => {
      cleanup();

      const surface = processor?.model?.getSurface(surfaceId);
      if (!surface) {
        boundPropsRef.value = {} as BoundProps<Api>;
        return;
      }

      const componentContext = new ComponentContext(
        surface,
        nodeId,
        dataContextPath,
      );
      binder = new GenericBinder<BoundProps<Api>>(componentContext, api.schema);
      boundPropsRef.value = binder.snapshot;

      const subscription = binder.subscribe(nextProps => {
        boundPropsRef.value = nextProps;
      });
      unsubscribe = () => subscription.unsubscribe();
    },
    { immediate: true },
  );

  onUnmounted(() => {
    cleanup();
  });

  const contextDisabled = computed(() => context.disabled ?? false);

  return {
    boundProps: computed(() => boundPropsRef.value),
    contextDisabled,
  };
}

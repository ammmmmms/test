import {
  DataContext,
  type A2uiClientAction,
  type Action,
  type ComponentModel,
  type DynamicValue,
} from '@a2ui/web_core/v0_9';
import { computed, inject, type InjectionKey } from 'vue';
import type { A2UIRuntimeOptions } from '../core/runtimeOptions';

export type A2UIActionPayload = A2uiClientAction;

export interface A2UIContext {
  surfaceId: string;
  onAction: (action: A2UIActionPayload) => void;
  processor: any;
  dataContextPath?: string;
  runtime: Required<A2UIRuntimeOptions>;
  disabled?: boolean;
}

export const A2UI_CONTEXT_KEY: InjectionKey<A2UIContext> =
  Symbol('A2UI_CONTEXT_KEY');

export function useA2UI() {
  const context = inject(A2UI_CONTEXT_KEY);

  if (!context) {
    throw new Error('useA2UI must be used within an A2UIProvider');
  }

  const surface = context.processor?.model?.getSurface(context.surfaceId);

  const dataContext = computed(() => {
    if (!surface?.dataModel || !surface?.catalog) return undefined;
    return new DataContext(surface, context.dataContextPath || '/');
  });

  const resolveValue = <V = unknown>(
    value: DynamicValue | undefined,
  ): V | undefined => {
    if (!dataContext.value || value === undefined) return value as V | undefined;
    return dataContext.value.resolveDynamicValue<V>(value);
  };

  const resolveActionContext = (ctx: any) => {
    if (!ctx || typeof ctx !== 'object') return ctx;
    const resolved: Record<string, any> = {};
    for (const key in ctx) {
      resolved[key] = resolveValue(ctx[key]);
    }
    return resolved;
  };

  const resolveDynamicChildren = (childrenProp: any) => {
    if (Array.isArray(childrenProp)) {
      return childrenProp.map((child) => {
        if (typeof child === 'string') return { id: child };
        if (child && typeof child === 'object' && child.id) return { id: child.id };
        return child;
      });
    }

    if (
      childrenProp &&
      typeof childrenProp === 'object' &&
      childrenProp.path &&
      childrenProp.componentId &&
      dataContext.value
    ) {
      const resolvedArray = resolveValue<any[]>({ path: childrenProp.path });
      if (Array.isArray(resolvedArray)) {
        const listContext = dataContext.value.nested(childrenProp.path);
        return resolvedArray.map((_, index) => ({
          id: childrenProp.componentId,
          path: listContext.nested(String(index)).path,
        }));
      }
    }

    return [];
  };

  const sendAction = (
    name: string,
    sourceComponentId: string,
    actionContext?: Record<string, any>,
  ) => {
    const resolvedContext = actionContext ? resolveActionContext(actionContext) : {};
    const actionPayload = { event: { name, context: resolvedContext } };

    if (surface && typeof surface.dispatchAction === 'function') {
      surface.dispatchAction(actionPayload, sourceComponentId);
    } else {
      context.onAction({
        name,
        sourceComponentId,
        surfaceId: context.surfaceId,
        timestamp: new Date().toISOString(),
        context: resolvedContext,
      });
    }
  };

  const dispatchNodeAction = (
    node: ComponentModel,
    extraContext?: Record<string, any>,
  ) => {
    const action = resolveValue<Action | undefined>(node.properties.action);
    if (!action) return;

    if ('event' in action) {
      const mergedContext = {
        ...(action.event.context || {}),
        ...(extraContext || {}),
      };
      sendAction(action.event.name, node.id, mergedContext);
      return;
    }

    if ('functionCall' in action) {
      dataContext.value?.resolveAction(action);
    }
  };

  const setData = (path: string, value: any) => {
    dataContext.value?.set(path, value);
  };

  return {
    surfaceId: context.surfaceId,
    dataContextPath: context.dataContextPath,
    runtime: context.runtime,
    dataContext,
    resolveValue,
    resolveDynamicChildren,
    sendAction,
    dispatchNodeAction,
    setData,
  };
}

import { DataContext, A2uiClientAction, ComponentModel, DynamicValue } from '@a2ui/web_core/v0_9';
import { InjectionKey } from 'vue';
export type A2UIActionPayload = A2uiClientAction;
export interface A2UIContext {
    surfaceId: string;
    onAction: (action: A2UIActionPayload) => void;
    processor: any;
    dataContextPath?: string;
}
export declare const A2UI_CONTEXT_KEY: InjectionKey<A2UIContext>;
export declare function useA2UI(): {
    surfaceId: string;
    dataContextPath: string | undefined;
    dataContext: import('vue').ComputedRef<DataContext | undefined>;
    resolveValue: <V = unknown>(value: DynamicValue | undefined) => V | undefined;
    resolveDynamicChildren: (childrenProp: any) => any[];
    sendAction: (name: string, sourceComponentId: string, actionContext?: Record<string, any>) => void;
    dispatchNodeAction: (node: ComponentModel, extraContext?: Record<string, any>) => void;
    setData: (path: string, value: any) => void;
};

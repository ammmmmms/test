import type { InjectionKey } from 'vue';

export type A2UIRuntimePlatform = 'pc' | 'app';

export interface A2UIRuntimeOptions {
  platform?: A2UIRuntimePlatform;
}

export const DEFAULT_A2UI_RUNTIME_OPTIONS: Required<A2UIRuntimeOptions> = {
  platform: 'pc',
};

export const A2UI_RUNTIME_OPTIONS_KEY: InjectionKey<A2UIRuntimeOptions> = Symbol(
  'A2UI_RUNTIME_OPTIONS_KEY',
);

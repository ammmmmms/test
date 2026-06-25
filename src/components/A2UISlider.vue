<script setup lang="ts">
  import { Slider as VanSlider } from 'vant';
  import type { ComponentModel } from '@a2ui/web_core/v0_9';
  import { computed, toRef } from 'vue';
  import { VantSliderApi } from '../catalog/vant-components';
  import { useBoundProps } from '../composables/useBoundProps';

  const props = defineProps<{ node: ComponentModel }>();
  const { boundProps, contextDisabled } = useBoundProps(toRef(props, 'node'), VantSliderApi);

  const effectiveDisabled = computed(() => {
    if (boundProps.value.neverDisabled) return false;
    return boundProps.value.disabled ?? contextDisabled.value;
  });
  const min = computed(() => boundProps.value.min ?? 0);
  const max = computed(() => boundProps.value.max ?? 100);
  const step = computed(() => boundProps.value.step ?? 1);

  const modelValue = computed({
    get: () => boundProps.value.value ?? 0,
    set: (value: number) => {
      boundProps.value.setValue?.(value);
    },
  });
</script>

<template>
  <VanSlider
    v-model="modelValue"
    :min="min"
    :max="max"
    :step="step"
    :disabled="effectiveDisabled"
    @change="boundProps.action?.()"
  />
</template>

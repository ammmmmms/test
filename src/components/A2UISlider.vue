<script setup lang="ts">
  import { Slider as VanSlider } from 'vant';
  import type { ComponentModel } from '@a2ui/web_core/v0_9';
  import { computed } from 'vue';
  import { useA2UI } from '../composables/useA2UI';

  const props = defineProps<{ node: ComponentModel }>();
  const { resolveValue, setData, dispatchNodeAction } = useA2UI();

  const valuePath = computed(() => props.node.properties.value?.path);
  const min = computed(() => resolveValue<number | undefined>(props.node.properties.min) ?? 0);
  const max = computed(() => resolveValue<number | undefined>(props.node.properties.max) ?? 100);
  const step = computed(() => resolveValue<number | undefined>(props.node.properties.step) ?? 1);

  const modelValue = computed({
    get: () => resolveValue<number>(props.node.properties.value) ?? 0,
    set: (value: number) => {
      if (valuePath.value) setData(valuePath.value, value);
    },
  });
</script>

<template>
  <VanSlider
    v-model="modelValue"
    :min="min"
    :max="max"
    :step="step"
    @change="dispatchNodeAction(node, { value: modelValue })"
  />
</template>

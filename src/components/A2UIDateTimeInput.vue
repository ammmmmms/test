<script setup lang="ts">
  import { Field as VanField } from 'vant';
  import type { ComponentModel } from '@a2ui/web_core/v0_9';
  import { computed, toRef } from 'vue';
  import { VantDateTimeInputApi } from '../catalog/vant-components';
  import { useBoundProps } from '../composables/useBoundProps';

  const props = defineProps<{ node: ComponentModel }>();
  const { boundProps, contextDisabled } = useBoundProps(toRef(props, 'node'), VantDateTimeInputApi);

  const effectiveDisabled = computed(() => {
    if (boundProps.value.neverDisabled) return false;
    return boundProps.value.disabled ?? contextDisabled.value;
  });
  const label = computed(() => boundProps.value.label ?? '');
  const min = computed(() => boundProps.value.min);
  const max = computed(() => boundProps.value.max);
  const enableTime = computed(() => !!boundProps.value.enableTime);
  const inputType = computed(() => (enableTime.value ? 'datetime-local' : 'date'));

  const modelValue = computed({
    get: () => boundProps.value.value ?? '',
    set: (value: string) => {
      boundProps.value.setValue?.(value);
    },
  });
</script>

<template>
  <VanField
    v-model="modelValue"
    :label="label"
    :type="inputType"
    :data-min="min"
    :data-max="max"
    :disabled="effectiveDisabled"
    @blur="boundProps.action?.()"
  />
</template>

<script setup lang="ts">
  import { Field as VanField } from 'vant';
  import type { ComponentModel } from '@a2ui/web_core/v0_9';
  import { computed, toRef } from 'vue';
  import { useBoundProps } from '../composables/useBoundProps';
  import { VantTextFieldApi } from '../catalog/vant-components';
  import { getValidationMessage } from '../utils/validation';

  const props = defineProps<{ node: ComponentModel }>();
  const { boundProps, contextDisabled } = useBoundProps(toRef(props, 'node'), VantTextFieldApi);

  const effectiveDisabled = computed(() => {
    if (boundProps.value.neverDisabled) return false;
    return boundProps.value.disabled ?? contextDisabled.value;
  });
  const label = computed(() => boundProps.value.label ?? '');
  const placeholder = computed(() => boundProps.value.placeholder ?? '');
  const checks = computed(() => boundProps.value.checks ?? []);
  const variant = computed(() => boundProps.value.variant ?? 'shortText');
  const errorMessage = computed(() => getValidationMessage(checks.value, modelValue.value));
  const inputType = computed(() => {
    switch (variant.value) {
      case 'number':
        return 'number';
      case 'obscured':
        return 'password';
      default:
        return 'text';
    }
  });

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
    :placeholder="placeholder"
    :type="inputType"
    :rows="variant === 'longText' ? 3 : undefined"
    :autosize="variant === 'longText'"
    :error="!!errorMessage"
    :error-message="errorMessage"
    :disabled="effectiveDisabled"
    @blur="boundProps.action?.()"
  />
</template>

<script setup lang="ts">
  import { Field as VanField } from 'vant';
  import type { ComponentModel } from '@a2ui/web_core/v0_9';
  import { computed } from 'vue';
  import { useA2UI } from '../composables/useA2UI';
  import { getValidationMessage } from '../utils/validation';

  const props = defineProps<{ node: ComponentModel }>();
  const { resolveValue, setData, dispatchNodeAction } = useA2UI();

  const label = computed(() => resolveValue<string | undefined>(props.node.properties.label) ?? '');
  const placeholder = computed(() => resolveValue<string | undefined>(props.node.properties.placeholder) ?? '');
  const checks = computed(() => resolveValue<any[]>(props.node.properties.checks) ?? []);
  const valuePath = computed(() => props.node.properties.value?.path);
  const variant = computed(() => resolveValue<string | undefined>(props.node.properties.variant) ?? 'shortText');
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
    get: () => resolveValue<string | undefined>(props.node.properties.value) ?? '',
    set: (value: string) => {
      if (valuePath.value) setData(valuePath.value, value);
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
    @blur="dispatchNodeAction(node, { value: modelValue })"
  />
</template>

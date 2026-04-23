<script setup lang="ts">
  import { Field as VanField } from 'vant';
  import type { ComponentModel } from '@a2ui/web_core/v0_9';
  import { computed } from 'vue';
  import { useA2UI } from '../composables/useA2UI';

  const props = defineProps<{ node: ComponentModel }>();
  const { resolveValue, setData, dispatchNodeAction } = useA2UI();

  const label = computed(() => resolveValue<string | undefined>(props.node.properties.label) ?? '');
  const valuePath = computed(() => props.node.properties.value?.path);
  const enableTime = computed(() => !!resolveValue<boolean | undefined>(props.node.properties.enableTime));
  const inputType = computed(() => (enableTime.value ? 'datetime-local' : 'date'));

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
    :type="inputType"
    :data-min="resolveValue<string | undefined>(node.properties.min)"
    :data-max="resolveValue<string | undefined>(node.properties.max)"
    @blur="dispatchNodeAction(node, { value: modelValue })"
  />
</template>

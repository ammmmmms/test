<script setup lang="ts">
  import { Checkbox as VanCheckbox } from 'vant';
  import type { ComponentModel } from '@a2ui/web_core/v0_9';
  import { computed } from 'vue';
  import { useA2UI } from '../composables/useA2UI';

  const props = defineProps<{ node: ComponentModel }>();
  const { resolveValue, setData, dispatchNodeAction } = useA2UI();

  const label = computed(() => resolveValue<string | undefined>(props.node.properties.label) ?? '');
  const valuePath = computed(() => props.node.properties.value?.path);

  const modelValue = computed({
    get: () => resolveValue<boolean>(props.node.properties.value) ?? false,
    set: (value: boolean) => {
      if (valuePath.value) setData(valuePath.value, value);
      dispatchNodeAction(props.node, { value });
    },
  });
</script>

<template>
  <VanCheckbox v-model="modelValue">{{ label }}</VanCheckbox>
</template>

<script setup lang="ts">
  import { Checkbox as VanCheckbox } from 'vant';
  import type { ComponentModel } from '@a2ui/web_core/v0_9';
  import { computed, toRef } from 'vue';
  import { VantCheckBoxApi } from '../catalog/vant-components';
  import { useBoundProps } from '../composables/useBoundProps';

  const props = defineProps<{ node: ComponentModel }>();
  const { boundProps, contextDisabled } = useBoundProps(toRef(props, 'node'), VantCheckBoxApi);

  const effectiveDisabled = computed(() => {
    if (boundProps.value.neverDisabled) return false;
    return boundProps.value.disabled ?? contextDisabled.value;
  });
  const label = computed(() => boundProps.value.label ?? '');

  const modelValue = computed({
    get: () => boundProps.value.value ?? false,
    set: (value: boolean) => {
      boundProps.value.setValue?.(value);
      boundProps.value.action?.();
    },
  });
</script>

<template>
  <VanCheckbox
    v-model="modelValue"
    :disabled="effectiveDisabled"
  >{{ label }}</VanCheckbox>
</template>

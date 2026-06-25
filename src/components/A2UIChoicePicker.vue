<script setup lang="ts">
  import {
    Cell as VanCell,
    Checkbox as VanCheckbox,
    CheckboxGroup as VanCheckboxGroup,
    Radio as VanRadio,
    RadioGroup as VanRadioGroup,
  } from 'vant';
  import type { ComponentModel } from '@a2ui/web_core/v0_9';
  import { computed, toRef } from 'vue';
  import { VantChoicePickerApi } from '../catalog/vant-components';
  import { useBoundProps } from '../composables/useBoundProps';

  const props = defineProps<{ node: ComponentModel }>();
  const { boundProps, contextDisabled } = useBoundProps(toRef(props, 'node'), VantChoicePickerApi);

  const effectiveDisabled = computed(() => {
    if (boundProps.value.neverDisabled) return false;
    return boundProps.value.disabled ?? contextDisabled.value;
  });
  const options = computed<(string | number)[]>(() => boundProps.value.options ?? []);
  const label = computed(() => boundProps.value.label ?? '');
  const multiple = computed(() => boundProps.value.variant === 'multipleSelection');

  const modelValue = computed<any>({
    get: () =>
      boundProps.value.value ??
      (multiple.value ? [] : ''),
    set: (value) => {
      boundProps.value.setValue?.(value);
      boundProps.value.action?.();
    },
  });
</script>

<template>
  <VanCell class="a2ui-choice-picker-cell">
    <template #title>
      <div class="a2ui-choice-picker">
        <div
          v-if="label"
          class="a2ui-field-label"
        >
          {{ label }}
        </div>

        <VanCheckboxGroup
          v-if="multiple"
          v-model="modelValue"
          :disabled="effectiveDisabled"
        >
          <VanCheckbox
            v-for="option in options"
            :key="String(option)"
            :name="option"
          >
            {{ option }}
          </VanCheckbox>
        </VanCheckboxGroup>

        <VanRadioGroup
          v-else
          v-model="modelValue"
          :disabled="effectiveDisabled"
        >
          <VanRadio
            v-for="option in options"
            :key="String(option)"
            :name="option"
          >
            {{ option }}
          </VanRadio>
        </VanRadioGroup>
      </div>
    </template>
  </VanCell>
</template>

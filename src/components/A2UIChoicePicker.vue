<script setup lang="ts">
  import {
    Checkbox as VanCheckbox,
    CheckboxGroup as VanCheckboxGroup,
    Radio as VanRadio,
    RadioGroup as VanRadioGroup,
  } from 'vant';
  import type { ComponentModel } from '@a2ui/web_core/v0_9';
  import { computed } from 'vue';
  import { useA2UI } from '../composables/useA2UI';

  const props = defineProps<{ node: ComponentModel }>();
  const { resolveValue, setData, dispatchNodeAction } = useA2UI();

  const options = computed<(string | number)[]>(() => resolveValue<any[]>(props.node.properties.options) ?? []);
  const label = computed(() => resolveValue<string | undefined>(props.node.properties.label) ?? '');
  const valuePath = computed(() => props.node.properties.value?.path);
  const multiple = computed(() => resolveValue<string | undefined>(props.node.properties.variant) === 'multipleSelection');

  const modelValue = computed<any>({
    get: () =>
      resolveValue<any>(props.node.properties.value) ??
      (multiple.value ? [] : ''),
    set: (value) => {
      if (valuePath.value) setData(valuePath.value, value);
      dispatchNodeAction(props.node, { value });
    },
  });
</script>

<template>
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

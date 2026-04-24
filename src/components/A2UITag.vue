<script setup lang="ts">
  import { Tag as VanTag } from 'vant';
  import type { TagType } from 'vant';
  import type { ComponentModel } from '@a2ui/web_core/v0_9';
  import { computed, toRef } from 'vue';
  import { TagApi } from '../catalog/vant-components';
  import { useBoundProps } from '../composables/useBoundProps';

  const props = defineProps<{ node: ComponentModel }>();
  const { boundProps } = useBoundProps(toRef(props, 'node'), TagApi);

  const text = computed(() => boundProps.value.text ?? '');
  const type = computed<TagType>(() => {
    const value = boundProps.value.type;
    switch (value) {
      case 'primary':
      case 'success':
      case 'warning':
      case 'danger':
        return value;
      default:
        return 'default';
    }
  });
  const plain = computed(() => !!boundProps.value.plain);
</script>

<template>
  <VanTag :type="type" :plain="plain">{{ text }}</VanTag>
</template>

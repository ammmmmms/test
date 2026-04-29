<script setup lang="ts">
import { Icon as VanIcon } from 'vant';
import type { ComponentModel } from '@a2ui/web_core/v0_9';
import { computed, toRef } from 'vue';
import {
  VantIconApi,
} from '../catalog/vant-components';
import type { VantIconType } from '../catalog/vant-icon';
import { useBoundProps } from '../composables/useBoundProps';

const props = defineProps<{ node: ComponentModel }>();
  const { boundProps } = useBoundProps(toRef(props, 'node'), VantIconApi);
  const name = computed(() => {
    const raw = boundProps.value.name;
    return typeof raw === 'string' ? raw : '';
  });
  const size = computed(() => {
    const raw = boundProps.value.size;
    return typeof raw === 'number' ? raw : undefined;
  });
  const color = computed(() => {
    const type = boundProps.value.type as VantIconType | undefined;
    switch (type) {
      case 'primary':
        return 'var(--van-primary-color)';
      case 'success':
        return 'var(--van-success-color)';
      case 'warning':
        return 'var(--van-warning-color)';
      case 'danger':
        return 'var(--van-danger-color)';
      default:
        return 'var(--van-text-color)';
    }
  });
</script>

<template>
  <VanIcon
    v-if="name"
    :name="name"
    :size="size"
    :color="color"
  />
</template>

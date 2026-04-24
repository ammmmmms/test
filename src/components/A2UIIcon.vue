<script setup lang="ts">
  import { Icon as VanIcon } from 'vant';
  import type { ComponentModel } from '@a2ui/web_core/v0_9';
  import { IconApi } from '@a2ui/web_core/v0_9/basic_catalog';
  import { computed, toRef } from 'vue';
  import { useBoundProps } from '../composables/useBoundProps';

  const props = defineProps<{ node: ComponentModel }>();
  const { boundProps } = useBoundProps(toRef(props, 'node'), IconApi);
  const name = computed(() => {
    const raw = boundProps.value.name;
    return typeof raw === 'string' ? raw : '';
  });
</script>

<template>
  <VanIcon
    v-if="name"
    :name="name"
  />
</template>

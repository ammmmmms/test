<script setup lang="ts">
  import { Icon as VanIcon } from 'vant';
  import type { ComponentModel } from '@a2ui/web_core/v0_9';
  import { computed } from 'vue';
  import { useA2UI } from '../composables/useA2UI';

  const props = defineProps<{ node: ComponentModel }>();
  const { resolveValue } = useA2UI();
  const name = computed(() => {
    const raw = resolveValue<any>(props.node.properties.name);
    return typeof raw === 'string' ? raw : '';
  });
</script>

<template>
  <VanIcon
    v-if="name"
    :name="name"
  />
</template>

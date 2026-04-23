<script setup lang="ts">
  import type { ComponentModel } from '@a2ui/web_core/v0_9';
  import { computed } from 'vue';
  import { useA2UI } from '../composables/useA2UI';

  const props = defineProps<{ node: ComponentModel }>();
  const { resolveValue } = useA2UI();
  const src = computed(() => resolveValue<string | undefined>(props.node.properties.url) ?? '');
</script>

<template>
  <video
    v-if="src"
    class="a2ui-media"
    controls
    :src="src"
  />
</template>

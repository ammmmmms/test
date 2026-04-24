<script setup lang="ts">
  import type { ComponentModel } from '@a2ui/web_core/v0_9';
  import { VideoApi } from '@a2ui/web_core/v0_9/basic_catalog';
  import { computed, toRef } from 'vue';
  import { useBoundProps } from '../composables/useBoundProps';

  const props = defineProps<{ node: ComponentModel }>();
  const { boundProps } = useBoundProps(toRef(props, 'node'), VideoApi);
  const src = computed(() => boundProps.value.url ?? '');
</script>

<template>
  <video
    v-if="src"
    class="a2ui-media"
    controls
    :src="src"
  />
</template>

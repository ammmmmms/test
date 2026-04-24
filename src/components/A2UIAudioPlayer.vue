<script setup lang="ts">
  import type { ComponentModel } from '@a2ui/web_core/v0_9';
  import { AudioPlayerApi } from '@a2ui/web_core/v0_9/basic_catalog';
  import { computed, toRef } from 'vue';
  import { useBoundProps } from '../composables/useBoundProps';

  const props = defineProps<{ node: ComponentModel }>();
  const { boundProps } = useBoundProps(toRef(props, 'node'), AudioPlayerApi);
  const src = computed(() => boundProps.value.url ?? '');
  const description = computed(() => boundProps.value.description ?? '');
</script>

<template>
  <div
    v-if="src"
    class="a2ui-audio"
  >
    <div
      v-if="description"
      class="a2ui-audio-description"
    >
      {{ description }}
    </div>
    <audio
      class="a2ui-media"
      controls
      :src="src"
    />
  </div>
</template>

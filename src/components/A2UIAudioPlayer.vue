<script setup lang="ts">
  import type { ComponentModel } from '@a2ui/web_core/v0_9';
  import { computed } from 'vue';
  import { useA2UI } from '../composables/useA2UI';

  const props = defineProps<{ node: ComponentModel }>();
  const { resolveValue } = useA2UI();
  const src = computed(() => resolveValue<string | undefined>(props.node.properties.url) ?? '');
  const description = computed(() => resolveValue<string | undefined>(props.node.properties.description) ?? '');
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

<script setup lang="ts">
  import { Image as VanImage } from 'vant';
  import type { ComponentModel } from '@a2ui/web_core/v0_9';
  import { ImageApi } from '@a2ui/web_core/v0_9/basic_catalog';
  import { computed, toRef } from 'vue';
  import { useBoundProps } from '../composables/useBoundProps';

  const props = defineProps<{ node: ComponentModel }>();
  const { boundProps } = useBoundProps(toRef(props, 'node'), ImageApi);
  const src = computed(() => boundProps.value.url ?? '');
</script>

<template>
  <VanImage
    v-if="src"
    class="a2ui-image"
    width="100%"
    fit="cover"
    :src="src"
  />
</template>

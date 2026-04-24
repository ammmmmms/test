<script setup lang="ts">
  import { Tab as VanTab, Tabs as VanTabs } from 'vant';
  import type { ComponentModel } from '@a2ui/web_core/v0_9';
  import { computed, ref, toRef } from 'vue';
  import ComponentNode from '../core/ComponentNode.vue';
  import { VantTabsApi } from '../catalog/vant-components';
  import { useBoundProps } from '../composables/useBoundProps';

  const props = defineProps<{ node: ComponentModel }>();
  const active = ref(0);
  const { boundProps } = useBoundProps(toRef(props, 'node'), VantTabsApi);
  const tabs = computed(() => boundProps.value.tabs ?? []);

  const handleChange = (index: number) => {
    active.value = index;
    boundProps.value.action?.();
  };
</script>

<template>
  <VanTabs
    :active="active"
    @change="handleChange"
  >
    <VanTab
      v-for="(tab, index) in tabs"
      :key="index"
      :title="tab.title"
    >
      <ComponentNode
        v-if="tab.child"
        :id="tab.child"
      />
    </VanTab>
  </VanTabs>
</template>

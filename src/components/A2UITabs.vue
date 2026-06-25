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

  const effectiveDisabled = computed(() => {
    if (boundProps.value.neverDisabled) return false;
    return boundProps.value.disabled ?? false;
  });

  const handleChange = (index: number) => {
    if (effectiveDisabled.value) return;
    active.value = index;
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
      :disabled="effectiveDisabled"
    >
      <ComponentNode
        v-if="tab.child"
        :id="tab.child"
      />
    </VanTab>
  </VanTabs>
</template>

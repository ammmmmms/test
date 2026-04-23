<script setup lang="ts">
  import { Tab as VanTab, Tabs as VanTabs } from 'vant';
  import type { ComponentModel } from '@a2ui/web_core/v0_9';
  import { ref } from 'vue';
  import ComponentNode from '../core/ComponentNode.vue';
  import { useDynamicProps } from '../composables/useDynamicProps';
  import { useA2UI } from '../composables/useA2UI';

  const props = defineProps<{ node: ComponentModel }>();
  const active = ref(0);
  const dynamicProps = useDynamicProps(() => props.node.properties);
  const { dispatchNodeAction } = useA2UI();

  const handleChange = (index: number) => {
    active.value = index;
    const tab = (dynamicProps.value.tabs ?? [])[index];
    dispatchNodeAction(props.node, { tabIndex: index, tabTitle: tab?.title });
  };
</script>

<template>
  <VanTabs
    :active="active"
    @change="handleChange"
  >
    <VanTab
      v-for="(tab, index) in dynamicProps.tabs ?? []"
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

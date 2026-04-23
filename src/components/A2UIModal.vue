<script setup lang="ts">
  import { Popup as VanPopup } from 'vant';
  import { ref } from 'vue';
  import type { ComponentModel } from '@a2ui/web_core/v0_9';
  import ComponentNode from '../core/ComponentNode.vue';
  import { useDynamicProps } from '../composables/useDynamicProps';
  import { useA2UI } from '../composables/useA2UI';

  const props = defineProps<{ node: ComponentModel }>();
  const dynamicProps = useDynamicProps(() => props.node.properties);
  const { dispatchNodeAction } = useA2UI();
  const open = ref(false);

  const show = () => {
    open.value = true;
    dispatchNodeAction(props.node, { open: true });
  };

  const hide = () => {
    open.value = false;
    dispatchNodeAction(props.node, { open: false });
  };
</script>

<template>
  <div class="a2ui-modal">
    <div
      v-if="dynamicProps.trigger"
      class="a2ui-modal-trigger"
      @click="show"
    >
      <ComponentNode :id="dynamicProps.trigger" />
    </div>
    <VanPopup
      v-model:show="open"
      round
      position="bottom"
      @close="hide"
    >
      <div class="a2ui-modal-content">
        <ComponentNode
          v-if="dynamicProps.content"
          :id="dynamicProps.content"
        />
      </div>
    </VanPopup>
  </div>
</template>

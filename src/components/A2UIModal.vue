<script setup lang="ts">
  import { Popup as VanPopup } from 'vant';
  import { ref } from 'vue';
  import type { ComponentModel } from '@a2ui/web_core/v0_9';
  import ComponentNode from '../core/ComponentNode.vue';
  import { toRef } from 'vue';
  import { VantModalApi } from '../catalog/vant-components';
  import { useBoundProps } from '../composables/useBoundProps';

  const props = defineProps<{ node: ComponentModel }>();
  const { boundProps } = useBoundProps(toRef(props, 'node'), VantModalApi);
  const open = ref(false);

  const show = () => {
    open.value = true;
    boundProps.value.action?.();
  };

  const hide = () => {
    open.value = false;
    boundProps.value.action?.();
  };
</script>

<template>
  <div class="a2ui-modal">
    <div
      v-if="boundProps.trigger"
      class="a2ui-modal-trigger"
      @click="show"
    >
      <ComponentNode :id="boundProps.trigger" />
    </div>
    <VanPopup
      v-model:show="open"
      round
      position="bottom"
      @close="hide"
    >
      <div class="a2ui-modal-content">
        <ComponentNode
          v-if="boundProps.content"
          :id="boundProps.content"
        />
      </div>
    </VanPopup>
  </div>
</template>

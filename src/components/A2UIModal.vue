<script setup lang="ts">
  import { Popup as VanPopup } from 'vant';
  import { ref } from 'vue';
  import type { ComponentModel } from '@a2ui/web_core/v0_9';
  import ComponentNode from '../core/ComponentNode.vue';
  import { toRef, computed } from 'vue';
  import { VantModalApi } from '../catalog/vant-components';
  import { useBoundProps } from '../composables/useBoundProps';

  const props = defineProps<{ node: ComponentModel }>();
  const { boundProps } = useBoundProps(toRef(props, 'node'), VantModalApi);
  const open = ref(false);

  const effectiveDisabled = computed(() => {
    if (boundProps.value.neverDisabled) return false;
    return boundProps.value.disabled ?? false;
  });

  const show = (event?: MouseEvent) => {
    if (effectiveDisabled.value) return;
    event?.stopPropagation();
    open.value = true;
  };

  const hide = (event?: MouseEvent) => {
    event?.stopPropagation();
    open.value = false;
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

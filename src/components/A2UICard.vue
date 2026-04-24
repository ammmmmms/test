<script setup lang="ts">
  import { CellGroup as VanCellGroup } from 'vant';
  import type { ComponentModel } from '@a2ui/web_core/v0_9';
  import { CardApi } from '@a2ui/web_core/v0_9/basic_catalog';
  import { computed, toRef } from 'vue';
  import ComponentNode from '../core/ComponentNode.vue';
  import { useBoundProps } from '../composables/useBoundProps';

  const props = defineProps<{ node: ComponentModel }>();
  const { boundProps } = useBoundProps(toRef(props, 'node'), CardApi);
  const childId = computed(() => boundProps.value.child);
</script>

<template>
  <VanCellGroup inset>
    <div class="a2ui-card">
      <ComponentNode
        v-if="childId"
        :id="childId"
      />
    </div>
  </VanCellGroup>
</template>

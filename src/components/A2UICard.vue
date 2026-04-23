<script setup lang="ts">
  import { CellGroup as VanCellGroup } from 'vant';
  import type { ComponentModel } from '@a2ui/web_core/v0_9';
  import { computed } from 'vue';
  import ComponentNode from '../core/ComponentNode.vue';
  import { useA2UI } from '../composables/useA2UI';

  const props = defineProps<{ node: ComponentModel }>();
  const { resolveValue } = useA2UI();
  const childId = computed(() => resolveValue<string | undefined>(props.node.properties.child));
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

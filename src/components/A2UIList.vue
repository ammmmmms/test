<script setup lang="ts">
  import type { ComponentModel } from '@a2ui/web_core/v0_9';
  import { computed } from 'vue';
  import ComponentNode from '../core/ComponentNode.vue';
  import { useA2UI } from '../composables/useA2UI';

  const props = defineProps<{ node: ComponentModel }>();
  const { resolveDynamicChildren } = useA2UI();
  const children = computed(() => resolveDynamicChildren(props.node.properties.children));
</script>

<template>
  <div class="a2ui-list">
    <ComponentNode
      v-for="(child, index) in children"
      :key="`${child.id}-${index}`"
      :id="child.id"
      :path="child.path"
    />
  </div>
</template>

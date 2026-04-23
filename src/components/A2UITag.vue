<script setup lang="ts">
  import { Tag as VanTag } from 'vant';
  import type { TagType } from 'vant';
  import type { ComponentModel } from '@a2ui/web_core/v0_9';
  import { computed } from 'vue';
  import { useA2UI } from '../composables/useA2UI';

  const props = defineProps<{ node: ComponentModel }>();
  const { resolveValue } = useA2UI();

  const text = computed(() => resolveValue<string | undefined>(props.node.properties.text) ?? '');
  const type = computed<TagType>(() => {
    const value = resolveValue<string | undefined>(props.node.properties.type);
    switch (value) {
      case 'primary':
      case 'success':
      case 'warning':
      case 'danger':
        return value;
      default:
        return 'default';
    }
  });
  const plain = computed(() => !!resolveValue<boolean | undefined>(props.node.properties.plain));
</script>

<template>
  <VanTag :type="type" :plain="plain">{{ text }}</VanTag>
</template>

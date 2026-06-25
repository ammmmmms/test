<script setup lang="ts">
  import type { ComponentModel } from '@a2ui/web_core/v0_9';
  import type { CSSProperties } from 'vue';
  import { computed, toRef } from 'vue';
  import { VantRowApi } from '../catalog/vant-components';
  import ComponentNode from '../core/ComponentNode.vue';
  import { useA2UI } from '../composables/useA2UI';
  import { useBoundProps } from '../composables/useBoundProps';
  import { normalizeChildren } from '../composables/normalizeChildren';

  const props = defineProps<{ node: ComponentModel }>();
  const { boundProps, contextDisabled } = useBoundProps(toRef(props, 'node'), VantRowApi);
  const { dispatchNodeAction } = useA2UI();

  const effectiveDisabled = computed(() => {
    if (boundProps.value.neverDisabled) return false;
    return boundProps.value.disabled ?? contextDisabled.value;
  });
  const children = computed(() => normalizeChildren(boundProps.value.children));
  const justify = computed(() => boundProps.value.justify ?? 'start');
  const align = computed(() => boundProps.value.align ?? 'stretch');
  const clickable = computed(() => !!boundProps.value.action && !effectiveDisabled.value);
  const rowStyle = computed<CSSProperties>(() => {
    const gap = Number(boundProps.value.gap);
    const style = { ...(boundProps.value.style ?? {}) } as CSSProperties;

    if (Number.isFinite(gap) && gap >= 0) {
      style.gap = `${gap}px`;
    }

    return style;
  });

  const onClick = (event: MouseEvent) => {
    if (!clickable.value) return;
    event.stopPropagation();
    dispatchNodeAction(props.node);
  };
</script>

<template>
  <div
    class="a2ui-row"
    :data-justify="justify"
    :data-align="align"
    :class="{ 'a2ui-row--clickable': clickable }"
    :style="rowStyle"
    @click="onClick"
  >
    <ComponentNode
      v-for="(child, index) in children"
      :key="`${child.id}-${index}`"
      :id="child.id"
      :path="child.basePath"
    />
  </div>
</template>

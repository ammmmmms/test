<script setup lang="ts">
  import { Icon as VanIcon, Popup as VanPopup } from 'vant';
  import type { ComponentModel } from '@a2ui/web_core/v0_9';
  import type { CSSProperties } from 'vue';
  import { computed, ref, toRef } from 'vue';
  import { VantListApi } from '../catalog/vant-components';
  import ComponentNode from '../core/ComponentNode.vue';
  import { useA2UI } from '../composables/useA2UI';
  import { useBoundProps } from '../composables/useBoundProps';
  import { normalizeChildren } from '../composables/normalizeChildren';

  const props = defineProps<{ node: ComponentModel }>();
  const { boundProps } = useBoundProps(toRef(props, 'node'), VantListApi);
  const { runtime } = useA2UI();
  const expanded = ref(false);
  const popupVisible = ref(false);

  const children = computed(() => normalizeChildren(boundProps.value.children));
  const direction = computed(() => boundProps.value.direction ?? 'vertical');
  const align = computed(() => boundProps.value.align ?? 'stretch');
  const collapseLimit = computed(() => {
    const limit = Number(boundProps.value.collapse?.limit);
    return Number.isFinite(limit) && limit >= 0 ? Math.floor(limit) : undefined;
  });
  const isCollapsible = computed(() => {
    return (
      collapseLimit.value !== undefined &&
      children.value.length > collapseLimit.value
    );
  });
  const visibleChildren = computed(() => {
    if (!isCollapsible.value || expanded.value) {
      return children.value;
    }

    return children.value.slice(0, collapseLimit.value);
  });
  const toggleText = computed(() => {
    if (runtime.platform === 'app') {
      return boundProps.value.collapse?.expandText ?? '展开全部';
    }

    if (expanded.value) {
      return boundProps.value.collapse?.collapseText ?? '收起';
    }

    return boundProps.value.collapse?.expandText ?? '展开全部';
  });
  const toggleIcon = computed(() => {
    return runtime.platform === 'pc' && expanded.value ? 'arrow-up' : 'arrow-down';
  });
  const listStyle = computed<CSSProperties>(() => {
    const gap = Number(boundProps.value.gap);
    const style = { ...(boundProps.value.style ?? {}) } as CSSProperties;

    if (Number.isFinite(gap) && gap >= 0) {
      style.gap = `${gap}px`;
    }

    return style;
  });
  const collapseStyle = computed<CSSProperties>(() => {
    return { ...(boundProps.value.collapse?.style ?? {}) } as CSSProperties;
  });
  const popupTitle = computed(() => {
    return boundProps.value.collapse?.popupTitle ?? '';
  });

  const onToggle = (event: MouseEvent) => {
    event.stopPropagation();

    if (runtime.platform === 'app') {
      popupVisible.value = true;
      return;
    }

    expanded.value = !expanded.value;
  };
</script>

<template>
  <div class="a2ui-list-wrapper">
    <div
      class="a2ui-list"
      :data-direction="direction"
      :data-align="align"
      :style="listStyle"
    >
      <ComponentNode
        v-for="(child, index) in visibleChildren"
        :key="`${child.id}-${index}`"
        :id="child.id"
        :path="child.basePath"
      />
    </div>

    <button
      v-if="isCollapsible"
      class="a2ui-list-collapse-toggle"
      type="button"
      :style="collapseStyle"
      @click="onToggle"
    >
      <span>{{ toggleText }}</span>
      <VanIcon :name="toggleIcon" />
    </button>

    <VanPopup
      v-if="isCollapsible && runtime.platform === 'app'"
      v-model:show="popupVisible"
      position="bottom"
      round
      teleport="body"
      class="a2ui-list-popup"
    >
      <div
        v-if="popupTitle"
        class="a2ui-list-popup-title"
      >
        {{ popupTitle }}
      </div>
      <div
        class="a2ui-list a2ui-list--popup"
        :data-direction="direction"
        :data-align="align"
        :style="listStyle"
      >
        <ComponentNode
          v-for="(child, index) in children"
          :key="`${child.id}-${index}`"
          :id="child.id"
          :path="child.basePath"
        />
      </div>
    </VanPopup>
  </div>
</template>

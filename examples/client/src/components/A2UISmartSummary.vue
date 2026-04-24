<script setup lang="ts">
  import { Button as VanButton, Cell as VanCell, CellGroup as VanCellGroup } from 'vant';
  import type { ComponentModel } from '@a2ui/web_core/v0_9';
  import { computed } from 'vue';
  import { useA2UI } from '@demo-renderer';

  const props = defineProps<{ node: ComponentModel }>();
  const { resolveValue, setData, dispatchNodeAction } = useA2UI();

  const title = computed(() => resolveValue<string | undefined>(props.node.properties.title) ?? 'Smart Summary');
  const ctaText = computed(() => resolveValue<string | undefined>(props.node.properties.ctaText) ?? 'Sync Summary');
  const persistTo = computed(() => {
    const raw = props.node.properties.persistTo;
    return typeof raw === 'string' ? raw : undefined;
  });
  const rawPaths = computed<string[]>(() => {
    const value = props.node.properties.paths;
    return Array.isArray(value) ? value.filter((item): item is string => typeof item === 'string') : [];
  });
  const rawLabels = computed<string[]>(() => {
    const value = props.node.properties.labels;
    return Array.isArray(value) ? value.filter((item): item is string => typeof item === 'string') : [];
  });

  const entries = computed(() => {
    return rawPaths.value.map((path, index) => {
      const value = resolveValue<unknown>({ path });
      return {
        path,
        label: rawLabels.value[index] ?? path,
        value: value == null || value === '' ? '未设置' : String(value),
      };
    });
  });

  const summary = computed(() => {
    return entries.value.map((entry) => `${entry.label}: ${entry.value}`).join(' | ');
  });

  const syncSummary = () => {
    if (persistTo.value) {
      setData(persistTo.value, summary.value);
    }
    dispatchNodeAction(props.node, {
      summary: summary.value,
      trackedPaths: rawPaths.value,
    });
  };
</script>

<template>
  <div class="smart-summary">
    <VanCellGroup :title="title" inset>
      <VanCell
        v-for="entry in entries"
        :key="entry.path"
        :title="entry.label"
        :value="entry.value"
      />
      <VanCell
        title="Summary"
        :label="summary"
      />
    </VanCellGroup>

    <VanButton
      class="smart-summary__cta"
      type="primary"
      block
      @click="syncSummary"
    >
      {{ ctaText }}
    </VanButton>
  </div>
</template>

<style scoped>
  .smart-summary {
    display: flex;
    flex-direction: column;
    gap: 12px;
  }

  .smart-summary__cta {
    margin-top: 4px;
  }
</style>

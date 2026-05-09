<script setup lang="ts">
  import { ref } from 'vue';
  import { Button as VanButton } from 'vant';
  import DemoGalleryPage from './pages/DemoGalleryPage.vue';
  import JsonPlaygroundPage from './pages/JsonPlaygroundPage.vue';

  type PageMode = 'demo' | 'playground';

  const pageMode = ref<PageMode>('demo');
</script>

<template>
  <div class="app-shell">
    <header class="app-header">
      <div>
        <h1>A2UI Vue + Vant Showcase</h1>
        <p>Use the demo gallery for built-in examples, or open the playground to paste and preview raw A2UI JSON.</p>
      </div>
      <div class="app-actions">
        <VanButton
          :type="pageMode === 'demo' ? 'primary' : 'default'"
          @click="pageMode = 'demo'"
        >
          Demo Gallery
        </VanButton>
        <VanButton
          :type="pageMode === 'playground' ? 'primary' : 'default'"
          @click="pageMode = 'playground'"
        >
          JSON Playground
        </VanButton>
      </div>
    </header>

    <DemoGalleryPage v-if="pageMode === 'demo'" />
    <JsonPlaygroundPage v-else />
  </div>
</template>

<style scoped>
  .app-shell {
    min-height: 100vh;
    background:
      radial-gradient(circle at top left, rgba(20, 184, 166, 0.12), transparent 32%),
      linear-gradient(180deg, #f8fffe 0%, #eef6ff 100%);
    padding: 20px;
    box-sizing: border-box;
  }

  .app-header {
    display: flex;
    justify-content: space-between;
    align-items: flex-start;
    gap: 16px;
    margin-bottom: 20px;
  }

  .app-header h1 {
    margin: 0 0 8px;
    font-size: 28px;
    line-height: 1.1;
  }

  .app-header p {
    margin: 0;
    max-width: 680px;
    color: #4b5563;
  }

  .app-actions {
    display: flex;
    gap: 8px;
    flex-wrap: wrap;
  }

  @media (max-width: 900px) {
    .app-header {
      flex-direction: column;
    }
  }
</style>

import { createApp } from 'vue';
import App from './App.vue';
import 'vant/lib/index.css';
import '@demo-renderer/style.css';
import { A2UiVueRenderer } from '@demo-renderer';

createApp(App)
  .use(A2UiVueRenderer, {
    registerBasicCatalog: true,
    registerVantCatalog: true,
  })
  .mount('#app');

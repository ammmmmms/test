import { createApp } from 'vue';
import App from './App.vue';
import 'vant/lib/index.css';
import '@demo-renderer/style.css';
import { A2UiVueRenderer, VANT_CATALOG_ID } from '@demo-renderer';
import {
  exampleCatalogApis,
  exampleCatalogComponents,
} from './customCatalog';

createApp(App)
  .use(A2UiVueRenderer as any, {
    registerBasicCatalog: true,
    registerVantCatalog: true,
    runtime: { platform: 'app' },
    catalogs: [
      {
        catalogId: VANT_CATALOG_ID,
        components: exampleCatalogComponents,
        apis: exampleCatalogApis,
      },
    ],
  })
  .mount('#app');

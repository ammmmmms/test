import { BASIC_COMPONENTS_LIST, BASIC_FUNCTIONS } from './basic-components';
import {
  VANT_COMPONENTS_LIST,
  VANT_FUNCTIONS_LIST,
} from './vant-components';
import { BASIC_THEME_SCHEMA, VANT_THEME_SCHEMA } from './theme';
import { buildCatalogSchema } from './schema';
import { BASIC_CATALOG_ID, VANT_CATALOG_ID } from '../core/constants';

export const BASIC_COMPONENTS = BASIC_COMPONENTS_LIST;
export const VANT_COMPONENTS = VANT_COMPONENTS_LIST;
export { BASIC_FUNCTIONS };
export const VANT_FUNCTIONS = VANT_FUNCTIONS_LIST;
export { BASIC_THEME_SCHEMA, VANT_THEME_SCHEMA };

export const basicCatalogSchema = buildCatalogSchema({
  catalogId: BASIC_CATALOG_ID,
  title: 'A2UI Basic Catalog',
  description: 'Official A2UI basic catalog rendered with Vant-compatible Vue components.',
  components: BASIC_COMPONENTS,
  functions: BASIC_FUNCTIONS,
  themeSchema: BASIC_THEME_SCHEMA,
});

export const vantCatalogSchema = buildCatalogSchema({
  catalogId: VANT_CATALOG_ID,
  title: 'A2UI Vant Catalog',
  description: 'Mobile-oriented A2UI catalog for Vue 3 applications using Vant.',
  components: VANT_COMPONENTS,
  functions: VANT_FUNCTIONS,
  themeSchema: VANT_THEME_SCHEMA,
});

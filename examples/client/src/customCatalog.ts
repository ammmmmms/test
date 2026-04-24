import { ActionSchema, DynamicStringSchema, type ComponentApi } from '@a2ui/web_core/v0_9';
import { z } from 'zod';
import A2UISmartSummary from './components/A2UISmartSummary.vue';

export const SmartSummaryApi = {
  name: 'SmartSummary',
  schema: z
    .object({
      title: DynamicStringSchema.optional(),
      ctaText: DynamicStringSchema.optional(),
      paths: z.array(z.string()).min(1),
      labels: z.array(z.string()).optional(),
      persistTo: z.string().optional(),
      action: ActionSchema.optional(),
    })
    .strict(),
} satisfies ComponentApi;

export const exampleCatalogComponents = {
  SmartSummary: A2UISmartSummary,
};

export const exampleCatalogApis = {
  SmartSummary: SmartSummaryApi,
};

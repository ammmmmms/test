import { zodToJsonSchema } from 'zod-to-json-schema';
import type {
  ComponentApi,
  FunctionImplementation,
} from '@a2ui/web_core/v0_9';

const defs = {
  ComponentCommon: {
    type: 'object',
    properties: {
      component: { type: 'string' },
      id: { type: 'string' },
    },
    required: ['component'],
  },
  CatalogComponentCommon: {
    type: 'object',
    properties: {
      weight: { type: 'number' },
    },
  },
};

export function buildCatalogSchema(args: {
  catalogId: string;
  title: string;
  description: string;
  components: ComponentApi[];
  functions?: FunctionImplementation[];
  themeSchema?: any;
}) {
  const components = Object.fromEntries(
    args.components.map((api) => {
      const converted = zodToJsonSchema(api.schema, {
        $refStrategy: 'none',
      }) as Record<string, any>;

      delete converted.$schema;
      delete converted.additionalProperties;

      return [
        api.name,
        {
          type: 'object',
          allOf: [
            { $ref: '#/$defs/ComponentCommon' },
            { $ref: '#/$defs/CatalogComponentCommon' },
            {
              type: 'object',
              properties: {
                component: { const: api.name },
              },
              required: ['component'],
            },
            converted,
          ],
        },
      ];
    }),
  );

  const functions = Object.fromEntries(
    (args.functions ?? []).map((fn) => {
      const converted = zodToJsonSchema(fn.schema, {
        $refStrategy: 'none',
      }) as Record<string, any>;

      delete converted.$schema;
      return [
        fn.name,
        {
          type: 'object',
          properties: {
            call: { const: fn.name },
            args: converted,
          },
          required: ['call', 'args'],
        },
      ];
    }),
  );

  const theme = args.themeSchema
    ? (zodToJsonSchema(args.themeSchema, {
        $refStrategy: 'none',
      }) as Record<string, any>).properties
    : undefined;

  return {
    $schema: 'https://json-schema.org/draft/2020-12/schema',
    $id: args.catalogId,
    catalogId: args.catalogId,
    title: args.title,
    description: args.description,
    components,
    functions,
    theme,
    $defs: defs,
  };
}

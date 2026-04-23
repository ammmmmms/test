import { zodToJsonSchema } from 'zod-to-json-schema';
import { BASIC_CATALOG_ID, VANT_CATALOG_ID } from './constants';
import type { ComponentRegistry } from './ComponentRegistry';
import type { CatalogFilter } from './catalogFilters';
import { basicCatalogSchema, vantCatalogSchema } from '../catalog';

export interface GetCatalogSchemaOptions {
  filter?: CatalogFilter;
}

export function getCatalogSchema(
  registry: ComponentRegistry,
  catalogId: string,
  options?: GetCatalogSchemaOptions,
): Record<string, any> {
  const seed =
    catalogId === BASIC_CATALOG_ID
      ? basicCatalogSchema
      : catalogId === VANT_CATALOG_ID
        ? vantCatalogSchema
        : {
            $schema: 'https://json-schema.org/draft/2020-12/schema',
            $id: catalogId,
            catalogId,
            title: catalogId,
            description: `Catalog schema for ${catalogId}`,
            components: {},
          };

  const schema = JSON.parse(JSON.stringify(seed));
  const registeredKeys = registry.keys(catalogId);

  for (const key of registeredKeys) {
    if (schema.components[key]) continue;
    const customApi = registry.getApi(catalogId, key);
    if (!customApi) continue;

    const convertedSchema = zodToJsonSchema(customApi.schema, {
      $refStrategy: 'none',
    }) as Record<string, any>;

    delete convertedSchema.$schema;
    delete convertedSchema.additionalProperties;

    schema.components[key] = {
      type: 'object',
      allOf: [
        { $ref: '#/$defs/ComponentCommon' },
        { $ref: '#/$defs/CatalogComponentCommon' },
        {
          type: 'object',
          properties: {
            component: { const: key },
          },
          required: ['component'],
        },
        convertedSchema,
      ],
    };
  }

  if (options?.filter) {
    for (const key of Object.keys(schema.components)) {
      if (!options.filter(key)) {
        delete schema.components[key];
      }
    }
  }

  return schema;
}

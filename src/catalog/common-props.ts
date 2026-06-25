import { AccessibilityAttributesSchema, DynamicBooleanSchema } from '@a2ui/web_core/v0_9';
import { z } from 'zod';

export const InlineStyleSchema = z
  .record(z.union([z.string(), z.number()]))
  .describe(
    'Inline CSS style object. Use camelCase keys such as backgroundColor, border, padding, borderRadius, color, boxShadow, or marginBottom.',
  );

export const CommonProps = {
  accessibility: AccessibilityAttributesSchema.optional(),
  weight: z
    .number()
    .describe(
      "The relative weight of this component within a Row or Column. Similar to CSS 'flex-grow'.",
    )
    .optional(),
  disabled: DynamicBooleanSchema.optional()
    .describe('Whether this component is disabled. When true, user interaction is prevented.'),
  neverDisabled: DynamicBooleanSchema.optional()
    .describe('When true, ignores any disabled state from parent/provider and stays enabled.'),
};

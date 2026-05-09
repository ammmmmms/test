import { AccessibilityAttributesSchema } from '@a2ui/web_core/v0_9';
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
};

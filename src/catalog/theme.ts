import { z } from 'zod';

export const BASIC_THEME_SCHEMA = z.object({
  primaryColor: z.string().optional(),
  errorColor: z.string().optional(),
  backgroundColor: z.string().optional(),
  surfaceColor: z.string().optional(),
});

export const VANT_THEME_SCHEMA = BASIC_THEME_SCHEMA.extend({
  successColor: z.string().optional(),
  warningColor: z.string().optional(),
  roundRadius: z.string().optional(),
});

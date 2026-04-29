import { z } from 'zod';

export const BASIC_THEME_SCHEMA = z.object({
  colorPrimary: z.string().optional(),
  colorBackground: z.string().optional(),
  colorSurface: z.string().optional(),
  colorOnBackground: z.string().optional(),
  colorOnSurface: z.string().optional(),
  colorBorder: z.string().optional(),
  borderRadius: z.string().optional(),
  fontSize: z.string().optional(),
  fontScale: z.string().optional(),
  spacingM: z.string().optional(),
});

export const VANT_THEME_SCHEMA = BASIC_THEME_SCHEMA.extend({
  colorSuccess: z.string().optional(),
  colorWarning: z.string().optional(),
  colorDanger: z.string().optional(),
});

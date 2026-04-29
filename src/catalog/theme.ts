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

  // Deprecated aliases kept for compatibility with older payloads.
  primaryColor: z.string().optional(),
  errorColor: z.string().optional(),
  backgroundColor: z.string().optional(),
  surfaceColor: z.string().optional(),
});

export const VANT_THEME_SCHEMA = BASIC_THEME_SCHEMA.extend({
  colorSuccess: z.string().optional(),
  colorWarning: z.string().optional(),
  successColor: z.string().optional(),
  warningColor: z.string().optional(),
  roundRadius: z.string().optional(),
});

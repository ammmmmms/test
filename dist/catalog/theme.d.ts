import { z } from 'zod';
export declare const BASIC_THEME_SCHEMA: z.ZodObject<{
    primaryColor: z.ZodOptional<z.ZodString>;
    errorColor: z.ZodOptional<z.ZodString>;
    backgroundColor: z.ZodOptional<z.ZodString>;
    surfaceColor: z.ZodOptional<z.ZodString>;
}, "strip", z.ZodTypeAny, {
    primaryColor?: string | undefined;
    errorColor?: string | undefined;
    backgroundColor?: string | undefined;
    surfaceColor?: string | undefined;
}, {
    primaryColor?: string | undefined;
    errorColor?: string | undefined;
    backgroundColor?: string | undefined;
    surfaceColor?: string | undefined;
}>;
export declare const VANT_THEME_SCHEMA: z.ZodObject<{
    primaryColor: z.ZodOptional<z.ZodString>;
    errorColor: z.ZodOptional<z.ZodString>;
    backgroundColor: z.ZodOptional<z.ZodString>;
    surfaceColor: z.ZodOptional<z.ZodString>;
} & {
    successColor: z.ZodOptional<z.ZodString>;
    warningColor: z.ZodOptional<z.ZodString>;
    roundRadius: z.ZodOptional<z.ZodString>;
}, "strip", z.ZodTypeAny, {
    primaryColor?: string | undefined;
    errorColor?: string | undefined;
    backgroundColor?: string | undefined;
    surfaceColor?: string | undefined;
    successColor?: string | undefined;
    warningColor?: string | undefined;
    roundRadius?: string | undefined;
}, {
    primaryColor?: string | undefined;
    errorColor?: string | undefined;
    backgroundColor?: string | undefined;
    surfaceColor?: string | undefined;
    successColor?: string | undefined;
    warningColor?: string | undefined;
    roundRadius?: string | undefined;
}>;

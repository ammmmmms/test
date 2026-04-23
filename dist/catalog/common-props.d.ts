import { z } from 'zod';
export declare const CommonProps: {
    accessibility: z.ZodOptional<z.ZodObject<{
        label: z.ZodOptional<z.ZodUnion<[z.ZodString, z.ZodObject<{
            path: z.ZodString;
        }, "strip", z.ZodTypeAny, {
            path: string;
        }, {
            path: string;
        }>, z.ZodObject<{
            call: z.ZodString;
            args: z.ZodRecord<z.ZodString, z.ZodAny>;
            returnType: z.ZodDefault<z.ZodEnum<["string", "number", "boolean", "array", "object", "any", "void"]>>;
        }, "strip", z.ZodTypeAny, {
            call: string;
            args: Record<string, any>;
            returnType: "string" | "number" | "boolean" | "object" | "array" | "void" | "any";
        }, {
            call: string;
            args: Record<string, any>;
            returnType?: "string" | "number" | "boolean" | "object" | "array" | "void" | "any" | undefined;
        }>]>>;
        description: z.ZodOptional<z.ZodUnion<[z.ZodString, z.ZodObject<{
            path: z.ZodString;
        }, "strip", z.ZodTypeAny, {
            path: string;
        }, {
            path: string;
        }>, z.ZodObject<{
            call: z.ZodString;
            args: z.ZodRecord<z.ZodString, z.ZodAny>;
            returnType: z.ZodDefault<z.ZodEnum<["string", "number", "boolean", "array", "object", "any", "void"]>>;
        }, "strip", z.ZodTypeAny, {
            call: string;
            args: Record<string, any>;
            returnType: "string" | "number" | "boolean" | "object" | "array" | "void" | "any";
        }, {
            call: string;
            args: Record<string, any>;
            returnType?: "string" | "number" | "boolean" | "object" | "array" | "void" | "any" | undefined;
        }>]>>;
    }, "strip", z.ZodTypeAny, {
        description?: string | {
            path: string;
        } | {
            call: string;
            args: Record<string, any>;
            returnType: "string" | "number" | "boolean" | "object" | "array" | "void" | "any";
        } | undefined;
        label?: string | {
            path: string;
        } | {
            call: string;
            args: Record<string, any>;
            returnType: "string" | "number" | "boolean" | "object" | "array" | "void" | "any";
        } | undefined;
    }, {
        description?: string | {
            path: string;
        } | {
            call: string;
            args: Record<string, any>;
            returnType?: "string" | "number" | "boolean" | "object" | "array" | "void" | "any" | undefined;
        } | undefined;
        label?: string | {
            path: string;
        } | {
            call: string;
            args: Record<string, any>;
            returnType?: "string" | "number" | "boolean" | "object" | "array" | "void" | "any" | undefined;
        } | undefined;
    }>>;
    weight: z.ZodOptional<z.ZodNumber>;
};

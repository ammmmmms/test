import { BASIC_FUNCTIONS } from './basic-components';
import { BASIC_THEME_SCHEMA, VANT_THEME_SCHEMA } from './theme';
export declare const BASIC_COMPONENTS: import('@a2ui/web_core/v0_9').ComponentApi<import('zod').ZodTypeAny>[];
export declare const VANT_COMPONENTS: import('@a2ui/web_core/v0_9').ComponentApi<import('zod').ZodTypeAny>[];
export { BASIC_FUNCTIONS };
export declare const VANT_FUNCTIONS: import('@a2ui/web_core/v0_9').FunctionImplementation[];
export { BASIC_THEME_SCHEMA, VANT_THEME_SCHEMA };
export declare const basicCatalogSchema: {
    $schema: string;
    $id: string;
    catalogId: string;
    title: string;
    description: string;
    components: {
        [k: string]: {
            type: string;
            allOf: Record<string, any>[];
        };
    };
    functions: {
        [k: string]: {
            type: string;
            properties: {
                call: {
                    const: string;
                };
                args: Record<string, any>;
            };
            required: string[];
        };
    };
    theme: any;
    $defs: {
        ComponentCommon: {
            type: string;
            properties: {
                component: {
                    type: string;
                };
                id: {
                    type: string;
                };
            };
            required: string[];
        };
        CatalogComponentCommon: {
            type: string;
            properties: {
                weight: {
                    type: string;
                };
            };
        };
    };
};
export declare const vantCatalogSchema: {
    $schema: string;
    $id: string;
    catalogId: string;
    title: string;
    description: string;
    components: {
        [k: string]: {
            type: string;
            allOf: Record<string, any>[];
        };
    };
    functions: {
        [k: string]: {
            type: string;
            properties: {
                call: {
                    const: string;
                };
                args: Record<string, any>;
            };
            required: string[];
        };
    };
    theme: any;
    $defs: {
        ComponentCommon: {
            type: string;
            properties: {
                component: {
                    type: string;
                };
                id: {
                    type: string;
                };
            };
            required: string[];
        };
        CatalogComponentCommon: {
            type: string;
            properties: {
                weight: {
                    type: string;
                };
            };
        };
    };
};

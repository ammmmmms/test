import { ComponentApi, FunctionImplementation } from '@a2ui/web_core/v0_9';
export declare function buildCatalogSchema(args: {
    catalogId: string;
    title: string;
    description: string;
    components: ComponentApi[];
    functions?: FunctionImplementation[];
    themeSchema?: any;
}): {
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

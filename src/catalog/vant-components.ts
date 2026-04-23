import { z } from 'zod';
import {
  ActionSchema,
  CheckableSchema,
  ChildListSchema,
  DynamicBooleanSchema,
  DynamicNumberSchema,
  DynamicStringSchema,
  type ComponentApi,
  type FunctionImplementation,
} from '@a2ui/web_core/v0_9';
import {
  BASIC_COMPONENTS,
  BASIC_FUNCTIONS,
} from '@a2ui/web_core/v0_9/basic_catalog';
import { CommonProps } from './common-props';

export const CellGroupApi: ComponentApi = {
  name: 'CellGroup',
  schema: z
    .object({
      ...CommonProps,
      title: DynamicStringSchema.optional(),
      children: ChildListSchema,
      inset: DynamicBooleanSchema.optional(),
    })
    .strict(),
};

export const TagApi: ComponentApi = {
  name: 'Tag',
  schema: z
    .object({
      ...CommonProps,
      text: DynamicStringSchema,
      type: z
        .enum(['default', 'primary', 'success', 'warning', 'danger'])
        .default('default')
        .optional(),
      plain: DynamicBooleanSchema.optional(),
    })
    .strict(),
};

export const VantButtonApi: ComponentApi = {
  name: 'Button',
  schema: z
    .object({
      ...CommonProps,
      label: DynamicStringSchema.optional(),
      text: DynamicStringSchema.optional(),
      child: z.string().optional(),
      variant: z
        .enum(['default', 'primary', 'borderless', 'danger', 'success'])
        .default('default')
        .optional(),
      action: ActionSchema,
      checks: CheckableSchema.shape.checks,
      block: DynamicBooleanSchema.optional(),
    })
    .strict(),
};

export const VantTextFieldApi: ComponentApi = {
  name: 'TextField',
  schema: z
    .object({
      ...CommonProps,
      label: DynamicStringSchema.optional(),
      value: DynamicStringSchema.optional(),
      placeholder: DynamicStringSchema.optional(),
      variant: z
        .enum(['shortText', 'longText', 'number', 'obscured'])
        .default('shortText')
        .optional(),
      action: ActionSchema.optional(),
      checks: CheckableSchema.shape.checks,
    })
    .strict(),
};

export const VantChoicePickerApi: ComponentApi = {
  name: 'ChoicePicker',
  schema: z
    .object({
      ...CommonProps,
      label: DynamicStringSchema.optional(),
      options: z.array(z.union([z.string(), z.number()])),
      value: z.union([DynamicStringSchema, z.array(z.any())]).optional(),
      variant: z
        .enum(['mutuallyExclusive', 'multipleSelection'])
        .default('mutuallyExclusive')
        .optional(),
      displayStyle: z
        .enum(['list', 'dropdown'])
        .default('list')
        .optional(),
      checks: CheckableSchema.shape.checks,
    })
    .strict(),
};

export const VantSliderApi: ComponentApi = {
  name: 'Slider',
  schema: z
    .object({
      ...CommonProps,
      value: DynamicNumberSchema,
      min: DynamicNumberSchema.optional(),
      max: DynamicNumberSchema.optional(),
      step: DynamicNumberSchema.optional(),
      action: ActionSchema.optional(),
    })
    .strict(),
};

export const VantDateTimeInputApi: ComponentApi = {
  name: 'DateTimeInput',
  schema: z
    .object({
      ...CommonProps,
      label: DynamicStringSchema.optional(),
      value: DynamicStringSchema.optional(),
      enableTime: DynamicBooleanSchema.optional(),
      min: DynamicStringSchema.optional(),
      max: DynamicStringSchema.optional(),
      action: ActionSchema.optional(),
    })
    .strict(),
};

const overrideNames = new Set([
  'Button',
  'TextField',
  'ChoicePicker',
  'Slider',
  'DateTimeInput',
]);

const baseComponents = BASIC_COMPONENTS.filter(
  (component) => !overrideNames.has(component.name),
);

export const VANT_COMPONENTS_LIST: ComponentApi[] = [
  ...baseComponents,
  CellGroupApi,
  TagApi,
  VantButtonApi,
  VantTextFieldApi,
  VantChoicePickerApi,
  VantSliderApi,
  VantDateTimeInputApi,
];

export const VANT_FUNCTIONS_LIST: FunctionImplementation[] = [...BASIC_FUNCTIONS];

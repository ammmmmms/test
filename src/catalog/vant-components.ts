import { z } from 'zod';
import {
  ActionSchema,
  CheckableSchema,
  ChildListSchema,
  DynamicBooleanSchema,
  DynamicNumberSchema,
  DynamicStringSchema,
  DynamicStringListSchema,
  type ComponentApi,
  type FunctionImplementation,
} from '@a2ui/web_core/v0_9';
import {
  BASIC_COMPONENTS,
  BASIC_FUNCTIONS,
} from '@a2ui/web_core/v0_9/basic_catalog';
import { CommonProps } from './common-props';

export const CellGroupApi = {
  name: 'CellGroup',
  schema: z
    .object({
      ...CommonProps,
      title: DynamicStringSchema.optional(),
      children: ChildListSchema,
      inset: DynamicBooleanSchema.optional(),
    })
    .strict(),
} satisfies ComponentApi;

export const TagApi = {
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
} satisfies ComponentApi;

export const VantButtonApi = {
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
} satisfies ComponentApi;

export const VantTextFieldApi = {
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
} satisfies ComponentApi;

export const VantCheckBoxApi = {
  name: 'CheckBox',
  schema: z
    .object({
      ...CommonProps,
      label: DynamicStringSchema,
      value: DynamicBooleanSchema,
      action: ActionSchema.optional(),
      checks: CheckableSchema.shape.checks,
    })
    .strict(),
} satisfies ComponentApi;

export const VantChoicePickerApi = {
  name: 'ChoicePicker',
  schema: z
    .object({
      ...CommonProps,
      label: DynamicStringSchema.optional(),
      options: z.array(z.union([z.string(), z.number()])),
      value: DynamicStringListSchema.optional(),
      variant: z
        .enum(['mutuallyExclusive', 'multipleSelection'])
        .default('mutuallyExclusive')
        .optional(),
      displayStyle: z
        .enum(['list', 'dropdown'])
        .default('list')
        .optional(),
      action: ActionSchema.optional(),
      checks: CheckableSchema.shape.checks,
    })
    .strict(),
} satisfies ComponentApi;

export const VantSliderApi = {
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
} satisfies ComponentApi;

export const VantDateTimeInputApi = {
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
} satisfies ComponentApi;

export const VantTabsApi = {
  name: 'Tabs',
  schema: z
    .object({
      ...CommonProps,
      tabs: z.array(
        z.object({
          title: DynamicStringSchema,
          child: z.string(),
        }).strict(),
      ).min(1),
      action: ActionSchema.optional(),
    })
    .strict(),
} satisfies ComponentApi;

export const VantModalApi = {
  name: 'Modal',
  schema: z
    .object({
      ...CommonProps,
      trigger: z.string(),
      content: z.string(),
      action: ActionSchema.optional(),
    })
    .strict(),
} satisfies ComponentApi;

const overrideNames = new Set([
  'Button',
  'TextField',
  'CheckBox',
  'ChoicePicker',
  'Slider',
  'DateTimeInput',
  'Tabs',
  'Modal',
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
  VantCheckBoxApi,
  VantChoicePickerApi,
  VantSliderApi,
  VantDateTimeInputApi,
  VantTabsApi,
  VantModalApi,
];

export const VANT_FUNCTIONS_LIST: FunctionImplementation[] = [...BASIC_FUNCTIONS];

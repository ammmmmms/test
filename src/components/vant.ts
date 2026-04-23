import { basicComponentImplementations } from './basic';
import A2UICellGroup from './A2UICellGroup.vue';
import A2UITag from './A2UITag.vue';

export const vantComponentImplementations = {
  ...basicComponentImplementations,
  CellGroup: A2UICellGroup,
  Tag: A2UITag,
};

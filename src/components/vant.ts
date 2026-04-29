import { basicComponentImplementations } from './basic';
import A2UICellGroup from './A2UICellGroup.vue';
import A2UIIcon from './A2UIIcon.vue';
import A2UIRow from './A2UIRow.vue';
import A2UITag from './A2UITag.vue';

export const vantComponentImplementations = {
  ...basicComponentImplementations,
  Icon: A2UIIcon,
  Row: A2UIRow,
  CellGroup: A2UICellGroup,
  Tag: A2UITag,
};

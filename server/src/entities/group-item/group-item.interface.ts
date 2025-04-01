import { BaseDomain } from '../../types';

export type GroupItem = BaseDomain & {
  product_id: number;
  group_id: number;
};

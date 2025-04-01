import { BaseDomain } from '../../types';

export enum GroupVariant {
  Category = 'category',
  Collection = 'collection',
}
export type Group = BaseDomain & {
  name: string;
  slug: string;
  variant: GroupVariant;
  description: string;
  image: string;
};

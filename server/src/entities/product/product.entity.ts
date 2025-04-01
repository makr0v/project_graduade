import { Column, Entity, OneToMany } from 'typeorm';

import { Product, ProductColors } from './product.interface';
import { BaseDomainEntity } from '../../types';
import { GroupItemEntity } from '../group-item';

@Entity('product', { synchronize: true })
export class ProductEntity extends BaseDomainEntity implements Product {
  @Column('varchar')
  name: string;
  @Column('float')
  price: number;
  @Column('float')
  discount: number;
  @Column('varchar')
  age: string;
  @Column('varchar')
  care: string;
  @Column('jsonb')
  colors: ProductColors;
  @Column('varchar')
  image: string;
  @Column('varchar')
  material: string;
  @Column('varchar')
  season: string;
  @Column('simple-array')
  sizes: string[];
  @Column('varchar')
  slug: string;
  @Column('varchar')
  description: string;

  @OneToMany(() => GroupItemEntity, (o) => o.group)
  items: GroupItemEntity[];
}

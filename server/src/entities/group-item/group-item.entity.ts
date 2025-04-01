import { Column, Entity, JoinColumn, ManyToOne } from 'typeorm';

import { BaseDomainEntity } from '../../types';
import { ProductEntity } from '../product';
import { GroupEntity } from '../group';
import { GroupItem } from './group-item.interface';

@Entity('group_items', { synchronize: true })
export class GroupItemEntity extends BaseDomainEntity implements GroupItem {
  @Column('int')
  product_id: number;
  @Column('int')
  group_id: number;

  @ManyToOne(() => ProductEntity, { onDelete: 'CASCADE' })
  @JoinColumn({ name: 'product_id' })
  product: ProductEntity;
  @ManyToOne(() => GroupEntity, { onDelete: 'CASCADE' })
  @JoinColumn({ name: 'group_id' })
  group: GroupEntity;
}

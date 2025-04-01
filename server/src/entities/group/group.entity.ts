import { Column, Entity, OneToMany } from 'typeorm';

import { Group, GroupVariant } from './group.interface';
import { BaseDomainEntity } from '../../types';
import { GroupItemEntity } from '../group-item';

@Entity('group', { synchronize: true })
export class GroupEntity extends BaseDomainEntity implements Group {
  @Column('varchar')
  name: string;
  @Column('enum', { enum: GroupVariant })
  variant: GroupVariant;
  @Column('varchar')
  description: string;
  @Column('varchar')
  image: string;
  @Column('varchar')
  slug: string;

  @OneToMany(() => GroupItemEntity, (o) => o.group)
  items: GroupItemEntity[];
}

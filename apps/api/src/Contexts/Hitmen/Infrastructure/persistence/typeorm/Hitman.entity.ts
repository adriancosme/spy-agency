/* eslint-disable */
import {
  Column,
  Entity,
  ManyToOne,
  OneToMany,
  PrimaryGeneratedColumn,
} from 'typeorm';
import { Hit } from '../../../../Hits/infrastructure/persistence/typeorm/Hit.entity';
import { HitmanRoleEnum, HitmanStatusEnum } from '../../../domain';
@Entity()
export class Hitman {
  @PrimaryGeneratedColumn('increment')
  id: number;

  @Column()
  name: string;

  @Column({ unique: true })
  email: string;

  @Column()
  password: string;

  @Column({
    enum: HitmanRoleEnum,
  })
  status: HitmanStatusEnum;

  @Column({
    enum: HitmanRoleEnum,
  })
  role: HitmanRoleEnum;

  @OneToMany(() => Hit, (hit) => hit.assignedTo)
  hits: Hit[];

  @ManyToOne(() => Hitman, (hitman) => hitman.managedHitmen)
  managedBy: Hitman;

  @OneToMany(() => Hitman, (hitman) => hitman.managedBy)
  managedHitmen: Hitman[];

  @OneToMany(() => Hit, (hit) => hit.createdBy)
  createdHits: Hit[];
}

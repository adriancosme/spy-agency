import { Column, Entity, ManyToOne, PrimaryColumn } from 'typeorm';
import { Hitman } from '../../../../Hitmen/Infrastructure/persistence/typeorm/Hitman.entity';
import { HitStatusEnum } from '../../../domain';

@Entity()
export class Hit {
  @PrimaryColumn()
  id: string;

  @ManyToOne(() => Hitman, (hitman) => hitman.hits)
  assignedTo: Hitman;

  @Column()
  description: string;

  @Column()
  target: string;

  @Column({
    enum: HitStatusEnum,
  })
  status: HitStatusEnum;

  @ManyToOne(() => Hitman, (hitman) => hitman.createdHits)
  createdBy: Hitman;
}

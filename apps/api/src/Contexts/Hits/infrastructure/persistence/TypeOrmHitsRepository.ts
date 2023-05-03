import { InjectRepository } from '@nestjs/typeorm';
import { Repository } from 'typeorm';
import { Hit as HitEntity } from '../../../Hits/infrastructure/persistence/typeorm/Hit.entity';
import { Hit, HitRepository } from '../../domain';

export class TypeOrmHitsRepository implements HitRepository {
  constructor(
    @InjectRepository(HitEntity)
    private repository: Repository<HitEntity>,
  ) {}
  async searchByAssignedTo(assignedTo: number): Promise<Hit[]> {
    return await this.repository.find({
      where: {
        assignedTo: {
          id: assignedTo,
        },
      },
    });
  }

  async searchByAssignedToGroup(assignedTo: number[]): Promise<Hit[]> {
    return this.repository
      .createQueryBuilder('hit')
      .where('hit.assignedTo IN (:...assignedTo)', { assignedTo })
      .getMany();
  }

  async save(hit: Hit): Promise<void> {
    await this.repository.save(hit);
  }

  async searchAll(): Promise<Hit[]> {
    return await this.repository.find({
      relations: {
        assignedTo: true,
        createdBy: true,
      },
      select: {
        createdBy: {
          id: true,
          name: true,
        },
        assignedTo: {
          id: true,
          name: true,
        },
      },
    });
  }

  async searchById(id: string): Promise<Hit | null> {
    return await this.repository.findOne({
      where: {
        id,
      },
    });
  }

  async update(hit: Hit): Promise<void> {
    await this.repository.save(hit);
  }
}

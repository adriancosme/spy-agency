import { Hitman, HitmanRepository } from '../../../domain';
import { Repository } from 'typeorm';
import { Injectable } from '@nestjs/common';
import { Hitman as HitmanEntity } from './Hitman.entity';
import { InjectRepository } from '@nestjs/typeorm';

@Injectable()
export class TypeOrmHitmanRepository implements HitmanRepository {
  constructor(
    @InjectRepository(HitmanEntity)
    private repository: Repository<HitmanEntity>,
  ) {}

  async searchByManagedBy(managerId: number): Promise<Hitman[]> {
    return await this.repository.find({
      where: {
        managedBy: {
          id: managerId,
        },
      },
    });
  }

  async save(hitman: Hitman): Promise<void> {
    await this.repository.save(hitman);
  }

  async searchAll(): Promise<Array<Hitman>> {
    return await this.repository.find();
  }

  async searchByEmail(email: string): Promise<Hitman | null> {
    return await this.repository.findOne({
      where: {
        email,
      },
    });
  }

  async searchById(id: number): Promise<Hitman | null> {
    return await this.repository.findOne({
      where: {
        id,
      },
    });
  }

  async update(hitman: Hitman): Promise<void> {
    await this.repository.save(hitman);
  }

  async nextId(): Promise<number> {
    const queryResult = await this.repository.query(
      "SELECT nextval(pg_get_serial_sequence('hitman', 'id'));",
    );
    const nextId = queryResult[0].nextval;
    return nextId;
  }
}

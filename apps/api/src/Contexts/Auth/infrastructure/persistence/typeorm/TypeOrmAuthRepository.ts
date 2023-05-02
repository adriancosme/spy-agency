import { AuthRepository } from '../../../domain/AuthRepository';
import { Repository } from 'typeorm';
import { Injectable } from '@nestjs/common';
import { Hitman as HitmanEntity } from '../../../../Hitmen/Infrastructure/persistence/typeorm/Hitman.entity';
import { Hitman } from '../../../../Shared/domain/Hitman';
import { InjectRepository } from '@nestjs/typeorm';

@Injectable()
export class TypeOrmAuthRepository implements AuthRepository {
  constructor(
    @InjectRepository(HitmanEntity)
    private repository: Repository<HitmanEntity>,
  ) {}

  async search(email: string): Promise<Hitman | null> {
    return await this.repository.findOne({
      where: {
        email,
      },
    });
  }
}

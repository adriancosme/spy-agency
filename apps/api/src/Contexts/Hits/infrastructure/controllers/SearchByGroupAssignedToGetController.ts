import { Controller, Get, Param } from '@nestjs/common';
import { TypeOrmHitmanRepository } from 'src/Contexts/Hitmen/Infrastructure/persistence/typeorm/TypeOrmHitmanRepository';
import { TypeOrmHitsRepository } from '../persistence/TypeOrmHitsRepository';

@Controller('hits')
export class SearchByGroupAssignedToGetController {
  constructor(
    private hitmanRepository: TypeOrmHitmanRepository,
    private hitRepository: TypeOrmHitsRepository,
  ) {}

  @Get('/:managerId')
  async get(@Param('managerId') managerId: number) {
    const hitmenManagedByManager =
      await this.hitmanRepository.searchByManagedBy(managerId);

    const hitmenIds = hitmenManagedByManager.map((hitman) => hitman.id);
    return await this.hitRepository.searchByAssignedToGroup(hitmenIds);
  }
}

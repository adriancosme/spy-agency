import { Controller, Get, Param } from '@nestjs/common';
import { TypeOrmHitmanRepository } from '../../../Hitmen/Infrastructure/persistence/typeorm/TypeOrmHitmanRepository';
import { TypeOrmHitsRepository } from '../persistence/TypeOrmHitsRepository';
import { SearchByManagerSearcher } from '../../../Hitmen/application/SearchByManager/SearchByManager';
import { SearchByGroupAssignedToSearcher } from '../../application/SeachByGroupAssignedTo/SearchByGroupAssignedTo';

@Controller('hits')
export class SearchByGroupAssignedToGetController {
  constructor(
    private hitmanRepository: TypeOrmHitmanRepository,
    private hitRepository: TypeOrmHitsRepository,
  ) {}

  @Get('/manager/:managerId')
  async get(@Param('managerId') managerId: number) {
    const hitmanSearcher = new SearchByManagerSearcher(this.hitmanRepository);
    const hitmenManagedByManager = await hitmanSearcher.run(managerId);

    const hitmenIds = hitmenManagedByManager.map((hitman) => hitman.id);
    const hitSearcher = new SearchByGroupAssignedToSearcher(this.hitRepository);
    return await hitSearcher.run(hitmenIds);
  }
}

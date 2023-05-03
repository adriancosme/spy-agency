import { Controller, Get, HttpCode, HttpStatus, Param } from '@nestjs/common';
import { TypeOrmHitsRepository } from '../persistence/TypeOrmHitsRepository';
import { SearchByAssignedTo } from '../../application/SearchByAssignedTo/SearchByAssignedTo';

@Controller('hits')
export class SearchByAssignedToGetController {
  constructor(private readonly hitRepository: TypeOrmHitsRepository) {}
  @HttpCode(HttpStatus.OK)
  @Get('/assignedTo/:assignedTo')
  async run(@Param('assignedTo') assignedTo: number) {
    console.log('SearchByAssignedToGetController', assignedTo);
    const seacher = new SearchByAssignedTo(this.hitRepository);
    return await seacher.run(assignedTo);
  }
}

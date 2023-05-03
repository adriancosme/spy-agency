import { Controller, Get, HttpCode, HttpStatus, Param } from '@nestjs/common';
import { TypeOrmHitsRepository } from '../persistence/TypeOrmHitsRepository';

@Controller('hits')
export class SearchByAssignedToGetController {
  constructor(private readonly hitRepository: TypeOrmHitsRepository) {}
  @HttpCode(HttpStatus.OK)
  @Get('/assignedTo/:assignedTo')
  async run(@Param('assignedTo') assignedTo: number) {
    return this.hitRepository.searchByAssignedTo(assignedTo);
  }
}

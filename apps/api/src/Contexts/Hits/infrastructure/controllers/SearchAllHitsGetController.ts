import { Controller, Get, HttpCode, HttpStatus } from '@nestjs/common';
import { TypeOrmHitsRepository } from '../persistence/TypeOrmHitsRepository';

@Controller('hits')
export class SearchAllHitsGetController {
  constructor(private readonly hitRepository: TypeOrmHitsRepository) {}
  @HttpCode(HttpStatus.OK)
  @Get('/all')
  async run() {
    return this.hitRepository.searchAll();
  }
}

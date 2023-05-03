import { Controller, Get, Param } from '@nestjs/common';
import { SearchByIdSearcher } from '../../application/SearchById/SearchByIdSearcher';
import { TypeOrmHitsRepository } from '../persistence/TypeOrmHitsRepository';
import { Hit } from '../../domain';

@Controller('hits')
export class SearchByIdGetController {
  constructor(private repository: TypeOrmHitsRepository) {}

  @Get(':id')
  async run(@Param('id') id: string): Promise<Hit | null> {
    const searcher = new SearchByIdSearcher(this.repository);
    const result = await searcher.run(id);
    return result;
  }
}

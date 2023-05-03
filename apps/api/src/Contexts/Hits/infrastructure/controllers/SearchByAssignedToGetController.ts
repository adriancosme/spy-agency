import {
  Controller,
  Get,
  HttpCode,
  HttpStatus,
  Param,
  UseGuards,
} from '@nestjs/common';
import { TypeOrmHitsRepository } from '../persistence/TypeOrmHitsRepository';
import { SearchByAssignedTo } from '../../application/SearchByAssignedTo/SearchByAssignedTo';
import { AuthGuard } from '../../../Auth/infrastructure/guards/auth.guard';

@Controller('hits')
export class SearchByAssignedToGetController {
  constructor(private readonly hitRepository: TypeOrmHitsRepository) {}

  @UseGuards(AuthGuard)
  @HttpCode(HttpStatus.OK)
  @Get('/assigned/:assignedTo')
  async run(@Param('assignedTo') assignedTo: number) {
    const seacher = new SearchByAssignedTo(this.hitRepository);
    return await seacher.run(assignedTo);
  }
}

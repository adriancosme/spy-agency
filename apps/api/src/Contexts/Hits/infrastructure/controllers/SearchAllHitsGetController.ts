import {
  Controller,
  Get,
  HttpCode,
  HttpStatus,
  Req,
  UseGuards,
} from '@nestjs/common';
import { TypeOrmHitmanRepository } from '../../../Hitmen/Infrastructure/persistence/typeorm/TypeOrmHitmanRepository';
import { Hitman, HitmanRoleEnum } from '../../../Hitmen/domain';
import { HitsFinder } from '../../application/SearchAll/HitsFinder';
import { TypeOrmHitsRepository } from '../persistence/TypeOrmHitsRepository';
import { Request } from 'express';
import { AuthGuard } from '../../../Auth/infrastructure/guards/auth.guard';

@Controller('hits')
export class SearchAllHitsGetController {
  constructor(
    private readonly hitRepository: TypeOrmHitsRepository,
    private readonly hitmanRepository: TypeOrmHitmanRepository,
  ) {}

  @UseGuards(AuthGuard)
  @HttpCode(HttpStatus.OK)
  @Get('/all')
  async run(@Req() request: Request) {
    const { id } = request.user as Hitman;
    console.log(id);
    if (!this.ensureIsBoss(Number(id))) {
      throw new Error('User is not a boss');
    }
    const searcher = new HitsFinder(this.hitRepository);
    return searcher.run();
  }

  private async ensureIsBoss(id: number): Promise<boolean> {
    const hitman = await this.hitmanRepository.searchById(id);
    return hitman?.role === HitmanRoleEnum.BOSS;
  }
}

import { Module } from '@nestjs/common';
import { SearchAllHitsGetController } from './infrastructure/controllers/SearchAllHitsGetController';
import { TypeOrmHitsRepository } from './infrastructure/persistence/TypeOrmHitsRepository';
import { TypeOrmModule } from '@nestjs/typeorm';
import { Hit } from './infrastructure/persistence/typeorm/Hit.entity';
import { SearchByAssignedToGetController } from './infrastructure/controllers/SearchByAssignedToGetController';
import { SearchByGroupAssignedToGetController } from './infrastructure/controllers/SearchByGroupAssignedToGetController';
import { Hitman } from '../Hitmen/Infrastructure/persistence/typeorm/Hitman.entity';
import { TypeOrmHitmanRepository } from '../Hitmen/Infrastructure/persistence/typeorm/TypeOrmHitmanRepository';
import { SearchByIdGetController } from './infrastructure/controllers/SearchByIdGetController';

@Module({
  imports: [TypeOrmModule.forFeature([Hit, Hitman])],
  controllers: [
    SearchAllHitsGetController,
    SearchByAssignedToGetController,
    SearchByGroupAssignedToGetController,
    SearchByIdGetController,
  ],
  providers: [TypeOrmHitsRepository, TypeOrmHitmanRepository],
  exports: [],
})
export class HitsModule {}

import { Module } from '@nestjs/common';
import { TypeOrmHitmanRepository } from './Infrastructure/persistence/typeorm/TypeOrmHitmanRepository';
import { TypeOrmModule } from '@nestjs/typeorm';
import { Hitman } from './Infrastructure/persistence/typeorm/Hitman.entity';

@Module({
  imports: [TypeOrmModule.forFeature([Hitman])],
  providers: [TypeOrmHitmanRepository],
  exports: [TypeOrmHitmanRepository],
})
export class HitmanModule {}

import { Module } from '@nestjs/common';
import { AppController } from './app.controller';
import { AppService } from './app.service';
import { AuthModule } from './Contexts/Auth/AuthModule';
import { HitmanModule } from './Contexts/Hitmen/HitmanModule';
import { ConfigModule, ConfigService } from '@nestjs/config';
import { TypeOrmModule } from '@nestjs/typeorm';
import { Configuration } from './Config/configuration';
import { Hit } from './Contexts/Hits/infrastructure/persistence/typeorm/Hit.entity';
import { Hitman } from './Contexts/Hitmen/Infrastructure/persistence/typeorm/Hitman.entity';
import { HitsModule } from './Contexts/Hits/HitsModule';

@Module({
  imports: [
    ConfigModule.forRoot({
      isGlobal: true,
      envFilePath: '.env',
    }),
    AuthModule,
    HitmanModule,
    HitsModule,
    TypeOrmModule.forRootAsync({
      imports: [ConfigModule],
      inject: [ConfigService],
      async useFactory(config: ConfigService) {
        return {
          type: 'postgres',
          host: config.get(Configuration.TYPEORM_HOST),
          port: config.get(Configuration.TYPEORM_PORT),
          username: config.get(Configuration.TYPEORM_USERNAME),
          password: config.get(Configuration.TYPEORM_PASSWORD),
          database: config.get(Configuration.TYPEORM_DATABASE),
          synchronize: config.get(Configuration.TYPEORM_SYNCHRONIZE) === 'true',
          entities: [Hit, Hitman],
        };
      },
    }),
  ],
  controllers: [AppController],
  providers: [AppService],
})
export class AppModule {}

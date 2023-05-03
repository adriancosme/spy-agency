import { Module } from '@nestjs/common';
import { ConfigService } from '@nestjs/config';
import { JwtModule } from '@nestjs/jwt';
import { PassportModule } from '@nestjs/passport';
import { TypeOrmModule } from '@nestjs/typeorm';
import { Hitman } from '../Hitmen/Infrastructure/persistence/typeorm/Hitman.entity';
import { CryptoService } from '../Shared/infrastructure/crypto.service';
import { LoginPostController } from './infrastructure/controllers/LoginPostController';
import { TypeOrmAuthRepository } from './infrastructure/persistence/typeorm/TypeOrmAuthRepository';
import { AuthService } from './infrastructure/services/auth.service';
import { JwtStrategy } from './infrastructure/strategies/jwt.strategy';
import { LocalStrategy } from './infrastructure/strategies/local.strategy';
import { RegisterPostController } from './infrastructure/controllers/RegisterPostController';
import { TypeOrmHitmanRepository } from '../Hitmen/Infrastructure/persistence/typeorm/TypeOrmHitmanRepository';

@Module({
  imports: [
    TypeOrmModule.forFeature([Hitman]),
    PassportModule.register({ defaultStrategy: 'jwt' }),
    JwtModule.registerAsync({
      inject: [],
      useFactory() {
        return {
          secret: process.env.JWT_SECRET,
          signOptions: { expiresIn: 60 * 60 },
        };
      },
    }),
  ],
  controllers: [LoginPostController, RegisterPostController],
  providers: [
    ConfigService,
    AuthService,
    LocalStrategy,
    JwtStrategy,
    TypeOrmAuthRepository,
    CryptoService,
    TypeOrmHitmanRepository,
  ],
  exports: [TypeOrmAuthRepository],
})
export class AuthModule {}

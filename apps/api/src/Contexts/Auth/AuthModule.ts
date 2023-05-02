import { Module } from '@nestjs/common';
import { PassportModule } from '@nestjs/passport';
import { JwtModule } from '@nestjs/jwt';
import { LoginPostController } from './infrastructure/controllers/LoginPostController';
import { JwtStrategy } from './infrastructure/strategies/jwt.strategy';
import { AuthService } from './infrastructure/services/auth.service';
import { LocalStrategy } from './infrastructure/strategies/local.strategy';
import { TypeOrmAuthRepository } from './infrastructure/persistence/typeorm/TypeOrmAuthRepository';
import { CryptoService } from '../Shared/infrastructure/crypto.service';
import { TypeOrmModule } from '@nestjs/typeorm';
import { Hitman } from '../Hitmen/Infrastructure/persistence/typeorm/Hitman.entity';
import { Configuration } from "../../Config/configuration";
import { ConfigService } from "@nestjs/config";


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
  controllers: [LoginPostController],
  providers: [
    ConfigService,
    AuthService,
    LocalStrategy,
    JwtStrategy,
    TypeOrmAuthRepository,
    CryptoService,
  ],
  exports: [TypeOrmAuthRepository],
})
export class AuthModule {
}

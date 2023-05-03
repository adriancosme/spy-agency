import { Body, Controller, Post, UnauthorizedException } from '@nestjs/common';
import { CryptoService } from '../../../Shared/infrastructure/crypto.service';
import { UserAuthenticator } from '../../application/UserAuthenticator';
import { Token } from '../../domain/Token';
import { LoginRequestDto } from '../DTO/LoginRequestDto';
import { TypeOrmAuthRepository } from '../persistence/typeorm/TypeOrmAuthRepository';
import { AuthService } from '../services/auth.service';

@Controller('login')
export class LoginPostController {
  constructor(
    private authRepository: TypeOrmAuthRepository,
    private cryptoService: CryptoService,
    private authService: AuthService,
  ) {}
  @Post('/')
  async run(@Body() body: LoginRequestDto): Promise<Token> {
    try {
      const authenticator = new UserAuthenticator(
        this.authRepository,
        this.cryptoService,
        this.authService,
      );
      return await authenticator.authenticate(body.email, body.password);
    } catch (error: any) {
      throw new UnauthorizedException(error.message);
    }
  }
}

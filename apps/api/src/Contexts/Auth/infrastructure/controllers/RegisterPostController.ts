import { Body, Controller, Post } from '@nestjs/common';
import { RegisterRequestDto } from '../DTO/RegisterRequestDto';
import { UserRegistrator } from '../../application/UserRegistrator';
import { TypeOrmHitmanRepository } from '../../../Hitmen/Infrastructure/persistence/typeorm/TypeOrmHitmanRepository';
import { CryptoService } from '../../../Shared/infrastructure/crypto.service';

@Controller('register')
export class RegisterPostController {
  constructor(
    private readonly hitmanRepository: TypeOrmHitmanRepository,
    private readonly crytoService: CryptoService,
  ) {}
  @Post('/')
  async run(@Body() body: RegisterRequestDto) {
    const register = new UserRegistrator(
      this.hitmanRepository,
      this.crytoService,
    );
    register.run(body.name, body.email, body.password);
  }
}

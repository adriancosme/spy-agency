import { Injectable } from '@nestjs/common';
import { JwtService } from '@nestjs/jwt';
import { UserAuth } from '../../domain/UserAuth';
import { Token } from '../../domain/Token';
import { Hitman } from '../../../Hitmen/domain';
import { TypeOrmAuthRepository } from '../persistence/typeorm/TypeOrmAuthRepository';

@Injectable()
export class AuthService {
  constructor(
    private hitmanService: TypeOrmAuthRepository,
    private jwtService: JwtService,
  ) {}

  async validateUser(
    userEmail: string,
    userPassword: string,
  ): Promise<Hitman | null> {
    const user = await this.hitmanService.search(userEmail);
    if (user && user.password === userPassword) {
      return user;
    }
    return null;
  }

  async login(user: Hitman): Promise<Token> {
    const payload = { email: user.email, id: user.id };
    return {
      accessToken: this.jwtService.sign(payload),
      user: { ...user },
    };
  }
}

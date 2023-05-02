import {
  HitmanRepository,
  Hitman,
  HitmanStatusEnum,
  HitmanRoleEnum,
} from '../../domain';
import { CryptoServiceRepository } from '../../../Shared/domain/CryptoServiceRepository';

export class HitmanCreator {
  constructor(
    private repository: HitmanRepository,
    private hasher: CryptoServiceRepository,
  ) {}

  async run(
    id: number,
    name: string,
    email: string,
    password: string,
    status: HitmanStatusEnum,
    role: HitmanRoleEnum,
  ) {
    const plainPassword = password;
    this.isEmailValid(email);
    this.isValidPassword(plainPassword);
    const passwordHash = await this.hasher.hashPassword(plainPassword);
    const hitman = Hitman.create(id, name, email, passwordHash, status, role);
    await this.repository.save(hitman);
  }

  private isValidPassword(plainPassword: string): void {
    if (plainPassword.trim().length === 0) {
      throw new Error('Password can not be empty');
    }
    if (!(plainPassword.trim().length >= 8)) {
      throw new Error('Password dont contain at least 8 characters');
    }
  }

  private isEmailValid(email: string): void {
    const regex = /^[^\s@]+@[^\s@]+\.[^\s@]+$/;
    if (email.trim().length === 0) {
      throw new Error('Email can not be empty');
    }
    if (!regex.test(email)) {
      throw new Error(`Email <${email}> is not valid`);
    }
  }
}

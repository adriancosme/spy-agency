import { HitmanPassword, HitmanRepository, Hitman } from '../../domain';
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
    status: string,
  ) {
    const plainPassword = new HitmanPassword(password);
    if (!plainPassword.isValidPassword()) {
      throw new Error('Password dont contain at least 8 characters');
    }
    const passwordHash = await this.hasher.hashPassword(plainPassword.value);
    const hitman = Hitman.create(id, name, email, passwordHash, status);
    this.repository.save(hitman);
  }
}

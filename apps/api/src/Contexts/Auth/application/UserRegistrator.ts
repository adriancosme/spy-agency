import {
  Hitman,
  HitmanRepository,
  HitmanRoleEnum,
  HitmanStatusEnum,
} from 'src/Contexts/Hitmen/domain';
import { CryptoService } from 'src/Contexts/Shared/infrastructure/crypto.service';

export class UserRegistrator {
  constructor(
    private readonly hitmenRepository: HitmanRepository,
    private readonly crytoService: CryptoService,
  ) {}

  async run(name: string, email: string, password: string) {
    const nextId = await this.hitmenRepository.nextId();
    const hashPassword = await this.crytoService.hashPassword(password);
    const hitman = Hitman.create(
      nextId,
      name,
      email,
      hashPassword,
      HitmanStatusEnum.ACTIVE,
      HitmanRoleEnum.HITMAN,
    );
    await this.hitmenRepository.save(hitman);
  }
}

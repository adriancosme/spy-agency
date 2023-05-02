import {
  Hitman,
  HitmanStatusEnum,
  HitmanRepository,
  HitmanRoleEnum,
} from '../../domain';
import { InvalidArgumentError } from '../../../Shared/domain/value-object/InvalidArgumentError';

export class HitmanUpdater {
  constructor(private repository: HitmanRepository) {}

  async run(
    id: number,
    name: string,
    email: string,
    status: HitmanStatusEnum,
    role: HitmanRoleEnum,
  ) {
    this.isEmailValid(email);
    const hitman = await this.repository.searchById(id);
    if (!hitman) {
      throw new InvalidArgumentError('Hitman does not exist');
    }
    if (
      hitman.status === HitmanStatusEnum.INACTIVE &&
      status === HitmanStatusEnum.ACTIVE
    ) {
      throw new InvalidArgumentError(
        'Hitman can not be changed from INACTIVE to ACTIVE',
      );
    }
    const newHitman = new Hitman(
      hitman.id,
      name,
      email,
      hitman.password,
      status,
      role,
    );
    return await this.repository.update(newHitman);
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

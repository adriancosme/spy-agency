import { Hitman } from '../../../Hitmen/domain/Hitman';
import { HitmanRepository } from '../../domain/HitmanRepository';
import { HitmanEmail } from '../../../Hitmen/domain/HitmanEmail';
import { HitmanPassword } from '../../../Hitmen/domain/HitmanPassword';
import { HitmanStatus } from '../../../Hitmen/domain/HitmanStatus';
import { HitmanId } from '../../../Hitmen/domain/HitmanId';

export class HitmanCreator {
  constructor(private repository: HitmanRepository) {}

  async run(
    id: number,
    name: string,
    email: string,
    password: string,
    status: string,
  ) {
    const hitman = new Hitman(
      new HitmanId(id),
      name,
      new HitmanEmail(email),
      new HitmanPassword(password),
      new HitmanStatus(status, HitmanStatus.VALID_VALUES),
    );
    return this.repository.save(hitman);
  }
}

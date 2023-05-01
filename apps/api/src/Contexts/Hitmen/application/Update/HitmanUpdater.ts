import {
  Hitman,
  HitmanStatusEnum,
  HitmanRepository,
  HitmanEmail,
  HitmanStatus,
} from '../../domain';
import { InvalidArgumentError } from '../../../Shared/domain/value-object/InvalidArgumentError';
import {HitmanRole, HitmanRoleEnum} from "../../domain/HitmanRole";

export class HitmanUpdater {
  constructor(private repository: HitmanRepository) {}
  async run(id: number, name: string, email: string, status: string, role: string) {
    const hitman = await this.repository.searchById(id);
    if (!hitman) {
      throw new InvalidArgumentError('Hitman does not exist');
    }
    if (
      hitman.status.value === HitmanStatus.INACTIVE.value &&
      status === HitmanStatus.ACTIVE.value
    ) {
      throw new InvalidArgumentError(
        'Hitman can not be changed from INACTIVE to ACTIVE',
      );
    }
    const newHitman = new Hitman(
      hitman.id,
      name,
      new HitmanEmail(email),
      hitman.password,
      new HitmanStatus(status, Object.values(HitmanStatusEnum)),
      new HitmanRole(role, Object.values(HitmanRoleEnum))
    );
    return await this.repository.update(newHitman);
  }
}

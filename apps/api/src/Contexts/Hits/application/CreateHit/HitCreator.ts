import { Hit, HitRepository, HitStatusEnum } from '../../domain';
import {
  Hitman,
  HitmanRepository,
  HitmanStatusEnum,
} from '../../../Hitmen/domain';

export class HitCreator {
  constructor(
    private repository: HitRepository,
    private hitmanRepository: HitmanRepository,
  ) {}

  async run(
    id: string,
    assignedTo: Hitman,
    description: string,
    target: string,
    status: HitStatusEnum,
    createdBy: Hitman,
  ) {
    const hitmanAssignedTo = await this.hitmanRepository.searchById(
      assignedTo.id,
    );
    if (hitmanAssignedTo == null) {
      throw new Error('Hitman not found');
    }
    if (hitmanAssignedTo.status === HitmanStatusEnum.INACTIVE) {
      throw new Error('Hitman is retired');
    }
    const hit = new Hit(
      id,
      hitmanAssignedTo,
      description,
      target,
      status,
      createdBy,
    );
    await this.repository.save(hit);
  }
}

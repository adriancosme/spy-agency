import { Hit, HitRepository, HitStatusEnum } from '../../domain';
import { HitmanRepository, HitmanStatusEnum } from '../../../Hitmen/domain';

export class HitCreator {
  constructor(
    private repository: HitRepository,
    private hitmanRepository: HitmanRepository,
  ) {}

  async run(
    id: string,
    assignedTo: number,
    description: string,
    target: string,
    status: HitStatusEnum,
    createdBy: number,
  ) {
    const hitmanAssignedTo = await this.hitmanRepository.searchById(assignedTo);
    if (hitmanAssignedTo == null) {
      throw new Error('Hitman not found');
    }
    if (hitmanAssignedTo.status === HitmanStatusEnum.INACTIVE) {
      throw new Error('Hitman is retired');
    }
    const hit = new Hit(
      id,
      hitmanAssignedTo.id,
      description,
      target,
      status,
      createdBy,
    );
    await this.repository.save(hit);
  }
}

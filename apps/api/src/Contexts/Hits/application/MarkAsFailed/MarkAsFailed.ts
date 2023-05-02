import { Hit, HitRepository, HitStatusEnum } from '../../domain';
import { HitmanRepository, HitmanStatusEnum } from '../../../Hitmen/domain';

export class MarkAsFailed {
  constructor(
    private repository: HitRepository,
    private hitmanRepository: HitmanRepository,
  ) {}

  async run(hitId: string, hitmanId: number) {
    const hitmanPerformAction = await this.hitmanRepository.searchById(
      hitmanId,
    );
    if (hitmanPerformAction == null) {
      throw new Error('Hitman not found');
    }
    if (hitmanPerformAction.status === HitmanStatusEnum.INACTIVE) {
      throw new Error('Hitman that performs the action is INACTIVE');
    }
    const hit = await this.repository.searchById(hitId);
    if (hit == null) {
      throw new Error('Hit not found');
    }
    if (hit.status === HitStatusEnum.FAILED) {
      throw new Error('Hit already failed');
    }
    const newHit = new Hit(
      hit.id,
      hit.assignedTo,
      hit.description,
      hit.target,
      HitStatusEnum.FAILED,
      hit.createdBy,
    );
    this.repository.update(newHit);
  }
}

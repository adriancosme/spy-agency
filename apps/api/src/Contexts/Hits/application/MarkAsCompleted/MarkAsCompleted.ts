import { HitmanRepository, HitmanStatusEnum } from '../../../Hitmen/domain';
import { Hit, HitRepository, HitStatusEnum } from '../../domain';

export class MarkAsCompleted {
  constructor(
    private hitRepository: HitRepository,
    private hitmanRepository: HitmanRepository,
  ) {}
  async run(hitId: string, hitmanPerformActionId: number) {
    const hitmanPerformAction = await this.hitmanRepository.searchById(
      hitmanPerformActionId,
    );
    if (hitmanPerformAction == null) {
      throw new Error('Hitman not found');
    }
    if (hitmanPerformAction.status === HitmanStatusEnum.INACTIVE) {
      throw new Error('Hitman that performs the action is INACTIVE');
    }
    const hit = await this.hitRepository.searchById(hitId);
    if (hit == null) {
      throw new Error('Hit not found');
    }
    if (hit.status === HitStatusEnum.COMPLETED) {
      throw new Error('Hit already completed');
    }
    const newHit = new Hit(
      hit.id,
      hit.assignedTo,
      hit.description,
      hit.target,
      HitStatusEnum.COMPLETED,
      hit.createdBy,
    );
    await this.hitRepository.update(newHit);
  }
}

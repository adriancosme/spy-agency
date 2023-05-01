import { HitmanRepository } from 'src/Contexts/Hitmen/domain';
import { Hit, HitRepository, HitStatus } from '../../domain';

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
    if (hitmanPerformAction.isRetired()) {
      throw new Error('Hitman that performs the action is INACTIVE');
    }
    const hit = await this.repository.searchById(hitId);
    if (hit == null) {
      throw new Error('Hit not found');
    }
    if (hit.status === HitStatus.FAILED) {
      throw new Error('Hit already failed');
    }
    const newHit = new Hit(
      hit.id,
      hit.assignedTo,
      hit.description,
      hit.target,
      HitStatus.FAILED,
      hit.createdBy,
    );
    this.repository.update(newHit);
  }
}

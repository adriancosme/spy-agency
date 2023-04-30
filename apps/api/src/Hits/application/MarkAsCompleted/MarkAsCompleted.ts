import { Hit, HitRepository, HitStatus } from '../../domain';

export class MarkAsCompleted {
  constructor(private hitRepository: HitRepository) {}
  async run(id: string) {
    const hit = await this.hitRepository.searchById(id);
    if (hit == null) {
      throw new Error('Hit not found');
    }
    if (hit.status.value === HitStatus.COMPLETED.value) {
      throw new Error('Hit already completed');
    }
    const newHit = new Hit(
      hit.id,
      hit.assignedTo,
      hit.description,
      hit.target,
      HitStatus.COMPLETED,
      hit.createdBy,
    );
    await this.hitRepository.update(newHit);
  }
}

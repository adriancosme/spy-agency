import { HitId } from '../../../../src/Hits/domain/HitId';
import { HitRepository } from '../../../../src/Hits/domain/HitRepository';
import { HitmanId } from '../../../../src/Hitmen/domain/HitmanId';
import { HitStatus, HitStatusEnum } from '../../../../src/Hits/domain/HitStatus';
import { Hit } from '../../../../src/Hits/domain/Hit';
import { HitmanRepository } from '../../../../src/Hitmen/domain/HitmanRepository';

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
    status: string,
    createdBy: number,
  ) {
    const hitmanAssignedTo = await this.hitmanRepository.searchById(assignedTo);
    if (hitmanAssignedTo == null) {
      throw new Error('Hitman not found');
    }
    if (hitmanAssignedTo.isRetired()) {
      throw new Error('Hitman is retired');
    }
    const hit = new Hit(
      new HitId(id),
      hitmanAssignedTo.id,
      description,
      target,
      new HitStatus(status, Object.values(HitStatusEnum)),
      new HitmanId(createdBy),
    );
    await this.repository.save(hit);
  }
}

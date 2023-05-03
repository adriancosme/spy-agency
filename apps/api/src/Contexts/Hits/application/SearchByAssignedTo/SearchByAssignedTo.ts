import { Hit, HitRepository } from '../../domain';

export class SearchByAssignedTo {
  constructor(private hitRepository: HitRepository) {}

  async run(assignedTo: number): Promise<Hit[]> {
    return await this.hitRepository.searchByAssignedTo(assignedTo);
  }
}

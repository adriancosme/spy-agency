import { Hit, HitRepository } from '../../domain';

export class SearchByGroupAssignedToSearcher {
  constructor(private hitRepository: HitRepository) {}

  async run(assignedTo: number[]): Promise<Hit[]> {
    return await this.hitRepository.searchByAssignedToGroup(assignedTo);
  }
}

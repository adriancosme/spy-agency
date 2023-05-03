import { HitmanRepository } from '../../domain';

export class SearchByManagerSearcher {
  constructor(private repository: HitmanRepository) {}

  async run(managerId: number) {
    return await this.repository.searchByManagedBy(managerId);
  }
}

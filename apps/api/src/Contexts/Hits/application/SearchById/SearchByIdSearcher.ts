import { Hit, HitRepository } from '../../domain';

export class SearchByIdSearcher {
  constructor(private repository: HitRepository) {}
  async run(id: string): Promise<Hit | null> {
    return await this.repository.searchById(id);
  }
}

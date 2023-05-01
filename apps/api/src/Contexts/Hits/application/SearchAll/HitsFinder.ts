import { HitRepository } from '../../domain';

export class HitsFinder {
  constructor(private hitsRepository: HitRepository) {}

  async run() {
    const hits = await this.hitsRepository.searchAll();
    return hits;
  }
}

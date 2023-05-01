import { HitRepository } from '../../domain';

export class HitsFinder {
  constructor(private hitsRepository: HitRepository) {}

  async run() {
    return await this.hitsRepository.searchAll();
  }
}

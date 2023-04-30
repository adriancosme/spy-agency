import { Hitman } from '../../domain/Hitman';
import { HitmanRepository } from '../../domain/HitmanRepository';
import { HitmanStatus } from '../../domain/HitmanStatus';

export class HitmanRetired {
  constructor(private repository: HitmanRepository) {}

  async run(hitmanId: number): Promise<void> {
    const hitman = await this.repository.searchById(hitmanId);
    if (!hitman) {
      throw new Error('Hitman not found');
    }
    const newHitman = new Hitman(
      hitman.id,
      hitman.name,
      hitman.email,
      hitman.password,
      HitmanStatus.INACTIVE,
    );
    await this.repository.update(newHitman);
  }
}

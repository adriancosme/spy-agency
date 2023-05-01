import { Hitman, HitmanRepository, HitmanStatus } from '../../domain';

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
      hitman.role
    );
    await this.repository.update(newHitman);
  }
}

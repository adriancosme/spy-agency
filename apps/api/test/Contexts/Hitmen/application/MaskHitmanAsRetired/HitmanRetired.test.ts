import {
  Hitman,
  HitmanStatusEnum,
} from '../../../../../src/Contexts/Hitmen/domain';
import { HitmanRepositoryMock } from '../../__mocks__/HitmanRepositoryMock';
import { HitmanRetired } from '../../../../../src/Contexts/Hitmen/application/MaskHitmanAsRetired/HitmanRetired';
import { HitmanMother } from '../../domain/HitmanMother';

describe('HitmanRetired', () => {
  let repository: HitmanRepositoryMock;
  beforeEach(() => {
    repository = new HitmanRepositoryMock();
  });
  it('should mask hitman as retired', async () => {
    const hitman = HitmanMother.random();
    const hitmanUpdated = new Hitman(
      hitman.id,
      hitman.name,
      hitman.email,
      hitman.password,
      HitmanStatusEnum.INACTIVE,
      hitman.role,
    );
    repository.returnSearchById(hitman);
    const updater = new HitmanRetired(repository);
    await updater.run(hitman.id);
    repository.assertUpdateHaveBeenCalledWith(hitmanUpdated);
  });
  it('should throw an error if hitman does not exist', async () => {
    try {
      const hitman = HitmanMother.random();
      const updater = new HitmanRetired(repository);
      await updater.run(hitman.id);
      expect(true).toBeFalsy();
    } catch (error) {
      expect(error).toHaveProperty('message', 'Hitman not found');
    }
  });
});

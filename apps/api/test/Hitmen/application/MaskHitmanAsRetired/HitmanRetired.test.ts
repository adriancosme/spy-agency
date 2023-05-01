import {
  Hitman,
  HitmanEmail,
  HitmanId,
  HitmanPassword,
  HitmanStatus,
} from '../../../../src/Contexts/Hitmen/domain';
import { HitmanRepositoryMock } from '../../__mocks__/HitmanRepositoryMock';
import { HitmanRetired } from '../../../../src/Contexts/Hitmen/application/MaskHitmanAsRetired/HitmanRetired';
import { faker } from '@faker-js/faker';

describe('HitmanRetired', () => {
  let repository: HitmanRepositoryMock;
  beforeEach(() => {
    repository = new HitmanRepositoryMock();
  });
  it('should mask hitman as retired', async () => {
    const hitman = new Hitman(
      new HitmanId(4),
      'John Doe',
      new HitmanEmail(faker.internet.email()),
      new HitmanPassword('12fassajkl21DSA'),
      HitmanStatus.ACTIVE,
    );
    const hitmanUpdated = new Hitman(
      hitman.id,
      hitman.name,
      hitman.email,
      hitman.password,
      HitmanStatus.INACTIVE,
    );
    repository.returnSearchById(hitman);
    const updater = new HitmanRetired(repository);
    await updater.run(hitman.id.value);
    repository.assertUpdateHaveBeenCalledWith(hitmanUpdated);
  });
  it('should throw an error if hitman does not exist', async () => {
    try {
      const hitman = new Hitman(
        new HitmanId(1),
        'John Doe',
        new HitmanEmail(faker.internet.email()),
        new HitmanPassword('12fassajkl21DSA'),
        HitmanStatus.ACTIVE,
      );
      const updater = new HitmanRetired(repository);
      await updater.run(hitman.id.value);
      expect(true).toBeFalsy();
    } catch (error) {
      expect(error).toHaveProperty('message', 'Hitman not found');
    }
  });
});

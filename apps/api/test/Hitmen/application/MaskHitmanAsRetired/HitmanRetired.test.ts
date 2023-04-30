import { Hitman } from '../../../../src/Hitmen/domain/Hitman';
import { HitmanEmail } from '../../../../src/Hitmen/domain/HitmanEmail';
import { HitmanId } from '../../../../src/Hitmen/domain/HitmanId';
import { faker } from '@faker-js/faker';
import { HitmanPassword } from '../../../../src/Hitmen/domain/HitmanPassword';
import { HitmanStatus } from '../../../../src/Hitmen/domain/HitmanStatus';
import { HitmanRepositoryMock } from '../../../../test/Hitmen/__mocks__/HitmanRepositoryMock';
import { HitmanRetired } from '../../../../src/Hitmen/application/MaskHitmanAsRetired/HitmanRetired';

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

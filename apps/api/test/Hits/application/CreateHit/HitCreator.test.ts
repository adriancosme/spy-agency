import { Cuid } from '../../../../src/Shared/domain/value-object/Cuid';
import { HitRepositoryMock } from '../../../../test/Hits/__mocks__/HitRepositoryMock';
import { HitmanId } from '../../../../src/Hitmen/domain/HitmanId';
import { HitCreator } from '../../../../src/Hits/application/CreateHit/HitCreator';
import { Hit } from '../../../../src/Hits/domain/Hit';
import { HitId } from '../../../../src/Hits/domain/HitId';
import {
  HitStatus,
  HitStatusEnum,
} from '../../../../src/Hits/domain/HitStatus';
import { HitmanRepositoryMock } from '../../../../test/Hitmen/__mocks__/HitmanRepositoryMock';
import { Hitman } from '../../../../src/Hitmen/domain/Hitman';
import { HitmanEmail } from '../../../../src/Hitmen/domain/HitmanEmail';
import { HitmanStatus } from '../../../../src/Hitmen/domain/HitmanStatus';
import { HitmanPassword } from '../../../../src/Hitmen/domain/HitmanPassword';

describe('HitCreator', () => {
  let repository: HitRepositoryMock;
  let hitmanRepository: HitmanRepositoryMock;

  beforeEach(() => {
    repository = new HitRepositoryMock();
    hitmanRepository = new HitmanRepositoryMock();
  });
  it('should create a hit', async () => {
    const hitmanAssignedTo = new Hitman(
      new HitmanId(3),
      'Juan Perez',
      new HitmanEmail('juanperez@gmail.com'),
      new HitmanPassword('jPerez09124214'),
      new HitmanStatus(HitmanStatus.ACTIVE.value, HitmanStatus.VALID_VALUES),
    );
    hitmanRepository.returnSearchById(hitmanAssignedTo);

    const hit = new Hit(
      new HitId(Cuid.random().value),
      hitmanAssignedTo.id,
      'Lorem ipsum',
      'Juan Perez',
      new HitStatus(HitStatus.ASSIGNED.value, Object.values(HitStatusEnum)),
      new HitmanId(1),
    );
    const creator = new HitCreator(repository, hitmanRepository);
    await expect(
      creator.run(
        hit.id.value,
        hit.assignedTo.value,
        hit.description,
        hit.target,
        hit.status.value,
        hit.createdBy.value,
      ),
    ).resolves.not.toThrow();
    repository.assertSaveHasBeenCalledWith(hit);
  });
  it('should throw an error if try to create a hit with retired hitman', async () => {
    const hitmanAssignedTo = new Hitman(
      new HitmanId(3),
      'Juan Perez',
      new HitmanEmail('juanperez@gmail.com'),
      new HitmanPassword('jPerez09124214'),
      new HitmanStatus(HitmanStatus.INACTIVE.value, HitmanStatus.VALID_VALUES),
    );
    hitmanRepository.returnSearchById(hitmanAssignedTo);
    const hit = new Hit(
      new HitId(Cuid.random().value),
      hitmanAssignedTo.id,
      'Lorem ipsum',
      'Juan Perez',
      new HitStatus(HitStatus.ASSIGNED.value, Object.values(HitStatusEnum)),
      new HitmanId(1),
    );
    const creator = new HitCreator(repository, hitmanRepository);
    await expect(
      creator.run(
        hit.id.value,
        hit.assignedTo.value,
        hit.description,
        hit.target,
        hit.status.value,
        hit.createdBy.value,
      ),
    ).rejects.toThrowError('Hitman is retired');
  });
  it('should throw an error if the hitman is not found', async () => {
    const hit = new Hit(
      new HitId(Cuid.random().value),
      new HitmanId(3),
      'Lorem ipsum',
      'Juan Perez',
      new HitStatus(HitStatus.ASSIGNED.value, Object.values(HitStatusEnum)),
      new HitmanId(1),
    );
    hitmanRepository.returnSearchById(null);
    const creator = new HitCreator(repository, hitmanRepository);
    await expect(
      creator.run(
        hit.id.value,
        hit.assignedTo.value,
        hit.description,
        hit.target,
        hit.status.value,
        hit.createdBy.value,
      ),
    ).rejects.toThrowError('Hitman not found');
  });
});

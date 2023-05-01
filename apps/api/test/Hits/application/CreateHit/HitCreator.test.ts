import { Cuid } from '../../../../src/Contexts/Shared/domain/value-object/Cuid';
import { HitRepositoryMock } from '../../__mocks__/HitRepositoryMock';
import { HitCreator } from '../../../../src/Contexts/Hits/application/CreateHit/HitCreator';
import {
  Hit,
  HitId,
  HitStatus,
  HitStatusEnum,
} from '../../../../src/Contexts/Hits/domain';
import { HitmanRepositoryMock } from '../../../Hitmen/__mocks__/HitmanRepositoryMock';
import {
  HitmanId,
  HitmanStatus,
  HitmanStatusEnum,
  Hitman,
  HitmanEmail,
  HitmanPassword,
} from '../../../../src/Contexts/Hitmen/domain';

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
      new HitmanStatus(
        HitmanStatus.ACTIVE.value,
        Object.values(HitmanStatusEnum),
      ),
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
      new HitmanStatus(
        HitmanStatus.INACTIVE.value,
        Object.values(HitmanStatusEnum),
      ),
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

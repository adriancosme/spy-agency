import { Cuid } from '../../../../src/Contexts/Shared/domain/value-object/Cuid';
import { Hit, HitId, HitStatus } from '../../../../src/Contexts/Hits/domain';
import {
  Hitman,
  HitmanEmail,
  HitmanId,
  HitmanPassword,
  HitmanStatus,
} from '../../../../src/Contexts/Hitmen/domain';
import { HitRepositoryMock } from '../../../../test/Hits/__mocks__/HitRepositoryMock';
import { MarkAsFailed } from '../../../../src/Contexts/Hits/application/MarkAsFailed/MarkAsFailed';
import { HitmanRepositoryMock } from '../../../../test/Hitmen/__mocks__/HitmanRepositoryMock';

describe('MarkAsFailed', () => {
  let repository: HitRepositoryMock;
  let hitmanRepository: HitmanRepositoryMock;
  const hitmanInactivePerformAction = new Hitman(
    new HitmanId(2),
    'Joe Doe',
    new HitmanEmail('joe@spy.com'),
    new HitmanPassword('ASDx2asfSAF'),
    HitmanStatus.INACTIVE,
  );
  const hitmanActivePerformAction = new Hitman(
    new HitmanId(2),
    'Joe Doe',
    new HitmanEmail('joe@spy.com'),
    new HitmanPassword('ASDx2asfSAF'),
    HitmanStatus.ACTIVE,
  );
  beforeEach(() => {
    repository = new HitRepositoryMock();
    hitmanRepository = new HitmanRepositoryMock();
  });
  it('should mark hit as failed', async () => {
    const hit = new Hit(
      new HitId(Cuid.random().value),
      new HitmanId(3),
      'Kill the bad guy',
      'Juan Perez',
      HitStatus.ASSIGNED,
      new HitmanId(2),
    );
    hitmanRepository.returnSearchById(hitmanActivePerformAction);
    repository.returnSeachById(hit);
    const updater = new MarkAsFailed(repository, hitmanRepository);
    await updater.run(hit.id.value, hitmanActivePerformAction.id.value);
    const updatedHit = new Hit(
      hit.id,
      hit.assignedTo,
      hit.description,
      hit.target,
      HitStatus.FAILED,
      hit.createdBy,
    );
    repository.assertUpdateHasBeenCalledWith(updatedHit);
  });
  it('should not mark hit as failed if it does not exist', async () => {
    hitmanRepository.returnSearchById(hitmanActivePerformAction);
    const updater = new MarkAsFailed(repository, hitmanRepository);
    await expect(
      updater.run(Cuid.random().value, hitmanActivePerformAction.id.value),
    ).rejects.toThrowError('Hit not found');
  });
  it('should not mark hit as failed if it is already failed', async () => {
    const hit = new Hit(
      new HitId(Cuid.random().value),
      new HitmanId(3),
      'Kill the bad guy',
      'Juan Perez',
      HitStatus.FAILED,
      new HitmanId(2),
    );
    hitmanRepository.returnSearchById(hitmanActivePerformAction);
    repository.returnSeachById(hit);
    const updater = new MarkAsFailed(repository, hitmanRepository);
    await expect(
      updater.run(hit.id.value, hitmanActivePerformAction.id.value),
    ).rejects.toThrowError('Hit already failed');
  });
  it('should throw error if hitman that performs the action is INACTIVE', async () => {
    const hit = new Hit(
      new HitId(Cuid.random().value),
      new HitmanId(3),
      'Kill the bad guy',
      'Juan Perez',
      HitStatus.ASSIGNED,
      new HitmanId(2),
    );
    hitmanRepository.returnSearchById(hitmanInactivePerformAction);
    repository.returnSeachById(hit);
    const updater = new MarkAsFailed(repository, hitmanRepository);
    await expect(
      updater.run(hit.id.value, hitmanInactivePerformAction.id.value),
    ).rejects.toThrowError('Hitman that performs the action is INACTIVE');
  });
  it('should throw error if hitman that performs the action does not exist', async () => {
    const updater = new MarkAsFailed(repository, hitmanRepository);
    await expect(
      updater.run(Cuid.random().value, hitmanInactivePerformAction.id.value),
    ).rejects.toThrowError('Hitman not found');
  });
});

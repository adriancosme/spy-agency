import { HitmanRepositoryMock } from '../../../Hitmen/__mocks__/HitmanRepositoryMock';
import { HitRepositoryMock } from '../../__mocks__/HitRepositoryMock';
import { Cuid } from '../../../../src/Shared/domain/value-object/Cuid';
import { MarkAsCompleted } from '../../../../src/Hits/application/MarkAsCompleted/MarkAsCompleted';
import {
  Hitman,
  HitmanEmail,
  HitmanId,
  HitmanPassword,
  HitmanStatus,
} from '../../../../src/Hitmen/domain';
import { Hit, HitId, HitStatus } from '../../../../src/Hits/domain';

describe('MarkAsCompleted', () => {
  let hitRepository: HitRepositoryMock;
  let hitmanRepository: HitmanRepositoryMock;
  const hitmanAssignedTo = Hitman.create(
    new HitmanId(3),
    'John',
    new HitmanEmail('john@spy.com'),
    new HitmanPassword('asfA2FXVsa32XX'),
    HitmanStatus.ACTIVE,
  );
  const hitmanCreatedBy = Hitman.create(
    new HitmanId(2),
    'Peter',
    new HitmanEmail('peter@spy.com'),
    new HitmanPassword('asfA2FXVsa32XX'),
    HitmanStatus.ACTIVE,
  );

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

  let hitAssignedExample: Hit;
  beforeEach(() => {
    hitRepository = new HitRepositoryMock();
    hitmanRepository = new HitmanRepositoryMock();
    hitAssignedExample = new Hit(
      new HitId(Cuid.random().value),
      hitmanAssignedTo.id,
      'Lorem ipsum',
      'Juan Perez',
      new HitStatus(HitStatus.ASSIGNED.value, HitStatus.VALID_STATUS),
      hitmanCreatedBy.id,
    );
  });
  it('should mark a hit as completed', async () => {
    hitmanRepository.returnSearchById(hitmanActivePerformAction);
    hitRepository.returnSeachById(hitAssignedExample);
    const updater = new MarkAsCompleted(hitRepository, hitmanRepository);
    await updater.run(
      hitAssignedExample.id.value,
      hitmanActivePerformAction.id.value,
    );
    const hitUpdated = new Hit(
      hitAssignedExample.id,
      hitAssignedExample.assignedTo,
      hitAssignedExample.description,
      hitAssignedExample.target,
      HitStatus.COMPLETED,
      hitAssignedExample.createdBy,
    );
    hitRepository.assertUpdateHasBeenCalledWith(hitUpdated);
  });
  it('should throw an error if the hit does not exist', async () => {
    hitmanRepository.returnSearchById(hitmanActivePerformAction);
    const updater = new MarkAsCompleted(hitRepository, hitmanRepository);
    await expect(
      updater.run(Cuid.random().value, hitmanActivePerformAction.id.value),
    ).rejects.toThrowError('Hit not found');
  });
  it('should throw an error if the hit is already completed', async () => {
    const hit = new Hit(
      new HitId(Cuid.random().value),
      hitmanAssignedTo.id,
      'Lorem ipsum',
      'Juan Perez',
      new HitStatus(HitStatus.COMPLETED.value, HitStatus.VALID_STATUS),
      hitmanCreatedBy.id,
    );
    hitmanRepository.returnSearchById(hitmanActivePerformAction);
    hitRepository.returnSeachById(hit);
    const updater = new MarkAsCompleted(hitRepository, hitmanRepository);
    await expect(
      updater.run(hit.id.value, hitmanActivePerformAction.id.value),
    ).rejects.toThrowError('Hit already completed');
  });
  it('should throw an error if the hitman that performs the action not exists', async () => {
    const updater = new MarkAsCompleted(hitRepository, hitmanRepository);
    await expect(
      updater.run(Cuid.random().value, hitmanActivePerformAction.id.value),
    ).rejects.toThrowError('Hitman not found');
  });
  it('should throw an error if the hitman that performs the action is inactive', async () => {
    hitmanRepository.returnSearchById(hitmanInactivePerformAction);
    hitRepository.returnSeachById(hitAssignedExample);
    const updater = new MarkAsCompleted(hitRepository, hitmanRepository);
    await expect(
      updater.run(
        hitAssignedExample.id.value,
        hitmanActivePerformAction.id.value,
      ),
    ).rejects.toThrowError('Hitman that performs the action is INACTIVE');
  });
});

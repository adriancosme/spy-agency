import { HitmanMother } from '../../../Hitmen/domain/HitmanMother';
import {
  Hitman,
  HitmanEmail,
  HitmanId,
  HitmanPassword,
  HitmanStatus,
} from '../../../../../src/Contexts/Hitmen/domain';
import { MarkAsCompleted } from '../../../../../src/Contexts/Hits/application/MarkAsCompleted/MarkAsCompleted';
import {
  Hit,
  HitId,
  HitStatus,
  HitStatusEnum,
} from '../../../../../src/Contexts/Hits/domain';
import { Cuid } from '../../../../../src/Contexts/Shared/domain/value-object/Cuid';
import { HitmanRepositoryMock } from '../../../Hitmen/__mocks__/HitmanRepositoryMock';
import { HitRepositoryMock } from '../../__mocks__/HitRepositoryMock';

describe('MarkAsCompleted', () => {
  let hitRepository: HitRepositoryMock;
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

  let hitAssignedExample: Hit;
  beforeEach(() => {
    hitRepository = new HitRepositoryMock();
    hitmanRepository = new HitmanRepositoryMock();
    const hitmanAssignedTo = HitmanMother.random();
    const hitmanCreatedBy = HitmanMother.random();
    hitAssignedExample = new Hit(
      new HitId(Cuid.random().value),
      hitmanAssignedTo.id,
      'Lorem ipsum',
      'Juan Perez',
      new HitStatus(HitStatus.ASSIGNED.value, Object.values(HitStatusEnum)),
      hitmanCreatedBy.id,
    );
  });
  it('should mark a hit as completed', async () => {
    hitmanRepository.returnSearchById(hitmanActivePerformAction);
    hitRepository.returnSearchById(hitAssignedExample);
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
    const hitmanAssignedTo = HitmanMother.random();
    const hitmanCreatedBy = HitmanMother.random();
    const hit = new Hit(
      new HitId(Cuid.random().value),
      hitmanAssignedTo.id,
      'Lorem ipsum',
      'Juan Perez',
      new HitStatus(HitStatus.COMPLETED.value, Object.values(HitStatusEnum)),
      hitmanCreatedBy.id,
    );
    hitmanRepository.returnSearchById(hitmanActivePerformAction);
    hitRepository.returnSearchById(hit);
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
    hitRepository.returnSearchById(hitAssignedExample);
    const updater = new MarkAsCompleted(hitRepository, hitmanRepository);
    await expect(
      updater.run(
        hitAssignedExample.id.value,
        hitmanActivePerformAction.id.value,
      ),
    ).rejects.toThrowError('Hitman that performs the action is INACTIVE');
  });
});

import { HitmanMother } from '../../../Hitmen/domain/HitmanMother';
import {
  Hitman,
  HitmanStatusEnum,
} from '../../../../../src/Contexts/Hitmen/domain';
import { MarkAsCompleted } from '../../../../../src/Contexts/Hits/application/MarkAsCompleted/MarkAsCompleted';
import { Hit, HitStatusEnum } from '../../../../../src/Contexts/Hits/domain';
import { HitmanRepositoryMock } from '../../../Hitmen/__mocks__/HitmanRepositoryMock';
import { HitRepositoryMock } from '../../__mocks__/HitRepositoryMock';
import { HitmanRoleMother } from '../../../Hitmen/domain/HitmanRoleMother';
import { HitmanIdMother } from '../../../Hitmen/domain/HitmanIdMother';
import { HitmanNameMother } from '../../../Hitmen/domain/HitmanNameMother';
import { HitmanEmailMother } from '../../../Hitmen/domain/HitmanEmailMother';
import { HitmanPasswordMother } from '../../../Hitmen/domain/HitmanPasswordMother';
import { HitIdMother } from '../../domain/HitIdMother';
import { HitDescriptionMother } from '../../domain/HitDescriptionMother';
import { HitTargetMother } from '../../domain/HitTargetMother';

describe('MarkAsCompleted', () => {
  let hitRepository: HitRepositoryMock;
  let hitmanRepository: HitmanRepositoryMock;

  const hitmanInactivePerformAction = new Hitman(
    HitmanIdMother.random(),
    HitmanNameMother.random(),
    HitmanEmailMother.random(),
    HitmanPasswordMother.random(),
    HitmanStatusEnum.INACTIVE,
    HitmanRoleMother.random(),
  );
  const hitmanActivePerformAction = new Hitman(
    HitmanIdMother.random(),
    HitmanNameMother.random(),
    HitmanEmailMother.random(),
    HitmanPasswordMother.random(),
    HitmanStatusEnum.ACTIVE,
    HitmanRoleMother.random(),
  );

  let hitAssignedExample: Hit;
  beforeEach(() => {
    hitRepository = new HitRepositoryMock();
    hitmanRepository = new HitmanRepositoryMock();
    const hitmanAssignedTo = HitmanMother.random();
    const hitmanCreatedBy = HitmanMother.random();
    hitAssignedExample = new Hit(
      HitIdMother.random(),
      hitmanAssignedTo.id,
      HitDescriptionMother.random(),
      HitTargetMother.random(),
      HitStatusEnum.ASSIGNED,
      hitmanCreatedBy.id,
    );
  });
  it('should mark a hit as completed', async () => {
    hitmanRepository.returnSearchById(hitmanActivePerformAction);
    hitRepository.returnSearchById(hitAssignedExample);
    const updater = new MarkAsCompleted(hitRepository, hitmanRepository);
    await updater.run(hitAssignedExample.id, hitmanActivePerformAction.id);
    const hitUpdated = new Hit(
      hitAssignedExample.id,
      hitAssignedExample.assignedTo,
      hitAssignedExample.description,
      hitAssignedExample.target,
      HitStatusEnum.COMPLETED,
      hitAssignedExample.createdBy,
    );
    hitRepository.assertUpdateHasBeenCalledWith(hitUpdated);
  });
  it('should throw an error if the hit does not exist', async () => {
    hitmanRepository.returnSearchById(hitmanActivePerformAction);
    const updater = new MarkAsCompleted(hitRepository, hitmanRepository);
    await expect(
      updater.run(HitIdMother.random(), hitmanActivePerformAction.id),
    ).rejects.toThrowError('Hit not found');
  });
  it('should throw an error if the hit is already completed', async () => {
    const hitmanAssignedTo = HitmanMother.random();
    const hitmanCreatedBy = HitmanMother.random();
    const hit = new Hit(
      HitIdMother.random(),
      hitmanAssignedTo.id,
      HitDescriptionMother.random(),
      HitTargetMother.random(),
      HitStatusEnum.COMPLETED,
      hitmanCreatedBy.id,
    );
    hitmanRepository.returnSearchById(hitmanActivePerformAction);
    hitRepository.returnSearchById(hit);
    const updater = new MarkAsCompleted(hitRepository, hitmanRepository);
    await expect(
      updater.run(hit.id, hitmanActivePerformAction.id),
    ).rejects.toThrowError('Hit already completed');
  });
  it('should throw an error if the hitman that performs the action not exists', async () => {
    const updater = new MarkAsCompleted(hitRepository, hitmanRepository);
    await expect(
      updater.run(HitIdMother.random(), hitmanActivePerformAction.id),
    ).rejects.toThrowError('Hitman not found');
  });
  it('should throw an error if the hitman that performs the action is inactive', async () => {
    hitmanRepository.returnSearchById(hitmanInactivePerformAction);
    hitRepository.returnSearchById(hitAssignedExample);
    const updater = new MarkAsCompleted(hitRepository, hitmanRepository);
    await expect(
      updater.run(hitAssignedExample.id, hitmanActivePerformAction.id),
    ).rejects.toThrowError('Hitman that performs the action is INACTIVE');
  });
});

import { Cuid } from '../../../../../src/Contexts/Shared/domain/value-object/Cuid';
import { Hit, HitStatusEnum } from '../../../../../src/Contexts/Hits/domain';
import {
  Hitman,
  HitmanStatusEnum,
} from '../../../../../src/Contexts/Hitmen/domain';
import { HitRepositoryMock } from '../../__mocks__/HitRepositoryMock';
import { MarkAsFailed } from '../../../../../src/Contexts/Hits/application/MarkAsFailed/MarkAsFailed';
import { HitmanRepositoryMock } from '../../../Hitmen/__mocks__/HitmanRepositoryMock';
import { HitmanRoleMother } from '../../../Hitmen/domain/HitmanRoleMother';
import { HitmanIdMother } from '../../../Hitmen/domain/HitmanIdMother';
import { HitmanNameMother } from '../../../Hitmen/domain/HitmanNameMother';
import { HitmanEmailMother } from '../../../Hitmen/domain/HitmanEmailMother';
import { HitmanPasswordMother } from '../../../Hitmen/domain/HitmanPasswordMother';
import { HitIdMother } from '../../domain/HitIdMother';
import { HitDescriptionMother } from '../../domain/HitDescriptionMother';
import { HitTargetMother } from '../../domain/HitTargetMother';

describe('MarkAsFailed', () => {
  let repository: HitRepositoryMock;
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
  beforeEach(() => {
    repository = new HitRepositoryMock();
    hitmanRepository = new HitmanRepositoryMock();
  });
  it('should mark hit as failed', async () => {
    const hit = new Hit(
      HitIdMother.random(),
      HitmanIdMother.random(),
      HitDescriptionMother.random(),
      HitTargetMother.random(),
      HitStatusEnum.ASSIGNED,
      HitmanIdMother.random(),
    );
    hitmanRepository.returnSearchById(hitmanActivePerformAction);
    repository.returnSearchById(hit);
    const updater = new MarkAsFailed(repository, hitmanRepository);
    await updater.run(hit.id, hitmanActivePerformAction.id);
    const updatedHit = new Hit(
      hit.id,
      hit.assignedTo,
      hit.description,
      hit.target,
      HitStatusEnum.FAILED,
      hit.createdBy,
    );
    repository.assertUpdateHasBeenCalledWith(updatedHit);
  });
  it('should not mark hit as failed if it does not exist', async () => {
    hitmanRepository.returnSearchById(hitmanActivePerformAction);
    const updater = new MarkAsFailed(repository, hitmanRepository);
    await expect(
      updater.run(Cuid.random().value, hitmanActivePerformAction.id),
    ).rejects.toThrowError('Hit not found');
  });
  it('should not mark hit as failed if it is already failed', async () => {
    const hit = new Hit(
      HitIdMother.random(),
      HitmanIdMother.random(),
      HitDescriptionMother.random(),
      HitTargetMother.random(),
      HitStatusEnum.FAILED,
      HitmanIdMother.random(),
    );
    hitmanRepository.returnSearchById(hitmanActivePerformAction);
    repository.returnSearchById(hit);
    const updater = new MarkAsFailed(repository, hitmanRepository);
    await expect(
      updater.run(hit.id, hitmanActivePerformAction.id),
    ).rejects.toThrowError('Hit already failed');
  });
  it('should throw error if hitman that performs the action is INACTIVE', async () => {
    const hit = new Hit(
      HitIdMother.random(),
      HitmanIdMother.random(),
      HitDescriptionMother.random(),
      HitTargetMother.random(),
      HitStatusEnum.ASSIGNED,
      HitmanIdMother.random(),
    );
    hitmanRepository.returnSearchById(hitmanInactivePerformAction);
    repository.returnSearchById(hit);
    const updater = new MarkAsFailed(repository, hitmanRepository);
    await expect(
      updater.run(hit.id, hitmanInactivePerformAction.id),
    ).rejects.toThrowError('Hitman that performs the action is INACTIVE');
  });
  it('should throw error if hitman that performs the action does not exist', async () => {
    const updater = new MarkAsFailed(repository, hitmanRepository);
    await expect(
      updater.run(Cuid.random().value, hitmanInactivePerformAction.id),
    ).rejects.toThrowError('Hitman not found');
  });
});

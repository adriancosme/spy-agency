import { HitRepositoryMock } from '../../__mocks__/HitRepositoryMock';
import { HitCreator } from '../../../../../src/Contexts/Hits/application/CreateHit/HitCreator';
import { Hit } from '../../../../../src/Contexts/Hits/domain';
import { HitmanRepositoryMock } from '../../../Hitmen/__mocks__/HitmanRepositoryMock';
import {
  Hitman,
  HitmanRoleEnum,
  HitmanStatusEnum,
} from '../../../../../src/Contexts/Hitmen/domain';
import { HitmanRoleMother } from '../../../Hitmen/domain/HitmanRoleMother';
import { HitmanMother } from '../../../Hitmen/domain/HitmanMother';
import { HitIdMother } from '../../domain/HitIdMother';
import { HitDescriptionMother } from '../../domain/HitDescriptionMother';
import { HitmanNameMother } from '../../../Hitmen/domain/HitmanNameMother';
import { HitStatusMother } from '../../domain/HitStatusMother';
import { HitmanIdMother } from '../../../Hitmen/domain/HitmanIdMother';
import { HitmanEmailMother } from '../../../Hitmen/domain/HitmanEmailMother';
import { HitmanPasswordMother } from '../../../Hitmen/domain/HitmanPasswordMother';
import { HitTargetMother } from '../../domain/HitTargetMother';

describe('HitCreator', () => {
  let repository: HitRepositoryMock;
  let hitmanRepository: HitmanRepositoryMock;

  beforeEach(() => {
    repository = new HitRepositoryMock();
    hitmanRepository = new HitmanRepositoryMock();
  });
  it('should create a hit', async () => {
    const hitmanAssignedTo = new Hitman(
      HitmanIdMother.random(),
      HitmanNameMother.random(),
      HitmanEmailMother.random(),
      HitmanPasswordMother.random(),
      HitmanStatusEnum.ACTIVE,
      HitmanRoleEnum.HITMAN,
    );
    hitmanRepository.returnSearchById(hitmanAssignedTo);

    const hit = new Hit(
      HitIdMother.random(),
      hitmanAssignedTo.id,
      HitDescriptionMother.random(),
      HitmanNameMother.random(),
      HitStatusMother.random(),
      HitmanMother.random().id,
    );
    const creator = new HitCreator(repository, hitmanRepository);
    await expect(
      creator.run(
        hit.id,
        hit.assignedTo,
        hit.description,
        hit.target,
        hit.status,
        hit.createdBy,
      ),
    ).resolves.not.toThrow();
    repository.assertSaveHasBeenCalledWith(hit);
  });
  it('should throw an error if try to create a hit with retired hitman', async () => {
    const hitmanAssignedTo = new Hitman(
      HitmanIdMother.random(),
      HitmanNameMother.random(),
      HitmanEmailMother.random(),
      HitmanPasswordMother.random(),
      HitmanStatusEnum.INACTIVE,
      HitmanRoleMother.random(),
    );
    hitmanRepository.returnSearchById(hitmanAssignedTo);
    const hit = new Hit(
      HitIdMother.random(),
      hitmanAssignedTo.id,
      HitDescriptionMother.random(),
      HitmanNameMother.random(),
      HitStatusMother.random(),
      HitmanMother.random().id,
    );
    const creator = new HitCreator(repository, hitmanRepository);
    await expect(
      creator.run(
        hit.id,
        hit.assignedTo,
        hit.description,
        hit.target,
        hit.status,
        hit.createdBy,
      ),
    ).rejects.toThrowError('Hitman is retired');
  });
  it('should throw an error if the hitman is not found', async () => {
    const hit = new Hit(
      HitIdMother.random(),
      HitmanIdMother.random(),
      HitDescriptionMother.random(),
      HitTargetMother.random(),
      HitStatusMother.random(),
      HitmanIdMother.random(),
    );
    const creator = new HitCreator(repository, hitmanRepository);
    await expect(
      creator.run(
        hit.id,
        hit.assignedTo,
        hit.description,
        hit.target,
        hit.status,
        hit.createdBy,
      ),
    ).rejects.toThrowError('Hitman not found');
  });
});

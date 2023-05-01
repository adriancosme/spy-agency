import {Hitman, HitmanStatus} from "../../../../../src/Contexts/Hitmen/domain";
import {HitmanIdMother} from "../../domain/HitmanIdMother";
import {HitmanNameMother} from "../../domain/HitmanNameMother";
import {HitmanEmailMother} from "../../domain/HitmanEmaiilMother";
import {HitmanPasswordMother} from "../../domain/HitmanPasswordMother";
import {HitmanManager} from "../../../../../src/Contexts/Hitmen/domain/HitmanManager";
import {HitmanManagerRepositoryMock} from "../../__mocks__/HitmanManagerRepositoryMock";
import {
  AssignHitmanToManagerHandler
} from "../../../../../src/Contexts/Hitmen/application/AssignHitmanToManagerHandler";
import {HitmanRole} from "../../../../../src/Contexts/Hitmen/domain/HitmanRole";
import {HitmanRepositoryMock} from "../../__mocks__/HitmanRepositoryMock";

describe('AssignHitmanToManager Handler', () => {
  let repository: HitmanManagerRepositoryMock;
  let hitmanRepository: HitmanRepositoryMock
  beforeEach(() => {
    repository = new HitmanManagerRepositoryMock();
    hitmanRepository = new HitmanRepositoryMock();
  })
  it('should assign hitman to a manager', async () => {
    const hitmanPerformAction = new Hitman(
      HitmanIdMother.random(),
      HitmanNameMother.random(),
      HitmanEmailMother.random(),
      HitmanPasswordMother.random(),
      HitmanStatus.ACTIVE,
      HitmanRole.BOSS
    );
    hitmanRepository.returnSearchById(hitmanPerformAction)
    const hitman = new Hitman(
      HitmanIdMother.random(),
      HitmanNameMother.random(),
      HitmanEmailMother.random(),
      HitmanPasswordMother.random(),
      HitmanStatus.ACTIVE,
      HitmanRole.HITMAN
    );
    const manager = new Hitman(
      HitmanIdMother.random(),
      HitmanNameMother.random(),
      HitmanEmailMother.random(),
      HitmanPasswordMother.random(),
      HitmanStatus.ACTIVE,
      HitmanRole.MANAGER
    )
    const hitmanManager = new HitmanManager(
      hitman.id,
      manager.id
    )
    const handler = new AssignHitmanToManagerHandler(repository, hitmanRepository);
    await handler.run(
      hitman.id.value,
      manager.id.value,
      hitmanPerformAction.id.value
    );
    repository.assertSaveHasBeenCalledWith(hitmanManager)
  })
  it('should only the boss can assign a hitman to manager', async () => {
    const hitmanPerformAction = new Hitman(
      HitmanIdMother.random(),
      HitmanNameMother.random(),
      HitmanEmailMother.random(),
      HitmanPasswordMother.random(),
      HitmanStatus.ACTIVE,
      HitmanRole.MANAGER
    );
    hitmanRepository.returnSearchById(hitmanPerformAction)
    const hitman = new Hitman(
      HitmanIdMother.random(),
      HitmanNameMother.random(),
      HitmanEmailMother.random(),
      HitmanPasswordMother.random(),
      HitmanStatus.ACTIVE,
      HitmanRole.HITMAN
    );
    const manager = new Hitman(
      HitmanIdMother.random(),
      HitmanNameMother.random(),
      HitmanEmailMother.random(),
      HitmanPasswordMother.random(),
      HitmanStatus.ACTIVE,
      HitmanRole.MANAGER
    )
    const handler = new AssignHitmanToManagerHandler(repository, hitmanRepository);
    await expect(
      handler.run(
        hitman.id.value,
        manager.id.value,
        hitmanPerformAction.id.value
      )
    ).rejects.toThrowError('Only boss can assign a hitman to manager')
  })
});

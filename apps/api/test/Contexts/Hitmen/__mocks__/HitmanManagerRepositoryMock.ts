import {HitmanManagerRepository} from "../../../../src/Contexts/Hitmen/domain/HitmanManagerRepository";
import {HitmanManager} from "../../../../src/Contexts/Hitmen/domain/HitmanManager";

export class HitmanManagerRepositoryMock implements HitmanManagerRepository {
  private saveMock = jest.fn();

  save(hitmanManager: HitmanManager): Promise<void> {
    return this.saveMock(hitmanManager);
  }

  assertSaveHasBeenCalledWith(hitman: HitmanManager) {
    expect(this.saveMock).toHaveBeenCalledWith(hitman)
  }
}

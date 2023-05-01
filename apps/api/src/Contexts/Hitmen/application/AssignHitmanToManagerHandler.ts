import {HitmanManagerRepository} from "../domain/HitmanManagerRepository";
import {HitmanManager} from "../domain/HitmanManager";
import {HitmanRepository} from "../domain";
import {HitmanRole} from "../domain/HitmanRole";

export class AssignHitmanToManagerHandler {
  constructor(private repository: HitmanManagerRepository, private hitmanRepository: HitmanRepository) {
  }
  async run(
    hitmanId: number,
    managerId: number,
    hitmanPerformActionId: number,
  ) {
    const hitmanPerformAction = await this.hitmanRepository.searchById(hitmanPerformActionId);
    const hitman = await this.hitmanRepository.searchById(hitmanId);
    const manager = await this.hitmanRepository.searchById(managerId);
    if(hitmanPerformAction == null) {
      throw new Error('Hitman that perform the action dont exist');
    }

    if(hitmanPerformAction.role.value !== HitmanRole.BOSS.value) {
      throw new Error('Only boss can assign a hitman to manager')
    }

    if(hitman == null) {
      throw new Error('Hitman that your are tying  to assign dont exist')
    }

    if(manager == null) {
      throw new Error('Manager that your are tying  to assign dont exist')
    }

    const hitmanManager = new HitmanManager(
      hitman.id,
      manager.id
    )
    await this.repository.save(hitmanManager)
  }
}

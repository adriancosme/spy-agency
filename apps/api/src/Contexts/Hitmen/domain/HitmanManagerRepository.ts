import {HitmanManager} from "./HitmanManager";

export interface HitmanManagerRepository {
  save(hitmanManager: HitmanManager): Promise<void>
}

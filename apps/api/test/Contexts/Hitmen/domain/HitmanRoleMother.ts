import {HitmanRole, HitmanRoleEnum} from "../../../../src/Contexts/Hitmen/domain/HitmanRole";

export class HitmanRoleMother {
  static create(value: string): HitmanRole {
    return new HitmanRole(value, Object.values(HitmanRoleEnum))
  }
  static random(): HitmanRole {
    const values = Object.values(HitmanRoleEnum);
    const enumKey = values[Math.floor(Math.random() * values.length)];
    return this.create(HitmanRoleEnum[enumKey]);
  }
}

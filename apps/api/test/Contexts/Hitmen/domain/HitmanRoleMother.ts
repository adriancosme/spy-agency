import { HitmanRoleEnum } from '../../../../src/Contexts/Hitmen/domain';

export class HitmanRoleMother {
  static create(value: string): HitmanRoleEnum {
    return value as HitmanRoleEnum;
  }
  static random(): HitmanRoleEnum {
    const values = Object.values(HitmanRoleEnum);
    const enumKey = values[Math.floor(Math.random() * values.length)];
    return this.create(HitmanRoleEnum[enumKey]);
  }
}

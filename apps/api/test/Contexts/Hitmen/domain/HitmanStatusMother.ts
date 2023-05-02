import { HitmanStatusEnum } from '../../../../src/Contexts/Hitmen/domain';

export class HitmanStatusMother {
  static create(value: string): HitmanStatusEnum {
    return value as HitmanStatusEnum;
  }

  static random(): HitmanStatusEnum {
    const values = Object.values(HitmanStatusEnum);
    const enumKey = values[Math.floor(Math.random() * values.length)];
    return this.create(HitmanStatusEnum[enumKey]);
  }
}

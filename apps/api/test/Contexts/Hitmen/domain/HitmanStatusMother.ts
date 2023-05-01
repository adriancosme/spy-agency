import {
  HitmanStatus,
  HitmanStatusEnum,
} from '../../../../src/Contexts/Hitmen/domain';

export class HitmanStatusMother {
  static create(value: string): HitmanStatus {
    return new HitmanStatus(value, Object.values(HitmanStatusEnum));
  }

  static random(): HitmanStatus {
    const values = Object.values(HitmanStatusEnum);
    const enumKey = values[Math.floor(Math.random() * values.length)];
    return this.create(HitmanStatusEnum[enumKey]);
  }
}

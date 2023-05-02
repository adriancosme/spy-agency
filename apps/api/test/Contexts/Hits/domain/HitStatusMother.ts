import { HitStatusEnum } from '../../../../src/Contexts/Hits/domain';

export class HitStatusMother {
  static create(value: string): HitStatusEnum {
    return value as HitStatusEnum;
  }

  static random(): HitStatusEnum {
    const values = Object.values(HitStatusEnum);
    const enumKey = values[Math.floor(Math.random() * values.length)];
    return this.create(HitStatusEnum[enumKey]);
  }
}

import { HitStatus, HitStatusEnum } from '../../../src/Hits/domain';

export class HitStatusMother {
  static create(value: string): HitStatus {
    return new HitStatus(value, Object.values(HitStatusEnum));
  }

  static random(): HitStatus {
    const values = Object.values(HitStatusEnum);
    const enumKey = values[Math.floor(Math.random() * values.length)];
    return this.create(HitStatusEnum[enumKey]);
  }
}

import { IntegerMother } from '../../Shared/domain/IntegerMother';

export class HitCreatedByMother {
  static create(value: number): number {
    return value;
  }
  static random(): number {
    return this.create(IntegerMother.random());
  }
}

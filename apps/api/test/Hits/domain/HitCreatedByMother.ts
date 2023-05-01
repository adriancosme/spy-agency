import { HitmanId } from '../../../src/Contexts/Hitmen/domain';
import { IntegerMother } from '../../../test/Shared/domain/IntegerMother';

export class HitCreatedByMother {
  static create(value: number): HitmanId {
    return new HitmanId(value);
  }
  static random(): HitmanId {
    return this.create(IntegerMother.random());
  }
}

import { HitmanId } from '../../../src/Hitmen/domain';
import { IntegerMother } from '../../../test/Shared/domain/IntegerMother';

export class HitAssigedToMother {
  static create(value: number): HitmanId {
    return new HitmanId(value);
  }

  static random(): HitmanId {
    return this.create(IntegerMother.random());
  }
}

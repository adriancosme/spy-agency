import { IntegerMother } from '../../Shared/domain/IntegerMother';
import {HitmanId} from "../../../../src/Contexts/Hitmen/domain";

export class HitmanIdMother {
  static create(value: number): HitmanId {
    return new HitmanId(value);
  }

  static random(): HitmanId {
    return this.create(IntegerMother.random());
  }
}

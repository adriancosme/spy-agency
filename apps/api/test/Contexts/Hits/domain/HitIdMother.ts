import { CuidMother } from '../../Shared/domain/CuidMother';
import { HitId } from '../../../../src/Contexts/Hits/domain';

export class HitIdMother {
  static create(value: string): HitId {
    return new HitId(value);
  }

  static creator() {
    return () => HitIdMother.random();
  }

  static random(): HitId {
    return this.create(CuidMother.random());
  }
}
import { CuidMother } from '../../../test/Shared/domain/CuidMother';
import { HitId } from '../../../src/Hits/domain';

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

import cuid2 from '@paralleldrive/cuid2';

export class CuidMother {
  static random(): string {
    return cuid2.createId();
  }
}

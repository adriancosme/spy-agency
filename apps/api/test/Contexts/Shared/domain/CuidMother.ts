import { createId } from '@paralleldrive/cuid2';

export class CuidMother {
  static random(): string {
    return createId();
  }

}

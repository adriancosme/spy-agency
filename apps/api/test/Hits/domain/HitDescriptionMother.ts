import { WordMother } from '../../../test/Shared/domain/WordMother';

export class HitDescriptionMother {
  static random() {
    return WordMother.random({ minLength: 1, maxLength: 10 });
  }
}

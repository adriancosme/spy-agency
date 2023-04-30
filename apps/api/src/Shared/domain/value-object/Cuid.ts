import { createId, isCuid } from '@paralleldrive/cuid2';
import { InvalidArgumentError } from './InvalidArgumentError';
import { ValueObject } from './ValueObject';

export class Cuid extends ValueObject<string> {
  constructor(value: string) {
    super(value);
    this.ensureIsValidCuid(value);
  }

  static random(): Cuid {
    return new Cuid(createId());
  }

  private ensureIsValidCuid(id: string): void {
    if (!isCuid(id)) {
      throw new InvalidArgumentError(
        `<${this.constructor.name}> does not allow the value <${id}>`,
      );
    }
  }
}

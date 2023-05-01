import { InvalidArgumentError } from '../../Shared/domain/value-object/InvalidArgumentError';
import { StringValueObject } from '../../Shared/domain/value-object/StringValueObject';

export class HitmanEmail extends StringValueObject {
  constructor(value: string) {
    super(value);
    this.ensureIsValidEmail(value);
  }
  private ensureIsValidEmail(value: string): void {
    if (value === null || value === undefined || value === '') {
      throw new InvalidArgumentError(`Email can not be empty`);
    }
    const emailRegex = /^[^\s@]+@[^\s@]+\.[^\s@]+$/;
    const isValid = emailRegex.test(value);
    if (!isValid) {
      throw new InvalidArgumentError(`Email <${value}> is not valid`);
    }
  }
}

import { InvalidArgumentError } from '../../Shared/domain/value-object/InvalidArgumentError';
import { StringValueObject } from '../../Shared/domain/value-object/StringValueObject';
export class HitmanPassword extends StringValueObject {
  constructor(value: string) {
    super(value);
    this.ensurePasswordIsStrong(value);
  }

  private ensurePasswordIsStrong(value: string): void {
    if (value === null || value === undefined || value === '') {
      throw new InvalidArgumentError(`Password can not be empty`);
    }
    const passwordRegex = /^(?=.*[A-Za-z])(?=.*\d)[A-Za-z\d]{8,}$/;
    const isValid = passwordRegex.test(value);
    if (!isValid)
      throw new InvalidArgumentError(
        'Password dont contain at least 8 characters, one letter and one number',
      );
  }
}

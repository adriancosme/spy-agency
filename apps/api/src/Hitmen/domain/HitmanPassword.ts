import { StringValueObject } from '../../Shared/domain/value-object/StringValueObject';
export class HitmanPassword extends StringValueObject {
  constructor(value: string) {
    super(value);
    this.ensurePasswordIsNotEmpty(value);
  }

  private ensurePasswordIsNotEmpty(value: string): void {
    if (value.trim().length === 0) {
      throw new Error('Password can not be empty');
    }
  }

  public isValidPassword(): boolean {
    return this.value.trim().length >= 8;
  }
}

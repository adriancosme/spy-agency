import { InvalidArgumentError } from '../../Shared/domain/value-object/InvalidArgumentError';
import { EnumValueObject } from '../../Shared/domain/value-object/EnumValueObject';
export enum HitmanStatusEnum {
  ACTIVE = 'ACTIVE',
  INACTIVE = 'INACTIVE',
}
export class HitmanStatus extends EnumValueObject<string> {
  static readonly ACTIVE = new HitmanStatus(
    'ACTIVE',
    Object.values(HitmanStatusEnum),
  );
  static readonly INACTIVE = new HitmanStatus(
    'INACTIVE',
    Object.values(HitmanStatusEnum),
  );

  constructor(value: string, validValues: string[]) {
    super(value, validValues);
  }

  protected throwErrorForInvalidValue(value: string): void {
    throw new InvalidArgumentError(`Invalid user status value: ${value}`);
  }
}

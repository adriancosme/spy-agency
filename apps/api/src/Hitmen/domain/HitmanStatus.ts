import { EnumValueObject } from '../../Shared/domain/value-object/EnumValueObject';
export class HitmanStatus extends EnumValueObject<string> {
  static VALID_VALUES = ['ACTIVE', 'INACTIVE'];
  static readonly ACTIVE = new HitmanStatus(
    'ACTIVE',
    HitmanStatus.VALID_VALUES,
  );
  static readonly INACTIVE = new HitmanStatus(
    'INACTIVE',
    HitmanStatus.VALID_VALUES,
  );

  constructor(value: string, validValues: string[]) {
    super(value, validValues);
  }

  protected throwErrorForInvalidValue(value: string): void {
    throw new Error(`Invalid user status value: ${value}`);
  }
}

import { InvalidArgumentError } from '../../Shared/domain/value-object/InvalidArgumentError';
import { EnumValueObject } from '../../Shared/domain/value-object/EnumValueObject';
export enum HitStatusEnum {
  NOT_ASSIGNED = 'NOT_ASSIGNED',
  ASSIGNED = 'ASSIGNED',
  FAILED = 'FAILED',
  COMPLETED = 'COMPLETED',
}
export class HitStatus extends EnumValueObject<string> {
  static readonly ASSIGNED = new HitStatus(
    'ASSIGNED',
    Object.values(HitStatusEnum),
  );
  static readonly FAILED = new HitStatus(
    'FAILED',
    Object.values(HitStatusEnum),
  );
  static readonly COMPLETED = new HitStatus(
    'COMPLETED',
    Object.values(HitStatusEnum),
  );

  constructor(value: string, validValues: string[]) {
    super(value, validValues);
  }

  protected throwErrorForInvalidValue(value: string): void {
    throw new InvalidArgumentError(`Invalid user status value: ${value}`);
  }
}

import { EnumValueObject } from '../../Shared/domain/value-object/EnumValueObject';

export class HitStatus extends EnumValueObject<string> {
  static VALID_STATUS: string[] = ['ASSIGNED', 'FAILED', 'COMPLETED'];
  static readonly ASSIGNED = new HitStatus('ASSIGNED', HitStatus.VALID_STATUS);
  static readonly FAILED = new HitStatus('FAILED', HitStatus.VALID_STATUS);
  static readonly COMPLETED = new HitStatus(
    'COMPLETED',
    HitStatus.VALID_STATUS,
  );

  constructor(value: string, validValues: string[]) {
    super(value, validValues);
  }

  protected throwErrorForInvalidValue(value: string): void {
    throw new Error(`Invalid user status value: ${value}`);
  }
}

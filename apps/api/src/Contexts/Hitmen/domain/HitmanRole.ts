import {EnumValueObject} from "../../Shared/domain/value-object/EnumValueObject";
import {InvalidArgumentError} from "../../Shared/domain/value-object/InvalidArgumentError";
export enum HitmanRoleEnum {
  HITMAN= 'HITMAN',
  MANAGER = 'MANAGER',
  BOSS = 'BOSS'
}
export class HitmanRole extends EnumValueObject<string> {
  static readonly HITMAN = new HitmanRole(HitmanRoleEnum.HITMAN, Object.values(HitmanRoleEnum))
  static readonly MANAGER = new HitmanRole(HitmanRoleEnum.MANAGER, Object.values(HitmanRoleEnum))
  static readonly BOSS = new HitmanRole(HitmanRoleEnum.BOSS, Object.values(HitmanRoleEnum))
  constructor(value: string, validValues: string[]) {
    super(value, validValues);
  }

  protected throwErrorForInvalidValue(value: string): void {
    throw new InvalidArgumentError(`Invalid role value: ${value}`);
  }
}

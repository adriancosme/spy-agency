import {
  Hitman,
  HitmanEmail,
  HitmanId,
  HitmanPassword,
  HitmanStatus,
  HitmanStatusEnum,
} from '../../../../src/Contexts/Hitmen/domain';
import { HitmanEmailMother } from './HitmanEmaiilMother';
import { HitmanIdMother } from './HitmanIdMother';
import { HitmanNameMother } from './HitmanNameMother';
import { HitmanPasswordMother } from './HitmanPasswordMother';
import { HitmanStatusMother } from './HitmanStatusMother';
import {HitmanRole, HitmanRoleEnum} from "../../../../src/Contexts/Hitmen/domain/HitmanRole";
import {HitmanRoleMother} from "./HitmanRoleMother";

export class HitmanMother {
  static create(
    id: number,
    name: string,
    email: string,
    password: string,
    status: string,
    role: string
  ): Hitman {
    return new Hitman(
      new HitmanId(id),
      name,
      new HitmanEmail(email),
      new HitmanPassword(password),
      new HitmanStatus(status, Object.values(HitmanStatusEnum)),
      new HitmanRole(role, Object.values(HitmanRoleEnum))
    );
  }

  static random(): Hitman {
    return this.create(
      HitmanIdMother.random().value,
      HitmanNameMother.random(),
      HitmanEmailMother.random().value,
      HitmanPasswordMother.random().value,
      HitmanStatusMother.random().value,
      HitmanRoleMother.random().value
    );
  }
}

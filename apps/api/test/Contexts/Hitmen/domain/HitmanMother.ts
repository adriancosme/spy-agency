import {
  Hitman,
  HitmanRoleEnum,
  HitmanStatusEnum,
} from '../../../../src/Contexts/Hitmen/domain';
import { HitmanEmailMother } from './HitmanEmailMother';
import { HitmanIdMother } from './HitmanIdMother';
import { HitmanNameMother } from './HitmanNameMother';
import { HitmanPasswordMother } from './HitmanPasswordMother';
import { HitmanStatusMother } from './HitmanStatusMother';
import { HitmanRoleMother } from './HitmanRoleMother';

export class HitmanMother {
  static create(
    id: number,
    name: string,
    email: string,
    password: string,
    status: HitmanStatusEnum,
    role: HitmanRoleEnum,
  ): Hitman {
    return new Hitman(id, name, email, password, status, role);
  }

  static random(): Hitman {
    return this.create(
      HitmanIdMother.random(),
      HitmanNameMother.random(),
      HitmanEmailMother.random(),
      HitmanPasswordMother.random(),
      HitmanStatusMother.random(),
      HitmanRoleMother.random(),
    );
  }
}

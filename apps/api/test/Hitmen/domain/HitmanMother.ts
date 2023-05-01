import {
  Hitman,
  HitmanEmail,
  HitmanId,
  HitmanPassword,
  HitmanStatus,
  HitmanStatusEnum,
} from '../../../src/Contexts/Hitmen/domain';
import { HitmanEmailMother } from './HitmanEmaiilMother';
import { HitmanIdMother } from './HitmanIdMother';
import { HitmanNameMother } from './HitmanNameMother';
import { HitmanPasswordMother } from './HitmanPasswordMother';
import { HitmanStatusMother } from './HitmanStatusMother';

export class HitmanMother {
  static create(
    id: number,
    name: string,
    email: string,
    password: string,
    status: string,
  ): Hitman {
    return new Hitman(
      new HitmanId(id),
      name,
      new HitmanEmail(email),
      new HitmanPassword(password),
      new HitmanStatus(status, Object.values(HitmanStatusEnum)),
    );
  }

  static random(): Hitman {
    return this.create(
      HitmanIdMother.random(),
      HitmanNameMother.random(),
      HitmanEmailMother.random(),
      HitmanPasswordMother.random(),
      HitmanStatusMother.random().value,
    );
  }
}

import { AggregateRoot } from '../../Shared/domain/AggregateRoot';
import { HitmanEmail } from './HitmanEmail';
import { HitmanId } from './HitmanId';
import { HitmanPassword } from './HitmanPassword';
import { HitmanStatus, HitmanStatusEnum } from './HitmanStatus';
import {HitmanRole, HitmanRoleEnum} from "./HitmanRole";

export class Hitman extends AggregateRoot {
  readonly id: HitmanId;
  readonly name: string;
  readonly email: HitmanEmail;
  readonly password: HitmanPassword;
  readonly status: HitmanStatus;
  readonly role: HitmanRole;

  constructor(
    id: HitmanId,
    name: string,
    email: HitmanEmail,
    password: HitmanPassword,
    status: HitmanStatus,
    role: HitmanRole
  ) {
    super();
    this.id = id;
    this.name = name;
    this.email = email;
    this.password = password;
    this.status = status;
    this.role = role;
  }

  static create(
    id: number,
    name: string,
    email: string,
    password: string,
    status: string,
    role: string,
  ) {
    return new Hitman(
      new HitmanId(id),
      name,
      new HitmanEmail(email),
      new HitmanPassword(password),
      new HitmanStatus(status, Object.values(HitmanStatusEnum)),
      new HitmanRole(role, Object.values(HitmanStatusEnum))
    );
  }

  static fromPrimitives(plainData: {
    id: number;
    name: string;
    email: string;
    password: string;
    status: string;
    role: string;
  }): Hitman {
    return new Hitman(
      new HitmanId(plainData.id),
      plainData.name,
      new HitmanEmail(plainData.email),
      new HitmanPassword(plainData.password),
      new HitmanStatus(plainData.status, Object.values(HitmanStatusEnum)),
      new HitmanRole(plainData.role, Object.values(HitmanRoleEnum))
    );
  }

  toPrimitives() {
    return {
      id: this.id.value,
      name: this.name,
      email: this.email.value,
      password: this.password.value,
      status: this.status.value,
      role: this.role.value
    };
  }

  isRetired() {
    return this.status.value === HitmanStatus.INACTIVE.value;
  }
}

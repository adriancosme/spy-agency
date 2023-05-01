import { AggregateRoot } from '../../Shared/domain/AggregateRoot';
import { HitmanEmail } from './HitmanEmail';
import { HitmanId } from './HitmanId';
import { HitmanPassword } from './HitmanPassword';
import { HitmanStatus, HitmanStatusEnum } from './HitmanStatus';

export class Hitman extends AggregateRoot {
  readonly id: HitmanId;
  readonly name: string;
  readonly email: HitmanEmail;
  readonly password: HitmanPassword;
  readonly status: HitmanStatus;

  constructor(
    id: HitmanId,
    name: string,
    email: HitmanEmail,
    password: HitmanPassword,
    status: HitmanStatus,
  ) {
    super();
    this.id = id;
    this.name = name;
    this.email = email;
    this.password = password;
    this.status = status;
  }

  static create(
    id: number,
    name: string,
    email: string,
    password: string,
    status: string,
  ) {
    const user = new Hitman(
      new HitmanId(id),
      name,
      new HitmanEmail(email),
      new HitmanPassword(password),
      new HitmanStatus(status, Object.values(HitmanStatusEnum)),
    );
    return user;
  }

  static fromPrimitives(plainData: {
    id: number;
    name: string;
    email: string;
    password: string;
    status: string;
  }): Hitman {
    return new Hitman(
      new HitmanId(plainData.id),
      plainData.name,
      new HitmanEmail(plainData.email),
      new HitmanPassword(plainData.password),
      new HitmanStatus(plainData.status, ['ACTIVE', 'INACTIVE']),
    );
  }

  toPrimitives() {
    return {
      id: this.id.value,
      name: this.name,
      email: this.email.value,
      password: this.password.value,
      status: this.status.value,
    };
  }

  isRetired() {
    return this.status.value === HitmanStatus.INACTIVE.value;
  }
}

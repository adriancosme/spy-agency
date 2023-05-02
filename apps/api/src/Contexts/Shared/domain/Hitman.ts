import { HitmanStatusEnum, HitmanRoleEnum } from '../../Hitmen/domain';
import { Hit } from '../../Hits/domain';

export class Hitman {
  readonly id: number;
  readonly name: string;
  readonly email: string;
  readonly password: string;
  readonly status: HitmanStatusEnum;
  readonly role: HitmanRoleEnum;
  readonly hits: Hit[];
  readonly managedBy: Hitman;
  readonly managedHitmen: Hitman[];
  readonly createdHits: Hit[];

  constructor(
    id: number,
    name: string,
    email: string,
    password: string,
    status: HitmanStatusEnum,
    role: HitmanRoleEnum,
  ) {
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
    status: HitmanStatusEnum,
    role: HitmanRoleEnum,
  ) {
    return new Hitman(id, name, email, password, status, role);
  }
}

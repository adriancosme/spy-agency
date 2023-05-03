import { Hitman } from '../../../../../Hitmen/Infrastructure/persistence/typeorm/Hitman.entity';
import * as faker from 'faker';
import { HitmanRoleEnum, HitmanStatusEnum } from '../../../../../Hitmen/domain';
import { hashSync } from 'bcrypt';

const hashPass = hashSync('secure123Password', 10);
export const data: Hitman[] = [
  {
    id: 2,
    name: faker.name.findName(),
    email: faker.internet.email(),
    password: hashPass,
    role: HitmanRoleEnum.MANAGER,
    status: HitmanStatusEnum.ACTIVE,
  } as Hitman,
  {
    id: 3,
    name: faker.name.findName(),
    email: faker.internet.email(),
    password: hashPass,
    role: HitmanRoleEnum.MANAGER,
    status: HitmanStatusEnum.ACTIVE,
  } as Hitman,
  {
    id: 4,
    name: faker.name.findName(),
    email: faker.internet.email(),
    password: hashPass,
    role: HitmanRoleEnum.MANAGER,
    status: HitmanStatusEnum.ACTIVE,
  } as Hitman,
];

import { Hitman } from '../../../../../Hitmen/Infrastructure/persistence/typeorm/Hitman.entity';
import * as faker from 'faker';
import { HitmanRoleEnum, HitmanStatusEnum } from '../../../../../Hitmen/domain';
import { hashSync } from 'bcrypt';

const hashPass = hashSync('secure123Password', 10);
export const data: Hitman[] = [
  {
    id: 5,
    name: faker.name.findName(),
    email: faker.internet.email(),
    password: hashPass,
    role: HitmanRoleEnum.HITMAN,
    status: HitmanStatusEnum.ACTIVE,
    managedBy: {
      id: faker.datatype.number({ min: 2, max: 4 }),
    } as Hitman,
  } as Hitman,
  {
    id: 6,
    name: faker.name.findName(),
    email: faker.internet.email(),
    password: hashPass,
    role: HitmanRoleEnum.HITMAN,
    status: HitmanStatusEnum.ACTIVE,
    managedBy: {
      id: faker.datatype.number({ min: 2, max: 4 }),
    } as Hitman,
  } as Hitman,
  {
    id: 7,
    name: faker.name.findName(),
    email: faker.internet.email(),
    password: hashPass,
    role: HitmanRoleEnum.HITMAN,
    status: HitmanStatusEnum.ACTIVE,
    managedBy: {
      id: faker.datatype.number({ min: 2, max: 4 }),
    } as Hitman,
  } as Hitman,
  {
    id: 8,
    name: faker.name.findName(),
    email: faker.internet.email(),
    password: hashPass,
    role: HitmanRoleEnum.HITMAN,
    status: HitmanStatusEnum.ACTIVE,
    managedBy: {
      id: faker.datatype.number({ min: 2, max: 4 }),
    } as Hitman,
  } as Hitman,
  {
    id: 9,
    name: faker.name.findName(),
    email: faker.internet.email(),
    password: hashPass,
    role: HitmanRoleEnum.HITMAN,
    status: HitmanStatusEnum.ACTIVE,
    managedBy: {
      id: faker.datatype.number({ min: 2, max: 4 }),
    } as Hitman,
  } as Hitman,
  {
    id: 10,
    name: faker.name.findName(),
    email: faker.internet.email(),
    password: hashPass,
    role: HitmanRoleEnum.HITMAN,
    status: HitmanStatusEnum.ACTIVE,
    managedBy: {
      id: faker.datatype.number({ min: 2, max: 4 }),
    } as Hitman,
  } as Hitman,
  {
    id: 11,
    name: faker.name.findName(),
    email: faker.internet.email(),
    password: hashPass,
    role: HitmanRoleEnum.HITMAN,
    status: HitmanStatusEnum.ACTIVE,
    managedBy: {
      id: faker.datatype.number({ min: 2, max: 4 }),
    } as Hitman,
  } as Hitman,
  {
    id: 12,
    name: faker.name.findName(),
    email: faker.internet.email(),
    password: hashPass,
    role: HitmanRoleEnum.HITMAN,
    status: HitmanStatusEnum.ACTIVE,
    managedBy: {
      id: faker.datatype.number({ min: 2, max: 4 }),
    } as Hitman,
  } as Hitman,
  {
    id: 13,
    name: faker.name.findName(),
    email: faker.internet.email(),
    password: hashPass,
    role: HitmanRoleEnum.HITMAN,
    status: HitmanStatusEnum.ACTIVE,
    managedBy: {
      id: faker.datatype.number({ min: 2, max: 4 }),
    } as Hitman,
  } as Hitman,
];

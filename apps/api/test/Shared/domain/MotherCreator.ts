import * as Faker from 'faker';

export class MotherCreator {
  static random(): Faker.FakerStatic {
    return Faker;
  }
}

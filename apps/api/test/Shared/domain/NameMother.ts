import { MotherCreator } from './MotherCreator';

export class NameMother {
  static random(): string {
    return MotherCreator.random().name.findName();
  }
}

import { MotherCreator } from '../../Shared/domain/MotherCreator';

export class HitmanPasswordMother {
  static random(): string {
    return MotherCreator.random().internet.password();
  }
}

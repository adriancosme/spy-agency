import { MotherCreator } from '../../../test/Shared/domain/MotherCreator';

export class HitmanNameMother {
  static random() {
    return MotherCreator.random().name.findName();
  }
}

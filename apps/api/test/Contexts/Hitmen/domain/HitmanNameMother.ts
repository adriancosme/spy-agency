import { MotherCreator } from '../../Shared/domain/MotherCreator';

export class HitmanNameMother {
  static random() {
    return MotherCreator.random().name.findName();
  }
}

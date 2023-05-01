import { MotherCreator } from '../../../test/Shared/domain/MotherCreator';

export class HitmanEmailMother {
  static random(): string {
    return MotherCreator.random().internet.email();
  }
}

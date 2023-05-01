import { MotherCreator } from '../../Shared/domain/MotherCreator';

export class HitmanEmailMother {
  static random(): string {
    return MotherCreator.random().internet.email();
  }
}

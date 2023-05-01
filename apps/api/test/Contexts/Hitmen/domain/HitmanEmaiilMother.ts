import { MotherCreator } from '../../Shared/domain/MotherCreator';
import {HitmanEmail} from "../../../../src/Contexts/Hitmen/domain";

export class HitmanEmailMother {
  static random(): HitmanEmail {
    return new HitmanEmail(MotherCreator.random().internet.email());
  }
}

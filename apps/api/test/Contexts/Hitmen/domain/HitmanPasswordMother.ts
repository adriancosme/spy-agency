import { MotherCreator } from '../../Shared/domain/MotherCreator';
import {HitmanPassword} from "../../../../src/Contexts/Hitmen/domain";

export class HitmanPasswordMother {
  static random(): HitmanPassword {
    return new HitmanPassword(MotherCreator.random().internet.password());
  }
}

import { AuthPassword } from '../../../src/Contexts/Auth/domain/AuthPassword';
import { MotherCreator } from '../../Shared/domain/MotherCreator';

export class AuthPasswordMother {
  static create(value?: string): AuthPassword {
    return new AuthPassword(
      value || MotherCreator.random().internet.password(),
    );
  }
}

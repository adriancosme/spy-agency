import { AuthPassword } from '../../../src/Auth/domain/AuthPassword';
import { MotherCreator } from '../../../test/Shared/domain/MotherCreator';

export class AuthPasswordMother {
  static create(value?: string): AuthPassword {
    return new AuthPassword(
      value || MotherCreator.random().internet.password(),
    );
  }
}

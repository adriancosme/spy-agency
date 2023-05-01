import { AuthEmail } from '../../../../src/Contexts/Auth/domain/AuthEmail';
import { MotherCreator } from '../../Shared/domain/MotherCreator';

export class AuthEmailMother {
  static create(email?: string) {
    return new AuthEmail(email || MotherCreator.random().internet.email());
  }
}

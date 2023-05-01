import { AuthEmail } from '../../../src/Auth/domain/AuthEmail';
import { MotherCreator } from '../../../test/Shared/domain/MotherCreator';

export class AuthEmailMother {
  static create(email?: string) {
    return new AuthEmail(email || MotherCreator.random().internet.email());
  }
}
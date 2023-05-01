import { AuthUser } from '../../../src/Contexts/Auth/domain/AuthUser';
import { AuthEmail } from '../../../src/Contexts/Auth/domain/AuthEmail';
import { AuthPassword } from '../../../src/Contexts/Auth/domain/AuthPassword';
import { AuthPasswordMother } from './AuthPasswordMother';
import { AuthEmailMother } from './AuthEmailMother';

export class AuthUserMother {
  static create(email?: AuthEmail, password?: AuthPassword) {
    return new AuthUser(
      email || AuthEmailMother.create(),
      password || AuthPasswordMother.create(),
    );
  }
}

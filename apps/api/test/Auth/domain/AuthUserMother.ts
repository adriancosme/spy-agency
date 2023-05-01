import { AuthUser } from '../../../src/Auth/domain/AuthUser';
import { AuthEmail } from '../../../src/Auth/domain/AuthEmail';
import { AuthPassword } from '../../../src/Auth/domain/AuthPassword';
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

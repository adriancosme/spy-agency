import { AggregateRoot } from '../../../src/Shared/domain/AggregateRoot';
import { AuthEmail } from './AuthEmail';
import { AuthPassword } from './AuthPassword';

export class AuthUser extends AggregateRoot {
  readonly email: AuthEmail;
  readonly password: AuthPassword;
  constructor(authEmail: AuthEmail, authPassword: AuthPassword) {
    super();
    this.email = authEmail;
    this.password = authPassword;
  }

  static create(email: string, password: string) {
    return new AuthUser(new AuthEmail(email), new AuthPassword(password));
  }

  toPrimitives() {
    return {
      email: this.email.value,
      password: this.password.value,
    };
  }
}

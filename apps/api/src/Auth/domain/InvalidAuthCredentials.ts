import { AuthEmail } from './AuthEmail';

export class InvalidAuthCredentials extends Error {
  constructor(email: AuthEmail) {
    super(`The credentials for ${email.value} are invalid`);
  }
}

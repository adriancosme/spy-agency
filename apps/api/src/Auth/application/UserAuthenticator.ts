import { CryptoServiceRepository } from 'src/Shared/domain/CryptoServiceRepository';
import { AuthEmail } from '../domain/AuthEmail';
import { AuthPassword } from '../domain/AuthPassword';
import { AuthRepository } from '../domain/AuthRepository';
import { AuthUser } from '../domain/AuthUser';
import { InvalidAuthCredentials } from '../domain/InvalidAuthCredentials';

export class UserAuthenticator {
  constructor(
    private readonly authRepository: AuthRepository,
    private readonly hasher: CryptoServiceRepository,
  ) {}

  async authenticate(email: AuthEmail, password: AuthPassword): Promise<void> {
    const auth = await this.authRepository.search(email);
    this.ensureUserExist(auth, email);
    await this.ensureCredentialsAreValid(auth, password);
  }

  private ensureUserExist(user: AuthUser, email: AuthEmail) {
    if (user == null) {
      throw new InvalidAuthCredentials(email);
    }
  }

  private async ensureCredentialsAreValid(
    user: AuthUser,
    password: AuthPassword,
  ): Promise<void> {
    const isValid = await this.hasher.comparePassword(
      password.value,
      user.password.value,
    );
    if (!isValid) {
      throw new InvalidAuthCredentials(user.email);
    }
  }
}

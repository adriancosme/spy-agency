import { CryptoServiceRepository } from '../../Shared/domain/CryptoServiceRepository';
import { AuthRepository } from '../domain/AuthRepository';
import { InvalidAuthCredentials } from '../domain/InvalidAuthCredentials';
import { Hitman } from '../../Hitmen/domain';
import { Token } from '../domain/Token';
import { UserAuth } from '../domain/UserAuth';
import { AuthServiceContract } from '../infrastructure/interfaces/AuthServiceContract';

export class UserAuthenticator {
  constructor(
    private readonly authRepository: AuthRepository,
    private readonly hasher: CryptoServiceRepository,
    private readonly authService: AuthServiceContract,
  ) {}

  async authenticate(email: string, password: string): Promise<Token> {
    const auth = await this.authRepository.search(email);
    this.ensureUserExist(auth, email);
    await this.ensureCredentialsAreValid(auth, password);
    return this.authService.login(auth as unknown as UserAuth);
  }

  private ensureUserExist(user: Hitman | null, email: string) {
    if (user == null) {
      throw new InvalidAuthCredentials(email);
    }
  }

  private async ensureCredentialsAreValid(
    user: Hitman | null,
    password: string,
  ): Promise<void> {
    if (user == null) {
      throw new Error('Invalid credentials');
    }
    const isValid = await this.hasher.comparePassword(password, user.password);
    if (!isValid) {
      throw new InvalidAuthCredentials(user?.email);
    }
  }
}

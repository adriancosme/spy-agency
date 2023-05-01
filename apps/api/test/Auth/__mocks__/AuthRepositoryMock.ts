import { AuthEmail } from '../../../src/Contexts/Auth/domain/AuthEmail';
import { AuthRepository } from '../../../src/Contexts/Auth/domain/AuthRepository';
import { AuthUser } from '../../../src/Contexts/Auth/domain/AuthUser';

export class AuthRepositoryMock implements AuthRepository {
  private searchMock = jest.fn();
  private searchUser: AuthUser;

  returnSearchUser(user: AuthUser) {
    this.searchUser = user;
  }

  async search(email: AuthEmail): Promise<AuthUser> {
    this.searchMock(email);
    return this.searchUser;
  }

  assertSearchCalledWith(email: AuthEmail) {
    expect(this.searchMock).toHaveBeenCalledWith(email);
  }
}

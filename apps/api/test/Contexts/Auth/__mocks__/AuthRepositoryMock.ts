import { AuthRepository } from '../../../../src/Contexts/Auth/domain/AuthRepository';
import { Hitman } from '../../../../src/Contexts/Shared/domain/Hitman';

export class AuthRepositoryMock implements AuthRepository {
  private searchMock = jest.fn();
  private searchUser: Hitman;

  returnSearchUser(user: Hitman) {
    this.searchUser = user;
  }

  async search(email: string): Promise<Hitman> {
    this.searchMock(email);
    return this.searchUser;
  }

  assertSearchCalledWith(email: string) {
    expect(this.searchMock).toHaveBeenCalledWith(email);
  }
}

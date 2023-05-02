import { UserAuth } from '../../../../src/Contexts/Auth/domain/UserAuth';
import { AuthServiceContract } from "../../../../src/Contexts/Auth/infrastructure/interfaces/AuthServiceContract";

export class AuthServiceMock implements AuthServiceContract{
  validateUser = jest
    .fn()
    .mockImplementation((userEmail: string, userPassword: string) => {
      const user = { id: 1, email: 'test@test.com', password: 'password' };
      if (userEmail === user.email && userPassword === user.password) {
        return user;
      }
      return null;
    });

  login = jest.fn().mockImplementation((user: UserAuth) => {
    const payload = { email: user.email, id: user.id };
    return {
      accessToken: 'access_token',
    };
  });
}

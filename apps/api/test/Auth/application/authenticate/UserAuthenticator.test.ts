import { CryptoService } from '../../../../src/Shared/infrastructure/crypto.service';
import { UserAuthenticator } from '../../../../src/Auth/application/UserAuthenticator';
import { AuthRepositoryMock } from '../../__mocks__/AuthRepositoryMock';
import { AuthUser } from '../../../../src/Auth/domain/AuthUser';
import { AuthPasswordMother } from '../../../../test/Auth/domain/AuthPasswordMother';
import { AuthEmailMother } from '../../../../test/Auth/domain/AuthEmailMother';
import { AuthUserMother } from '../../../../test/Auth/domain/AuthUserMother';

describe('UserAuthenticator', () => {
  let repository: AuthRepositoryMock;
  let crytoService: CryptoService;
  beforeEach(() => {
    repository = new AuthRepositoryMock();
    crytoService = new CryptoService();
  });
  it('should authenticate a valid user', async () => {
    const plainPassword = AuthPasswordMother.create().value;
    const hashedPassword = await crytoService.hashPassword(plainPassword);
    const userPasswordHashed = new AuthUser(
      AuthEmailMother.create(),
      AuthPasswordMother.create(hashedPassword),
    );

    const userPlainPassword = new AuthUser(
      userPasswordHashed.email,
      AuthPasswordMother.create(plainPassword),
    );

    repository.returnSearchUser(userPasswordHashed);
    const authenticator = new UserAuthenticator(repository, crytoService);
    await authenticator.authenticate(
      userPlainPassword.email,
      userPlainPassword.password,
    );
    repository.assertSearchCalledWith(userPasswordHashed.email);
  });
  it('should throw an exception if the user does not exist', async () => {
    const user = AuthUserMother.create();
    const authenticator = new UserAuthenticator(repository, crytoService);
    await expect(
      authenticator.authenticate(user.email, user.password),
    ).rejects.toThrow();
  });
  it('should throw an exception if the credentials are invalid', async () => {
    const plainPassword = AuthPasswordMother.create().value;
    const hashedPassword = await crytoService.hashPassword(plainPassword);
    const userPasswordHashed = new AuthUser(
      AuthEmailMother.create(),
      AuthPasswordMother.create(hashedPassword),
    );

    const userPlainPassword = new AuthUser(
      userPasswordHashed.email,
      AuthPasswordMother.create(),
    );

    repository.returnSearchUser(userPasswordHashed);
    const authenticator = new UserAuthenticator(repository, crytoService);
    await expect(
      authenticator.authenticate(
        userPlainPassword.email,
        userPlainPassword.password,
      ),
    ).rejects.toThrow();
  });
});
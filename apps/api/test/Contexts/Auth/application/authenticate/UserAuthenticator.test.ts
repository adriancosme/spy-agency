import { CryptoService } from '../../../../../src/Contexts/Shared/infrastructure/crypto.service';
import { UserAuthenticator } from '../../../../../src/Contexts/Auth/application/UserAuthenticator';
import { AuthRepositoryMock } from '../../__mocks__/AuthRepositoryMock';
import { Hitman } from '../../../../../src/Contexts/Shared/domain/Hitman';
import { HitmanEmailMother } from '../../../Hitmen/domain/HitmanEmailMother';
import { HitmanPasswordMother } from '../../../Hitmen/domain/HitmanPasswordMother';
import { HitmanIdMother } from '../../../Hitmen/domain/HitmanIdMother';
import { HitmanNameMother } from '../../../Hitmen/domain/HitmanNameMother';
import { HitmanStatusMother } from '../../../Hitmen/domain/HitmanStatusMother';
import { HitmanRoleMother } from '../../../Hitmen/domain/HitmanRoleMother';
import { HitmanMother } from '../../../Hitmen/domain/HitmanMother';
import { AuthServiceMock } from "../../__mocks__/AuthServiceMock";

describe('UserAuthenticator', () => {
  let repository: AuthRepositoryMock;
  let cryptoService: CryptoService;
  let authService: AuthServiceMock;
  beforeEach(() => {
    repository = new AuthRepositoryMock();
    cryptoService = new CryptoService();
    authService = new AuthServiceMock();
  });
  it('should authenticate a valid user', async () => {
    const plainPassword = HitmanPasswordMother.create();
    const hashedPassword = await cryptoService.hashPassword(plainPassword);
    const userPasswordHashed = new Hitman(
      HitmanIdMother.random(),
      HitmanNameMother.random(),
      HitmanEmailMother.random(),
      HitmanPasswordMother.create(hashedPassword),
      HitmanStatusMother.random(),
      HitmanRoleMother.random(),
    );

    const userPlainPassword = new Hitman(
      userPasswordHashed.id,
      userPasswordHashed.name,
      userPasswordHashed.email,
      HitmanPasswordMother.create(plainPassword),
      userPasswordHashed.status,
      userPasswordHashed.role,
    );

    repository.returnSearchUser(userPasswordHashed);
    const authenticator = new UserAuthenticator(
      repository,
      cryptoService,
      authService,
    );
    await authenticator.authenticate(
      userPlainPassword.email,
      userPlainPassword.password,
    );
    repository.assertSearchCalledWith(userPasswordHashed.email);
  });
  it('should throw an exception if the user does not exist', async () => {
    const user = HitmanMother.random();
    const authenticator = new UserAuthenticator(
      repository,
      cryptoService,
      authService,
    );
    await expect(
      authenticator.authenticate(user.email, user.password),
    ).rejects.toThrow();
  });
  it('should throw an exception if the credentials are invalid', async () => {
    const plainPassword = HitmanPasswordMother.create();
    const hashedPassword = await cryptoService.hashPassword(plainPassword);
    const userPasswordHashed = new Hitman(
      HitmanIdMother.random(),
      HitmanNameMother.random(),
      HitmanEmailMother.random(),
      HitmanPasswordMother.create(hashedPassword),
      HitmanStatusMother.random(),
      HitmanRoleMother.random(),
    );

    const userPlainPassword = new Hitman(
      userPasswordHashed.id,
      userPasswordHashed.name,
      userPasswordHashed.email,
      HitmanPasswordMother.create(),
      userPasswordHashed.status,
      userPasswordHashed.role,
    );

    repository.returnSearchUser(userPasswordHashed);
    const authenticator = new UserAuthenticator(
      repository,
      cryptoService,
      authService,
    );
    await expect(
      authenticator.authenticate(
        userPlainPassword.email,
        userPlainPassword.password,
      ),
    ).rejects.toThrow();
  });
});

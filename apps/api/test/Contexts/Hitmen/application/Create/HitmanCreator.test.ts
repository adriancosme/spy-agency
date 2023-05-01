import { HitmanCreator } from '../../../../../src/Contexts/Hitmen/application/Create/HitmanCreator';
import {
  Hitman,
  HitmanEmail,
  HitmanId,
  HitmanPassword,
  HitmanStatus,
} from '../../../../../src/Contexts/Hitmen/domain';
import { CryptoService } from '../../../../../src/Contexts/Shared/infrastructure/crypto.service';
import { HitmanRepositoryMock } from '../../__mocks__/HitmanRepositoryMock';
import {HitmanRoleMother} from "../../domain/HitmanRoleMother";

describe('HitmanCreator', () => {
  const invalidEmail = 'fake@email';
  const validEmail = 'fake@email.com';
  const validPassword = 'az2SFxgh3asXG1';
  const invalidPassword = '123456';
  it('should create a hitman', async () => {
    try {
      const hitman = new Hitman(
        new HitmanId(1),
        'John Doe',
        new HitmanEmail(validEmail),
        new HitmanPassword(validPassword),
        HitmanStatus.ACTIVE,
        HitmanRoleMother.random()
      );

      const repository = new HitmanRepositoryMock();
      const crypto = new CryptoService();
      const creator = new HitmanCreator(repository, crypto);
      await creator.run(
        hitman.id.value,
        hitman.name,
        hitman.email.value,
        hitman.password.value,
        hitman.status.value,
        hitman.role.value
      );
      repository.assertSaveHaveBeenCalledWith(hitman);
    } catch (error) {
      expect(error).toHaveProperty('message');
    }
  });
  it('should throw an error if the email is invalid', async () => {
    try {
      const hitman = new Hitman(
        new HitmanId(1),
        'John Doe',
        new HitmanEmail(invalidEmail),
        new HitmanPassword(validPassword),
        HitmanStatus.ACTIVE,
        HitmanRoleMother.random()
      );

      const repository = new HitmanRepositoryMock();
      const crypto = new CryptoService();
      const creator = new HitmanCreator(repository, crypto);
      await creator.run(
        hitman.id.value,
        hitman.name,
        hitman.email.value,
        hitman.password.value,
        hitman.status.value,
        hitman.role.value
      );
      expect(true).toBeFalsy();
    } catch (error) {
      expect(error).toHaveProperty(
        'message',
        `Email <${invalidEmail}> is not valid`,
      );
    }
  });
  it('should throw an error if the email is empty', async () => {
    try {
      const hitman = new Hitman(
        new HitmanId(1),
        'John Doe',
        new HitmanEmail(''),
        new HitmanPassword(validPassword),
        HitmanStatus.ACTIVE,
        HitmanRoleMother.random()
      );

      const repository = new HitmanRepositoryMock();
      const crypto = new CryptoService();
      const creator = new HitmanCreator(repository, crypto);
      await creator.run(
        hitman.id.value,
        hitman.name,
        hitman.email.value,
        hitman.password.value,
        hitman.status.value,
        hitman.role.value
      );
      expect(true).toBeFalsy();
    } catch (error) {
      expect(error).toHaveProperty('message', 'Email can not be empty');
    }
  });
  it('should throw an error if the password is empty', async () => {
    try {
      const hitman = new Hitman(
        new HitmanId(1),
        'John Doe',
        new HitmanEmail(validEmail),
        new HitmanPassword(''),
        HitmanStatus.ACTIVE,
        HitmanRoleMother.random()
      );
      const repository = new HitmanRepositoryMock();
      const crypto = new CryptoService();
      const creator = new HitmanCreator(repository, crypto);
      await creator.run(
        hitman.id.value,
        hitman.name,
        hitman.email.value,
        hitman.password.value,
        hitman.status.value,
        hitman.role.value
      );
      expect(true).toBeFalsy();
    } catch (error) {
      expect(error).toHaveProperty('message', 'Password can not be empty');
    }
  });
  it('should throw an error if the password is invalid', async () => {
    try {
      const hitman = new Hitman(
        new HitmanId(1),
        'John Doe',
        new HitmanEmail(validEmail),
        new HitmanPassword(invalidPassword),
        HitmanStatus.ACTIVE,
        HitmanRoleMother.random()
      );
      const repository = new HitmanRepositoryMock();
      const crypto = new CryptoService();
      const creator = new HitmanCreator(repository, crypto);
      await creator.run(
        hitman.id.value,
        hitman.name,
        hitman.email.value,
        hitman.password.value,
        hitman.status.value,
        hitman.role.value
      );
      expect(true).toBeFalsy();
    } catch (error) {
      expect(error).toHaveProperty(
        'message',
        'Password dont contain at least 8 characters',
      );
    }
  });
});

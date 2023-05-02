import { HitmanCreator } from '../../../../../src/Contexts/Hitmen/application/Create/HitmanCreator';
import { Hitman } from '../../../../../src/Contexts/Hitmen/domain';
import { CryptoService } from '../../../../../src/Contexts/Shared/infrastructure/crypto.service';
import { HitmanRepositoryMock } from '../../__mocks__/HitmanRepositoryMock';
import { HitmanRoleMother } from '../../domain/HitmanRoleMother';
import { HitmanMother } from '../../domain/HitmanMother';
import { HitmanIdMother } from '../../domain/HitmanIdMother';
import { HitmanNameMother } from '../../domain/HitmanNameMother';
import { HitmanPasswordMother } from '../../domain/HitmanPasswordMother';
import { HitmanStatusMother } from '../../domain/HitmanStatusMother';
import { HitmanEmailMother } from '../../domain/HitmanEmailMother';

describe('HitmanCreator', () => {
  const invalidEmail = 'fake@email';
  it('should create a hitman', async () => {
    try {
      const hitman = HitmanMother.random();

      const repository = new HitmanRepositoryMock();
      const crypto = new CryptoService();
      const creator = new HitmanCreator(repository, crypto);
      await creator.run(
        hitman.id,
        hitman.name,
        hitman.email,
        hitman.password,
        hitman.status,
        hitman.role,
      );
      repository.assertSaveHaveBeenCalledWith(hitman);
    } catch (error) {
      expect(error).toHaveProperty('message');
    }
  });
  it('should throw an error if the email is invalid', async () => {
    try {
      const hitman = new Hitman(
        HitmanIdMother.random(),
        HitmanNameMother.random(),
        invalidEmail,
        HitmanPasswordMother.random(),
        HitmanStatusMother.random(),
        HitmanRoleMother.random(),
      );

      const repository = new HitmanRepositoryMock();
      const crypto = new CryptoService();
      const creator = new HitmanCreator(repository, crypto);
      await creator.run(
        hitman.id,
        hitman.name,
        hitman.email,
        hitman.password,
        hitman.status,
        hitman.role,
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
        HitmanIdMother.random(),
        HitmanNameMother.random(),
        '',
        HitmanPasswordMother.random(),
        HitmanStatusMother.random(),
        HitmanRoleMother.random(),
      );

      const repository = new HitmanRepositoryMock();
      const crypto = new CryptoService();
      const creator = new HitmanCreator(repository, crypto);
      await creator.run(
        hitman.id,
        hitman.name,
        hitman.email,
        hitman.password,
        hitman.status,
        hitman.role,
      );
      expect(true).toBeFalsy();
    } catch (error) {
      expect(error).toHaveProperty('message', 'Email can not be empty');
    }
  });
  it('should throw an error if the password is empty', async () => {
    try {
      const hitman = new Hitman(
        HitmanIdMother.random(),
        HitmanNameMother.random(),
        HitmanEmailMother.random(),
        '',
        HitmanStatusMother.random(),
        HitmanRoleMother.random(),
      );
      const repository = new HitmanRepositoryMock();
      const crypto = new CryptoService();
      const creator = new HitmanCreator(repository, crypto);
      await creator.run(
        hitman.id,
        hitman.name,
        hitman.email,
        hitman.password,
        hitman.status,
        hitman.role,
      );
      expect(true).toBeFalsy();
    } catch (error) {
      expect(error).toHaveProperty('message', 'Password can not be empty');
    }
  });
  it('should throw an error if the password is invalid', async () => {
    try {
      const hitman = new Hitman(
        HitmanIdMother.random(),
        HitmanNameMother.random(),
        HitmanEmailMother.random(),
        '123456',
        HitmanStatusMother.random(),
        HitmanRoleMother.random(),
      );
      const repository = new HitmanRepositoryMock();
      const crypto = new CryptoService();
      const creator = new HitmanCreator(repository, crypto);
      await creator.run(
        hitman.id,
        hitman.name,
        hitman.email,
        hitman.password,
        hitman.status,
        hitman.role,
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

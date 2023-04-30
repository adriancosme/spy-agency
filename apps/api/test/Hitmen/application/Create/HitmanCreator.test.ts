import { HitmanCreator } from '../../../../src/Hitmen/application/Create/HitmanCreator';
import { Hitman } from '../../../../src/Hitmen/domain/Hitman';
import { HitmanEmail } from '../../../../src/Hitmen/domain/HitmanEmail';
import { HitmanId } from '../../../../src/Hitmen/domain/HitmanId';
import { HitmanPassword } from '../../../../src/Hitmen/domain/HitmanPassword';
import { HitmanStatus } from '../../../../src/Hitmen/domain/HitmanStatus';
import { HitmanRepositoryMock } from '../../__mocks__/HitmanRepositoryMock';

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
      );

      const repository = new HitmanRepositoryMock();
      const creator = new HitmanCreator(repository);
      await creator.run(
        hitman.id.value,
        hitman.name,
        hitman.email.value,
        hitman.password.value,
        hitman.status.value,
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
      );

      const repository = new HitmanRepositoryMock();
      const creator = new HitmanCreator(repository);
      await creator.run(
        hitman.id.value,
        hitman.name,
        hitman.email.value,
        hitman.password.value,
        hitman.status.value,
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
      );

      const repository = new HitmanRepositoryMock();
      const creator = new HitmanCreator(repository);
      await creator.run(
        hitman.id.value,
        hitman.name,
        hitman.email.value,
        hitman.password.value,
        hitman.status.value,
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
      );
      const repository = new HitmanRepositoryMock();
      const creator = new HitmanCreator(repository);
      await creator.run(
        hitman.id.value,
        hitman.name,
        hitman.email.value,
        hitman.password.value,
        hitman.status.value,
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
      );
      const repository = new HitmanRepositoryMock();
      const creator = new HitmanCreator(repository);
      await creator.run(
        hitman.id.value,
        hitman.name,
        hitman.email.value,
        hitman.password.value,
        hitman.status.value,
      );
      expect(true).toBeFalsy();
    } catch (error) {
      expect(error).toHaveProperty(
        'message',
        'Password dont contain at least 8 characters, one letter and one number',
      );
    }
  });
});

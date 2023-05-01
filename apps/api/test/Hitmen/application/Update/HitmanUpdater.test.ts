import { HitmanUpdater } from '../../../../src/Contexts/Hitmen/application/Update/HitmanUpdater';
import {
  Hitman,
  HitmanEmail,
  HitmanId,
  HitmanPassword,
  HitmanStatusEnum,
  HitmanStatus,
} from '../../../../src/Contexts/Hitmen/domain';
import { HitmanRepositoryMock } from '../../__mocks__/HitmanRepositoryMock';

describe('HitmanUpdater', () => {
  const invalidEmail = 'fake@email';
  const validEmail = 'fake@email.com';
  const validPassword = 'az2SFxgh3asXG1';
  //   const invalidPassword = '123456';
  let repository: HitmanRepositoryMock;
  beforeEach(() => {
    repository = new HitmanRepositoryMock();
  });
  it('should update a hitman', async () => {
    const hitman = new Hitman(
      new HitmanId(1),
      'John Doe',
      new HitmanEmail(validEmail),
      new HitmanPassword(validPassword),
      new HitmanStatus('ACTIVE', Object.values(HitmanStatusEnum)),
    );
    repository.returnSearchById(hitman);
    const updater = new HitmanUpdater(repository);
    await updater.run(
      hitman.id.value,
      hitman.name,
      hitman.email.value,
      hitman.status.value,
    );
    repository.assertUpdateHaveBeenCalledWith(hitman);
  });
  it('should throw an error if change status from INACTIVE to ACTIVE', async () => {
    const hitman = new Hitman(
      new HitmanId(2),
      'John Doe',
      new HitmanEmail(validEmail),
      new HitmanPassword(validPassword),
      new HitmanStatus('INACTIVE', Object.values(HitmanStatusEnum)),
    );
    repository.returnSearchById(hitman);
    const updater = new HitmanUpdater(repository);
    await expect(
      updater.run(
        hitman.id.value,
        hitman.name,
        hitman.email.value,
        HitmanStatus.ACTIVE.value,
      ),
    ).rejects.toThrowError('Hitman can not be changed from INACTIVE to ACTIVE');
  });
  it('should throw an error if user not found', async () => {
    const hitman = new Hitman(
      new HitmanId(2),
      'John Doe',
      new HitmanEmail(validEmail),
      new HitmanPassword(validPassword),
      new HitmanStatus('ACTIVE', Object.values(HitmanStatusEnum)),
    );
    repository.returnSearchById(null);
    const updater = new HitmanUpdater(repository);
    await expect(
      updater.run(
        hitman.id.value,
        hitman.name,
        hitman.email.value,
        hitman.status.value,
      ),
    ).rejects.toThrowError('Hitman does not exist');
  });
  it('should throw an error if email is invalid', async () => {
    const hitman = new Hitman(
      new HitmanId(2),
      'John Doe',
      new HitmanEmail(validEmail),
      new HitmanPassword(validPassword),
      new HitmanStatus('ACTIVE', Object.values(HitmanStatusEnum)),
    );
    repository.returnSearchById(hitman);
    const updater = new HitmanUpdater(repository);
    await expect(
      updater.run(
        hitman.id.value,
        hitman.name,
        invalidEmail,
        hitman.status.value,
      ),
    ).rejects.toThrowError(`Email <${invalidEmail}> is not valid`);
  });
});

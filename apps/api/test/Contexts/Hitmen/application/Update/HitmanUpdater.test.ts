import { HitmanUpdater } from '../../../../../src/Contexts/Hitmen/application/Update/HitmanUpdater';
import {
  Hitman,
  HitmanStatusEnum,
} from '../../../../../src/Contexts/Hitmen/domain';
import { HitmanRepositoryMock } from '../../__mocks__/HitmanRepositoryMock';
import { HitmanRoleMother } from '../../domain/HitmanRoleMother';
import { HitmanMother } from '../../domain/HitmanMother';
import { HitmanIdMother } from '../../domain/HitmanIdMother';
import { HitmanNameMother } from '../../domain/HitmanNameMother';
import { HitmanPasswordMother } from '../../domain/HitmanPasswordMother';
import { HitmanEmailMother } from '../../domain/HitmanEmailMother';

describe('HitmanUpdater', () => {
  const invalidEmail = 'fake@email';
  let repository: HitmanRepositoryMock;
  beforeEach(() => {
    repository = new HitmanRepositoryMock();
  });
  it('should update a hitman', async () => {
    const hitman = HitmanMother.random();
    repository.returnSearchById(hitman);
    const updater = new HitmanUpdater(repository);
    await updater.run(
      hitman.id,
      hitman.name,
      hitman.email,
      hitman.status,
      hitman.role,
    );
    repository.assertUpdateHaveBeenCalledWith(hitman);
  });
  it('should throw an error if change status from INACTIVE to ACTIVE', async () => {
    const hitman = new Hitman(
      HitmanIdMother.random(),
      HitmanNameMother.random(),
      HitmanEmailMother.random(),
      HitmanPasswordMother.random(),
      HitmanStatusEnum.INACTIVE,
      HitmanRoleMother.random(),
    );
    repository.returnSearchById(hitman);
    const updater = new HitmanUpdater(repository);
    await expect(
      updater.run(
        hitman.id,
        hitman.name,
        hitman.email,
        HitmanStatusEnum.ACTIVE,
        hitman.role,
      ),
    ).rejects.toThrowError('Hitman can not be changed from INACTIVE to ACTIVE');
  });
  it('should throw an error if user not found', async () => {
    const hitman = HitmanMother.random();
    const updater = new HitmanUpdater(repository);
    await expect(
      updater.run(
        hitman.id,
        hitman.name,
        hitman.email,
        hitman.status,
        hitman.role,
      ),
    ).rejects.toThrowError('Hitman does not exist');
  });
  it('should throw an error if email is invalid', async () => {
    const hitman = new Hitman(
      HitmanIdMother.random(),
      HitmanNameMother.random(),
      HitmanEmailMother.random(),
      HitmanPasswordMother.random(),
      HitmanStatusEnum.ACTIVE,
      HitmanRoleMother.random(),
    );
    repository.returnSearchById(hitman);
    const updater = new HitmanUpdater(repository);
    await expect(
      updater.run(
        hitman.id,
        hitman.name,
        invalidEmail,
        hitman.status,
        hitman.role,
      ),
    ).rejects.toThrowError(`Email <${invalidEmail}> is not valid`);
  });
});

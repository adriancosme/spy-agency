import { HitmanRepositoryMock } from '../../../../test/Hitmen/__mocks__/HitmanRepositoryMock';
import { HitRepositoryMock } from '../../../../test/Hits/__mocks__/HitRepositoryMock';
import { Cuid } from '../../../../src/Shared/domain/value-object/Cuid';
import { MarkAsCompleted } from '../../../../src/Hits/application/MarkCompleted/MarkAsCompleted';
import {
  Hitman,
  HitmanEmail,
  HitmanId,
  HitmanPassword,
  HitmanStatus,
} from '../../../../src/Hitmen/domain';
import { Hit, HitId, HitStatus } from '../../../../src/Hits/domain';

describe('MarkAsCompleted', () => {
  let hitRepository: HitRepositoryMock;
  let hitmanRepository: HitmanRepositoryMock;
  const hitmanAssignedTo = Hitman.create(
    new HitmanId(3),
    'John',
    new HitmanEmail('john@spy.com'),
    new HitmanPassword('asfA2FXVsa32XX'),
    HitmanStatus.ACTIVE,
  );
  const hitmanCreatedBy = Hitman.create(
    new HitmanId(2),
    'Peter',
    new HitmanEmail('peter@spy.com'),
    new HitmanPassword('asfA2FXVsa32XX'),
    HitmanStatus.ACTIVE,
  );
  beforeEach(() => {
    hitRepository = new HitRepositoryMock();
    hitmanRepository = new HitmanRepositoryMock();
  });
  it('should mark a hit as completed', async () => {
    const hit = new Hit(
      new HitId(Cuid.random().value),
      hitmanAssignedTo.id,
      'Lorem ipsum',
      'Juan Perez',
      new HitStatus(HitStatus.ASSIGNED.value, HitStatus.VALID_STATUS),
      hitmanCreatedBy.id,
    );
    hitmanRepository.returnSearchById(hitmanAssignedTo);
    hitRepository.returnSeachById(hit);
    const updater = new MarkAsCompleted(hitRepository);
    await updater.run(hit.id.value);
    const hitUpdated = new Hit(
      hit.id,
      hit.assignedTo,
      hit.description,
      hit.target,
      HitStatus.COMPLETED,
      hit.createdBy,
    );
    hitRepository.assertUpdateHasBeenCalledWith(hitUpdated);
  });
  it('should throw an error if the hit does not exist', async () => {
    const updater = new MarkAsCompleted(hitRepository);
    await expect(updater.run(Cuid.random().value)).rejects.toThrowError(
      'Hit not found',
    );
  });
  it('should throw an error if the hit is already completed', async () => {
    const hit = new Hit(
      new HitId(Cuid.random().value),
      hitmanAssignedTo.id,
      'Lorem ipsum',
      'Juan Perez',
      new HitStatus(HitStatus.COMPLETED.value, HitStatus.VALID_STATUS),
      hitmanCreatedBy.id,
    );
    hitRepository.returnSeachById(hit);
    const updater = new MarkAsCompleted(hitRepository);
    await expect(updater.run(hit.id.value)).rejects.toThrowError(
      'Hit already completed',
    );
  });
});

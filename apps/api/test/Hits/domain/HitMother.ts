import { HitmanId } from '../../../src/Contexts/Hitmen/domain';
import { Hit, HitId, HitStatus } from '../../../src/Contexts/Hits/domain';
import { HitIdMother } from './HitIdMother';
import { HitAssigedToMother } from './HitAssigedToMother';
import { HitDescriptionMother } from './HitDescriptionMother';
import { HitTargetMother } from './HitTargetMother';
import { HitStatusMother } from './HitStatusMother';
import { HitCreatedByMother } from './HitCreatedByMother';

export class HitMother {
  static create(
    id: HitId,
    assignedTo: HitmanId,
    description: string,
    target: string,
    status: HitStatus,
    createdBy: HitmanId,
  ): Hit {
    return new Hit(id, assignedTo, description, target, status, createdBy);
  }

  static random(): Hit {
    return this.create(
      HitIdMother.random(),
      HitAssigedToMother.random(),
      HitDescriptionMother.random(),
      HitTargetMother.random(),
      HitStatusMother.random(),
      HitCreatedByMother.random(),
    );
  }
}

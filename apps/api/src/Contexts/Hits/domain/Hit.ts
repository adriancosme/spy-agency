import { HitmanId } from '../../Hitmen/domain';
import { HitId, HitStatus } from './';
import { AggregateRoot } from '../../Shared/domain/AggregateRoot';

export class Hit extends AggregateRoot {
  readonly id: HitId;
  readonly assignedTo: HitmanId;
  readonly description: string;
  readonly target: string;
  readonly status: HitStatus;
  readonly createdBy: HitmanId;

  constructor(
    id: HitId,
    assignedTo: HitmanId,
    description: string,
    target: string,
    status: HitStatus,
    createdBy: HitmanId,
  ) {
    super();
    this.id = id;
    this.assignedTo = assignedTo;
    this.description = description;
    this.target = target;
    this.status = status;
    this.createdBy = createdBy;
  }

  toPrimitives() {
    return {
      id: this.id.value,
      assignedTo: this.assignedTo.value,
      description: this.description,
      target: this.target,
      status: this.status.value,
      createdBy: this.createdBy.value,
    };
  }
}

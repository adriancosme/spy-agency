import { Hitman } from 'src/Contexts/Hitmen/domain';
import { HitStatusEnum } from './';

export class Hit {
  readonly id: string;
  readonly assignedTo: Hitman;
  readonly description: string;
  readonly target: string;
  readonly status: HitStatusEnum;
  readonly createdBy: Hitman;

  constructor(
    id: string,
    assignedTo: Hitman,
    description: string,
    target: string,
    status: HitStatusEnum,
    createdBy: Hitman,
  ) {
    this.id = id;
    this.assignedTo = assignedTo;
    this.description = description;
    this.target = target;
    this.status = status;
    this.createdBy = createdBy;
  }
}

import { HitStatusEnum } from './';

export class Hit {
  readonly id: string;
  readonly assignedTo: number;
  readonly description: string;
  readonly target: string;
  readonly status: HitStatusEnum;
  readonly createdBy: number;

  constructor(
    id: string,
    assignedTo: number,
    description: string,
    target: string,
    status: HitStatusEnum,
    createdBy: number,
  ) {
    this.id = id;
    this.assignedTo = assignedTo;
    this.description = description;
    this.target = target;
    this.status = status;
    this.createdBy = createdBy;
  }
}

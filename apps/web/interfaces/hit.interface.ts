import { IUser } from "./user.interface";

export enum HitStatus {
  NOT_ASSIGNED = 'NOT_ASSIGNED',
  ASSIGNED = 'ASSIGNED',
  FAILED = 'FAILED',
  COMPLETED = 'COMPLETED',
}

export interface IHit {

  id: string;

  assignedTo: IUser;

  description: string;

  target: string;

  status: HitStatus;

  createdBy: IUser;
}

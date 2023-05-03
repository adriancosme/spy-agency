import { Hitman } from '../../Hitmen/domain';
import { Hit, HitStatusEnum } from '../domain';

interface HitResponse {
  id: string;
  assignedTo: Hitman;
  description: string;
  target: string;
  status: HitStatusEnum;
  createdBy: Hitman;
}

export class HitsResponse {
  public readonly hits: Array<HitResponse>;

  constructor(hits: Array<Hit>) {
    this.hits = hits.map((hit) => hit);
  }
}

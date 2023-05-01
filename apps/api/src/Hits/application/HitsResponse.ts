import { Hit } from '../domain';

interface HitResponse {
  id: string;
  assignedTo: number;
  description: string;
  target: string;
  status: string;
  createdBy: number;
}

export class HitsResponse {
  public readonly hits: Array<HitResponse>;

  constructor(hits: Array<Hit>) {
    this.hits = hits.map((hit) => hit.toPrimitives());
  }
}

import { Criteria } from '../../Shared/domain/criteria/Criteria';
import { Hit } from './Hit';

export interface HitRepository {
  save(hit: Hit): Promise<void>;
  searchAll(): Promise<Hit[]>;
  searchById(id: string): Promise<Hit | null>;
  matching(criteria: Criteria): Promise<Hit[]>;
  update(hit: Hit): Promise<void>;
}

import { Hit } from './Hit';

export interface HitRepository {
  save(hit: Hit): Promise<void>;
  searchAll(): Promise<Hit[]>;
  searchById(id: string): Promise<Hit>;
  update(hit: Hit): Promise<void>;
  delete(id: string): Promise<void>;
}

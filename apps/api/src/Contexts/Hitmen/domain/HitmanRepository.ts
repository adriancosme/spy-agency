import { Hitman } from '../../Shared/domain/Hitman';

export interface HitmanRepository {
  save(hitman: Hitman): Promise<void>;

  searchAll(): Promise<Array<Hitman>>;

  searchById(id: number): Promise<Hitman | null>;

  searchByEmail(email: string): Promise<Hitman | null>;

  searchByManagedBy(managerId: number): Promise<Array<Hitman>>;

  update(hitman: Hitman): Promise<void>;
}

import { Hitman } from './Hitman';

export interface HitmanRepository {
  save(user: Hitman): Promise<void>;
  searchAll(): Promise<Array<Hitman>>;
  searchById(id: number): Promise<Hitman>;
  searchByEmail(email: string): Promise<Hitman>;
  update(user: Hitman): Promise<void>;
}

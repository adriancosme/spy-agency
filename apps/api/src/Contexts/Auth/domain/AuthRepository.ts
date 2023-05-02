import { Hitman } from '../../Hitmen/domain';

export interface AuthRepository {
  search(email: string): Promise<Hitman | null>;
}

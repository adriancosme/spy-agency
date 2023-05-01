import { AuthEmail } from './AuthEmail';
import { AuthUser } from './AuthUser';

export interface AuthRepository {
  search(email: AuthEmail): Promise<AuthUser | null>;
}

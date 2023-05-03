import { Hitman } from '../../../Shared/domain/Hitman';
import { UserAuth } from '../../domain/UserAuth';
import { Token } from '../../domain/Token';

export interface AuthServiceContract {
  validateUser(userEmail: string, userPassword: string): Promise<Hitman | null>;
  login(user: UserAuth): Promise<Token>;
}

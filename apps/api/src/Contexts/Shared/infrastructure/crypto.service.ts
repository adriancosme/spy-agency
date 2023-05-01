import { compare, genSaltSync, hash } from 'bcrypt';
import { CryptoServiceRepository } from '../domain/CryptoServiceRepository';

export class CryptoService implements CryptoServiceRepository {
  hashPassword(password: string): Promise<string> {
    const salt = genSaltSync(10);
    return hash(password, salt);
  }
  comparePassword(password: string, hash: string): Promise<boolean> {
    return compare(password, hash);
  }
}

export interface CryptoServiceRepository {
  comparePassword(password: string, hash: string): Promise<boolean>;
  hashPassword(password: string): Promise<string>;
}

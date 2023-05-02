export enum UserRole {
  BOSS = "BOSS",
  MANAGER = "MANAGER",
  HITMAN = "HITMAN"
}

export interface IUser {
  id: number;
  name: string;
  email: string;
  password?: string;
  role: UserRole;
}

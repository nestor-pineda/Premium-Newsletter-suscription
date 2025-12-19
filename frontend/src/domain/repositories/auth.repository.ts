import { User } from '../entities/user.entity';

export interface LoginParams {
  email: string;
  password: string;
}

export interface RegisterParams {
  email: string;
  name: string;
  password?: string;
}

export interface IAuthRepository {
  login(params: LoginParams): Promise<User>;
  register(params: RegisterParams): Promise<User>;
  logout(): Promise<void>;
  getCurrentUser(): Promise<User | null>;
}


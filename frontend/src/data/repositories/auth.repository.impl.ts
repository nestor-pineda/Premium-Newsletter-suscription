import { IAuthRepository, LoginParams, RegisterParams } from '../../domain/repositories/auth.repository';
import { User } from '../../domain/entities/user.entity';
import api from '../sources/api';
import { UserMapper } from '../mappers/user.mapper';

export class AuthRepositoryImpl implements IAuthRepository {
  async login(params: LoginParams): Promise<User> {
    const response = await api.post('/auth/login', params);
    return UserMapper.toDomain(response.data);
  }

  async register(params: RegisterParams): Promise<User> {
    const response = await api.post('/auth/register', params);
    return UserMapper.toDomain(response.data);
  }

  async logout(): Promise<void> {
    await api.post('/auth/logout');
  }

  async getCurrentUser(): Promise<User | null> {
    try {
      const response = await api.get('/auth/me');
      return UserMapper.toDomain(response.data);
    } catch (error) {
      return null;
    }
  }
}


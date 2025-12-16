import { User } from '../../domain/entities/user.entity';

export class UserMapper {
  static toDomain(raw: any): User {
    return {
      id: raw.id,
      email: raw.email,
      name: raw.name,
      role: raw.role || 'user',
      createdAt: raw.created_at || new Date().toISOString(),
    };
  }
}


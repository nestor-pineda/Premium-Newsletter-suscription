import { Repository } from 'typeorm';
import { User } from '../domain/entities/user.entity';
export declare class UserRepository {
    private readonly repo;
    constructor(repo: Repository<User>);
    create(email: string, passwordHash: string, name?: string): Promise<User>;
    findByEmail(email: string): Promise<User | null>;
    findById(id: string): Promise<User | null>;
}

import { CreateUserDto } from './create-user.dto';
import { CreateUserHandler } from '../../application/handlers/create-user.handler';
export declare class UsersController {
    private readonly createUserHandler;
    constructor(createUserHandler: CreateUserHandler);
    create(dto: CreateUserDto): Promise<{
        id: string;
        email: string;
        status: string;
    }>;
}

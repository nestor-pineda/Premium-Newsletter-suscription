import { AuthService } from '../../application/services/auth.service';
import { LoginDto } from './login.dto';
import { CreateUserDto } from '../../../users/interface/rest/create-user.dto';
import { CreateUserHandler } from '../../../users/application/handlers/create-user.handler';
export declare class AuthController {
    private readonly authService;
    private readonly createUserHandler;
    constructor(authService: AuthService, createUserHandler: CreateUserHandler);
    login(loginDto: LoginDto): Promise<{
        access_token: string;
        user: {
            id: string;
            email: string;
            name: string;
        };
    }>;
    register(createUserDto: CreateUserDto): Promise<{
        access_token: string;
        user: {
            id: string;
            email: string;
            name: string;
        };
    }>;
    getProfile(req: any): any;
    logout(): Promise<{
        message: string;
    }>;
}

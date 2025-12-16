import { IAuthRepository, LoginParams, RegisterParams } from '../repositories/auth.repository';
import { User } from '../entities/user.entity';

export class LoginUseCase {
  constructor(private authRepository: IAuthRepository) {}

  execute(params: LoginParams): Promise<User> {
    return this.authRepository.login(params);
  }
}

export class RegisterUseCase {
  constructor(private authRepository: IAuthRepository) {}

  execute(params: RegisterParams): Promise<User> {
    return this.authRepository.register(params);
  }
}

export class GetCurrentUserUseCase {
    constructor(private authRepository: IAuthRepository) {}
    
    execute(): Promise<User | null> {
        return this.authRepository.getCurrentUser();
    }
}

export class LogoutUseCase {
    constructor(private authRepository: IAuthRepository) {}
    
    execute(): Promise<void> {
        return this.authRepository.logout();
    }
}


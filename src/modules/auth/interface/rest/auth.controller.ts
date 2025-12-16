import {
  Controller,
  Post,
  Body,
  UnauthorizedException,
  Get,
  UseGuards,
  Request,
} from '@nestjs/common';
import { AuthService } from '../../application/services/auth.service';
import { LoginDto } from './login.dto';
import { CreateUserDto } from '../../../users/interface/rest/create-user.dto';
import { CreateUserCommand } from '../../../users/application/commands/create-user.command';
import { CreateUserHandler } from '../../../users/application/handlers/create-user.handler';
import { AuthGuard } from '@nestjs/passport';

@Controller('auth')
export class AuthController {
  constructor(
    private readonly authService: AuthService,
    private readonly createUserHandler: CreateUserHandler,
  ) {}

  @Post('login')
  async login(@Body() loginDto: LoginDto) {
    const user = await this.authService.validateUser(
      loginDto.email,
      loginDto.password,
    );
    if (!user) {
      throw new UnauthorizedException('Invalid credentials');
    }
    return this.authService.login(user);
  }

  @Post('register')
  async register(@Body() createUserDto: CreateUserDto) {
    const command = new CreateUserCommand(
      createUserDto.email,
      createUserDto.password,
      createUserDto.name,
    );
    const user = await this.createUserHandler.execute(command);
    return this.authService.register(user);
  }

  @UseGuards(AuthGuard('jwt'))
  @Get('me')
  getProfile(@Request() req) {
    return req.user;
  }

  @Post('logout')
  async logout() {
    return { message: 'Logged out' };
  }
}


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
    // #region agent log
    try { const fs = require('fs'); const logPath = '/Users/nestor/Documents/Master IA/Premium-Newsletter-suscription/.cursor/debug.log'; fs.appendFileSync(logPath, JSON.stringify({location:'auth.controller.ts:24',message:'login endpoint called',data:{email:loginDto.email,hasPassword:!!loginDto.password,passwordLength:loginDto.password?.length},timestamp:Date.now(),sessionId:'debug-session',runId:'run2',hypothesisId:'E'})+'\n'); } catch(e) { console.log('LOG ERROR:', e.message); }
    // #endregion
    try {
      const user = await this.authService.validateUser(
        loginDto.email,
        loginDto.password,
      );
      // #region agent log
      try { const fs2 = require('fs'); const logPath2 = '/Users/nestor/Documents/Master IA/Premium-Newsletter-suscription/.cursor/debug.log'; fs2.appendFileSync(logPath2, JSON.stringify({location:'auth.controller.ts:30',message:'validateUser result',data:{userFound:!!user,userId:user?.id,userEmail:user?.email},timestamp:Date.now(),sessionId:'debug-session',runId:'run2',hypothesisId:'C'})+'\n'); } catch(e) { console.log('LOG ERROR:', e.message); }
      // #endregion
      if (!user) {
        throw new UnauthorizedException('Invalid credentials');
      }
      // #region agent log
      try { const fs3 = require('fs'); const logPath3 = '/Users/nestor/Documents/Master IA/Premium-Newsletter-suscription/.cursor/debug.log'; fs3.appendFileSync(logPath3, JSON.stringify({location:'auth.controller.ts:33',message:'calling authService.login',data:{userId:user.id,userEmail:user.email,userName:user.name},timestamp:Date.now(),sessionId:'debug-session',runId:'run2',hypothesisId:'D'})+'\n'); } catch(e) { console.log('LOG ERROR:', e.message); }
      // #endregion
      return this.authService.login(user);
    } catch (error) {
      // #region agent log
      try { const fs4 = require('fs'); const logPath4 = '/Users/nestor/Documents/Master IA/Premium-Newsletter-suscription/.cursor/debug.log'; fs4.appendFileSync(logPath4, JSON.stringify({location:'auth.controller.ts:catch',message:'login error caught',data:{errorMessage:error.message,errorName:error.name,errorStack:error.stack},timestamp:Date.now(),sessionId:'debug-session',runId:'run2',hypothesisId:'ALL'})+'\n'); } catch(e) { console.log('LOG ERROR:', e.message); }
      // #endregion
      throw error;
    }
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


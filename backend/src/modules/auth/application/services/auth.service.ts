import { Injectable, UnauthorizedException } from '@nestjs/common';
import { JwtService } from '@nestjs/jwt';
import * as bcrypt from 'bcrypt';
import { UserRepository } from '../../../users/infrastructure/user.repository';
import { User } from '../../../users/domain/entities/user.entity';

@Injectable()
export class AuthService {
  constructor(
    private readonly userRepository: UserRepository,
    private readonly jwtService: JwtService,
  ) {}

  async validateUser(email: string, pass: string): Promise<any> {
    // #region agent log
    try { const fs = require('fs'); const logPath = '/Users/nestor/Documents/Master IA/Premium-Newsletter-suscription/.cursor/debug.log'; fs.appendFileSync(logPath, JSON.stringify({location:'auth.service.ts:14',message:'validateUser entry',data:{email,hasPassword:!!pass,passwordLength:pass?.length},timestamp:Date.now(),sessionId:'debug-session',runId:'run2',hypothesisId:'C'})+'\n'); } catch(e) { console.log('LOG ERROR:', e.message); }
    // #endregion
    try {
      const user = await this.userRepository.findByEmail(email);
      // #region agent log
      try { const fs2 = require('fs'); const logPath2 = '/Users/nestor/Documents/Master IA/Premium-Newsletter-suscription/.cursor/debug.log'; fs2.appendFileSync(logPath2, JSON.stringify({location:'auth.service.ts:15',message:'user found from repository',data:{userFound:!!user,userId:user?.id,hasPasswordHash:!!user?.passwordHash},timestamp:Date.now(),sessionId:'debug-session',runId:'run2',hypothesisId:'C'})+'\n'); } catch(e) { console.log('LOG ERROR:', e.message); }
      // #endregion
      console.log('Login attempt for:', email);
      console.log('User found:', !!user);
      if (user) {
           console.log('Has password hash:', !!user.passwordHash);
           console.log('Hash length:', user.passwordHash?.length);
      }
      
      if (user && user.passwordHash && (await bcrypt.compare(pass, user.passwordHash))) {
        // #region agent log
        try { const fs3 = require('fs'); const logPath3 = '/Users/nestor/Documents/Master IA/Premium-Newsletter-suscription/.cursor/debug.log'; fs3.appendFileSync(logPath3, JSON.stringify({location:'auth.service.ts:23',message:'password match successful',data:{userId:user.id},timestamp:Date.now(),sessionId:'debug-session',runId:'run2',hypothesisId:'C'})+'\n'); } catch(e) { console.log('LOG ERROR:', e.message); }
        // #endregion
        const { passwordHash, ...result } = user;
        return result;
      }
      // #region agent log
      try { const fs4 = require('fs'); const logPath4 = '/Users/nestor/Documents/Master IA/Premium-Newsletter-suscription/.cursor/debug.log'; fs4.appendFileSync(logPath4, JSON.stringify({location:'auth.service.ts:27',message:'validateUser returning null',data:{reason:!user?'user not found':!user.passwordHash?'no password hash':'password mismatch'},timestamp:Date.now(),sessionId:'debug-session',runId:'run2',hypothesisId:'C'})+'\n'); } catch(e) { console.log('LOG ERROR:', e.message); }
      // #endregion
      return null;
    } catch (error) {
      // #region agent log
      try { const fs5 = require('fs'); const logPath5 = '/Users/nestor/Documents/Master IA/Premium-Newsletter-suscription/.cursor/debug.log'; fs5.appendFileSync(logPath5, JSON.stringify({location:'auth.service.ts:validateUser:catch',message:'validateUser error',data:{errorMessage:error.message,errorName:error.name},timestamp:Date.now(),sessionId:'debug-session',runId:'run2',hypothesisId:'C'})+'\n'); } catch(e) { console.log('LOG ERROR:', e.message); }
      // #endregion
      throw error;
    }
  }

  async login(user: User) {
    // #region agent log
    try { const fs = require('fs'); const logPath = '/Users/nestor/Documents/Master IA/Premium-Newsletter-suscription/.cursor/debug.log'; fs.appendFileSync(logPath, JSON.stringify({location:'auth.service.ts:30',message:'login method entry',data:{userId:user?.id,userEmail:user?.email,userName:user?.name,hasAllFields:!!(user?.id && user?.email && user?.name)},timestamp:Date.now(),sessionId:'debug-session',runId:'run2',hypothesisId:'D'})+'\n'); } catch(e) { console.log('LOG ERROR:', e.message); }
    // #endregion
    try {
      const payload = { email: user.email, sub: user.id, name: user.name };
      // #region agent log
      try { const fs2 = require('fs'); const logPath2 = '/Users/nestor/Documents/Master IA/Premium-Newsletter-suscription/.cursor/debug.log'; fs2.appendFileSync(logPath2, JSON.stringify({location:'auth.service.ts:31',message:'payload created, signing JWT',data:{payload},timestamp:Date.now(),sessionId:'debug-session',runId:'run2',hypothesisId:'D'})+'\n'); } catch(e) { console.log('LOG ERROR:', e.message); }
      // #endregion
      const token = this.jwtService.sign(payload);
      // #region agent log
      try { const fs3 = require('fs'); const logPath3 = '/Users/nestor/Documents/Master IA/Premium-Newsletter-suscription/.cursor/debug.log'; fs3.appendFileSync(logPath3, JSON.stringify({location:'auth.service.ts:32',message:'JWT signed successfully',data:{tokenLength:token?.length},timestamp:Date.now(),sessionId:'debug-session',runId:'run2',hypothesisId:'D'})+'\n'); } catch(e) { console.log('LOG ERROR:', e.message); }
      // #endregion
      return {
        access_token: token,
        user: {
          id: user.id,
          email: user.email,
          name: user.name,
        },
      };
    } catch (error) {
      // #region agent log
      try { const fs4 = require('fs'); const logPath4 = '/Users/nestor/Documents/Master IA/Premium-Newsletter-suscription/.cursor/debug.log'; fs4.appendFileSync(logPath4, JSON.stringify({location:'auth.service.ts:login:catch',message:'login error',data:{errorMessage:error.message,errorName:error.name,errorStack:error.stack},timestamp:Date.now(),sessionId:'debug-session',runId:'run2',hypothesisId:'D'})+'\n'); } catch(e) { console.log('LOG ERROR:', e.message); }
      // #endregion
      throw error;
    }
  }

  async register(user: User) {
    const payload = { email: user.email, sub: user.id, name: user.name };
    return {
      access_token: this.jwtService.sign(payload),
      user: {
        id: user.id,
        email: user.email,
        name: user.name,
      },
    };
  }
}


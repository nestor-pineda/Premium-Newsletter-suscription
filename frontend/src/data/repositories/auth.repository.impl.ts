import { IAuthRepository, LoginParams, RegisterParams } from '../../domain/repositories/auth.repository';
import { User } from '../../domain/entities/user.entity';
import api from '../sources/api';
import { UserMapper } from '../mappers/user.mapper';

export class AuthRepositoryImpl implements IAuthRepository {
  async login(params: LoginParams): Promise<User> {
    // #region agent log
    fetch('http://127.0.0.1:7242/ingest/65d82a43-c82c-4176-be7d-2ca21d04e8fe',{method:'POST',headers:{'Content-Type':'application/json'},body:JSON.stringify({location:'auth.repository.impl.ts:7',message:'login called with params',data:{params,hasPassword:'password' in params},timestamp:Date.now(),sessionId:'debug-session',runId:'run1',hypothesisId:'A'})}).catch(()=>{});
    // #endregion
    try {
      const response = await api.post('/auth/login', params);
      // #region agent log
      console.log('[DEBUG] API response received:', {status:response.status,hasAccessToken:!!response.data.access_token,hasUser:!!response.data.user,userData:response.data.user});
      fetch('http://127.0.0.1:7242/ingest/65d82a43-c82c-4176-be7d-2ca21d04e8fe',{method:'POST',headers:{'Content-Type':'application/json'},body:JSON.stringify({location:'auth.repository.impl.ts:11',message:'API response received',data:{status:response.status,hasAccessToken:!!response.data.access_token,hasUser:!!response.data.user,userData:response.data.user},timestamp:Date.now(),sessionId:'debug-session',runId:'run3',hypothesisId:'A'})}).catch(()=>{});
      // #endregion
      if (response.data.access_token) {
          localStorage.setItem('token', response.data.access_token);
      }
      // The user object is nested in 'user' key
      // #region agent log
      console.log('[DEBUG] Before UserMapper.toDomain, userData:', response.data.user);
      fetch('http://127.0.0.1:7242/ingest/65d82a43-c82c-4176-be7d-2ca21d04e8fe',{method:'POST',headers:{'Content-Type':'application/json'},body:JSON.stringify({location:'auth.repository.impl.ts:19',message:'before UserMapper.toDomain',data:{userData:response.data.user},timestamp:Date.now(),sessionId:'debug-session',runId:'run3',hypothesisId:'A'})}).catch(()=>{});
      // #endregion
      try {
        const mappedUser = UserMapper.toDomain(response.data.user);
        // #region agent log
        console.log('[DEBUG] UserMapper.toDomain success:', mappedUser);
        fetch('http://127.0.0.1:7242/ingest/65d82a43-c82c-4176-be7d-2ca21d04e8fe',{method:'POST',headers:{'Content-Type':'application/json'},body:JSON.stringify({location:'auth.repository.impl.ts:20',message:'UserMapper.toDomain success',data:{mappedUser},timestamp:Date.now(),sessionId:'debug-session',runId:'run3',hypothesisId:'A'})}).catch(()=>{});
        // #endregion
        return mappedUser;
      } catch (error) {
        // #region agent log
        console.error('[DEBUG] UserMapper error:', error, 'userData:', response.data.user);
        fetch('http://127.0.0.1:7242/ingest/65d82a43-c82c-4176-be7d-2ca21d04e8fe',{method:'POST',headers:{'Content-Type':'application/json'},body:JSON.stringify({location:'auth.repository.impl.ts:catch',message:'UserMapper error',data:{errorMessage:error.message,errorName:error.name,userData:response.data.user},timestamp:Date.now(),sessionId:'debug-session',runId:'run3',hypothesisId:'A'})}).catch(()=>{});
        // #endregion
        throw error;
      }
    } catch (error: any) {
      // Extract error message from backend response
      const errorMessage = error.response?.data?.message || 
                          error.response?.data?.error || 
                          error.message || 
                          'Login failed';
      throw new Error(errorMessage);
    }
  }

  async register(params: RegisterParams): Promise<User> {
    try {
      const response = await api.post('/auth/register', params);
      if (response.data.access_token) {
          localStorage.setItem('token', response.data.access_token);
      }
      return UserMapper.toDomain(response.data.user);
    } catch (error: any) {
      // Extract error message from backend response
      const errorMessage = error.response?.data?.message || 
                          error.response?.data?.error || 
                          error.message || 
                          'Registration failed';
      throw new Error(errorMessage);
    }
  }

  async logout(): Promise<void> {
    localStorage.removeItem('token');
    await api.post('/auth/logout');
  }

  async getCurrentUser(): Promise<User | null> {
    try {
      const response = await api.get('/auth/me');
      // /auth/me returns the user object directly (from req.user)
      // which matches what JwtStrategy returns: { id, email, name }
      return UserMapper.toDomain(response.data);
    } catch (error) {
      return null;
    }
  }
}

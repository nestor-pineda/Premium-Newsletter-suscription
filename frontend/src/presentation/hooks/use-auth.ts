import { useState } from 'react';
import { useDI } from '../providers/DIProvider';
import { useAuthStore } from '../stores/auth.store';
import { LoginParams, RegisterParams } from '../../../domain/repositories/auth.repository';
import { useRouter } from 'next/navigation';

export const useAuth = () => {
    const { loginUseCase, registerUseCase, logoutUseCase } = useDI();
    const { setUser } = useAuthStore();
    const [isLoading, setIsLoading] = useState(false);
    const [error, setError] = useState<string | null>(null);
    const router = useRouter();

    const login = async (params: LoginParams) => {
        setIsLoading(true);
        setError(null);
        // #region agent log
        fetch('http://127.0.0.1:7242/ingest/65d82a43-c82c-4176-be7d-2ca21d04e8fe',{method:'POST',headers:{'Content-Type':'application/json'},body:JSON.stringify({location:'use-auth.ts:14',message:'login hook called',data:{params},timestamp:Date.now(),sessionId:'debug-session',runId:'run3',hypothesisId:'ALL'})}).catch(()=>{});
        // #endregion
        try {
            const user = await loginUseCase.execute(params);
            // #region agent log
            fetch('http://127.0.0.1:7242/ingest/65d82a43-c82c-4176-be7d-2ca21d04e8fe',{method:'POST',headers:{'Content-Type':'application/json'},body:JSON.stringify({location:'use-auth.ts:18',message:'loginUseCase.execute success',data:{user},timestamp:Date.now(),sessionId:'debug-session',runId:'run3',hypothesisId:'ALL'})}).catch(()=>{});
            // #endregion
            setUser(user);
            // #region agent log
            fetch('http://127.0.0.1:7242/ingest/65d82a43-c82c-4176-be7d-2ca21d04e8fe',{method:'POST',headers:{'Content-Type':'application/json'},body:JSON.stringify({location:'use-auth.ts:20',message:'setUser called, before router.push',data:{},timestamp:Date.now(),sessionId:'debug-session',runId:'run3',hypothesisId:'ALL'})}).catch(()=>{});
            // #endregion
            router.push('/dashboard');
            // #region agent log
            fetch('http://127.0.0.1:7242/ingest/65d82a43-c82c-4176-be7d-2ca21d04e8fe',{method:'POST',headers:{'Content-Type':'application/json'},body:JSON.stringify({location:'use-auth.ts:21',message:'router.push called',data:{},timestamp:Date.now(),sessionId:'debug-session',runId:'run3',hypothesisId:'ALL'})}).catch(()=>{});
            // #endregion
            return user;
        } catch (e: any) {
            // #region agent log
            fetch('http://127.0.0.1:7242/ingest/65d82a43-c82c-4176-be7d-2ca21d04e8fe',{method:'POST',headers:{'Content-Type':'application/json'},body:JSON.stringify({location:'use-auth.ts:catch',message:'login error caught',data:{errorMessage:e.message,errorName:e.name,errorStack:e.stack},timestamp:Date.now(),sessionId:'debug-session',runId:'run3',hypothesisId:'ALL'})}).catch(()=>{});
            // #endregion
            const errorMessage = e?.message || 'Login failed';
            setError(errorMessage);
            throw e;
        } finally {
            setIsLoading(false);
        }
    };

    const register = async (params: RegisterParams) => {
        setIsLoading(true);
        setError(null);
        try {
            const user = await registerUseCase.execute(params);
            setUser(user);
            router.push('/pricing'); // Redirect to pricing after register
            return user;
        } catch (e: any) {
            const errorMessage = e?.message || 'Registration failed';
            setError(errorMessage);
            throw e;
        } finally {
            setIsLoading(false);
        }
    };

    const logout = async () => {
        await logoutUseCase.execute();
        setUser(null);
        router.push('/auth');
    };

    return { login, register, logout, isLoading, error };
}


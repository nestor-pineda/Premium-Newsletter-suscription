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
        try {
            const user = await loginUseCase.execute(params);
            setUser(user);
            router.push('/dashboard');
            return user;
        } catch (e) {
            setError('Login failed');
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
        } catch (e) {
            setError('Registration failed');
            throw e;
        } finally {
            setIsLoading(false);
        }
    };

    const logout = async () => {
        await logoutUseCase.execute();
        setUser(null);
        router.push('/');
    };

    return { login, register, logout, isLoading, error };
}


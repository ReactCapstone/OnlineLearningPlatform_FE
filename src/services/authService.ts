import apiClient from '../api/apiClient';
import type { ApiResponse, LoginDto, RegisterDto, AuthResponseData } from '../redux/auth/authTypes';

class AuthService {
    async login(credentials: LoginDto): Promise<AuthResponseData> {
        const response = await apiClient<ApiResponse<AuthResponseData>>('/auth/login', {
            method: 'POST',
            body: JSON.stringify(credentials),
            skipAuth: true,
        });

        const user = response.data as AuthResponseData;
        localStorage.setItem('token', user.token);
        localStorage.setItem('user', JSON.stringify(user));
        return user;
    }

    async register(details: RegisterDto): Promise<AuthResponseData> {
        const response = await apiClient<ApiResponse<AuthResponseData>>('/auth/register', {
            method: 'POST',
            body: JSON.stringify(details),
            skipAuth: true, // no token exists yet at registration time either
        });

        const user = response.data as AuthResponseData;
        localStorage.setItem('token', user.token);
        localStorage.setItem('user', JSON.stringify(user));
        return user;
    }

    logout(): void {
        localStorage.removeItem('token');
        localStorage.removeItem('user');
    }

    getCurrentUser(): AuthResponseData | null {
        const raw = localStorage.getItem('user');
        return raw ? JSON.parse(raw) : null;
    }
}

export default new AuthService();
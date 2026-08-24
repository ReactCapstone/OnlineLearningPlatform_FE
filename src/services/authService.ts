import apiClient from '../api/apiClient';

import type {
    ApiResponse,
    LoginDto,
    RegisterDto,
    AuthResponseData,
    SendOtpDto,
    SendOtpResponseData,
    VerifyOtpDto,
    VerifyOtpResponseData,
} from '../redux/auth/authTypes';

class AuthService {

    async login(credentials: LoginDto): Promise<AuthResponseData> {
        const response = await apiClient<ApiResponse<AuthResponseData>>(
            '/auth/login',
            {
                method: 'POST',
                body: JSON.stringify(credentials),
                skipAuth: true,
            }
        );

        const user = response.data as AuthResponseData;

        localStorage.setItem('token', user.token);
        localStorage.setItem('user', JSON.stringify(user));

        return user;
    }

    async sendOtp(data: SendOtpDto): Promise<SendOtpResponseData> {
        const response = await apiClient<ApiResponse<SendOtpResponseData>>(
            '/auth/send-otp',
            {
                method: 'POST',
                body: JSON.stringify(data),
                skipAuth: true,
            }
        );

        if (!response.data) {
            throw new Error(
                response.message || 'Failed to send OTP.'
            );
        }

        return response.data;
    }

    async verifyOtp(data: VerifyOtpDto): Promise<VerifyOtpResponseData> {
        const response = await apiClient<ApiResponse<VerifyOtpResponseData>>(
            '/auth/verify-otp',
            {
                method: 'POST',
                body: JSON.stringify(data),
                skipAuth: true,
            }
        );

        if (!response.data) {
            throw new Error(
                response.message || 'OTP verification failed.'
            );
        }

        return response.data;
    }

    async register(details: RegisterDto): Promise<AuthResponseData> {
        const response = await apiClient<ApiResponse<AuthResponseData>>(
            '/auth/register',
            {
                method: 'POST',
                body: JSON.stringify(details),
                skipAuth: true,
            }
        );

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
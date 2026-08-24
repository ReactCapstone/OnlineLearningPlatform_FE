export interface LoginDto {
    email: string;
    password: string;
}

export interface RegisterDto {
    verificationToken: string;
    firstName: string;
    lastName: string;
    email: string;
    password: string;
    confirmPassword: string;
    yearsOfExperience: number | null;
    areaOfExpertise: string | null;
}

export interface SendOtpDto {
    email: string;
}

export interface SendOtpResponseData {
    email: string;
    expiresAt: string;
}

export interface VerifyOtpDto {
    email: string;
    otpCode: string;
}

export interface VerifyOtpResponseData {
    verificationToken: string;
    email: string;
    expiresAt: string;
}

export interface AuthResponseData {
    token: string;
    email: string;
    fullName: string;
    firstName?: string;
    lastName?: string;
    role: string;
    yearsOfExperience?: number;
    areaOfExpertise?: string;
    expiresAt: string;
}

export interface ApiResponse<T> {
    success: boolean;
    message: string;
    data: T | null;
}

export interface AuthUser {
    email: string;
    fullName: string;
    firstName?: string;
    lastName?: string;
    role: string;
    token: string;
    yearsOfExperience?: number;
    areaOfExpertise?: string;
    expiresAt: string;
}

export interface AuthState {
    user: AuthUser | null;
    isAuthenticated: boolean;
    loading: boolean;
    error: string | null;
}
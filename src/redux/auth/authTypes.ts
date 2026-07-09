export interface LoginDto {
    email: string;
    password: string;
}

export interface RegisterDto {
    firstName: string;
    lastName: string;
    email: string;
    password: string;
    confirmPassword: string;
    yearsOfExperience: number | null;
    areaOfExpertise: string | null;
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
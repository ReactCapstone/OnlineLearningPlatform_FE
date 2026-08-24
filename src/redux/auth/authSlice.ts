import { createSlice, createAsyncThunk } from '@reduxjs/toolkit';
import type { PayloadAction } from '@reduxjs/toolkit';

import authService from '../../services/authService';

import type {
    LoginDto,
    RegisterDto,
    SendOtpDto,
    VerifyOtpDto,
} from './authTypes';

import type {
    AuthState,
    AuthUser,
} from './authTypes';

const initialState: AuthState = {
    user: authService.getCurrentUser(),
    isAuthenticated: !!authService.getCurrentUser(),
    loading: false,
    error: null,
};


// --------------------------------------------------
// LOGIN
// --------------------------------------------------

export const loginUser = createAsyncThunk(
    'auth/login',

    async (
        credentials: LoginDto,
        { rejectWithValue }
    ) => {

        try {
            const user = await authService.login(credentials);

            return user;

        } catch (err: any) {

            return rejectWithValue(
                err.message || 'Login failed.'
            );
        }
    }
);


// --------------------------------------------------
// SEND OTP
// --------------------------------------------------

export const sendOtp = createAsyncThunk(
    'auth/sendOtp',

    async (
        data: SendOtpDto,
        { rejectWithValue }
    ) => {

        try {
            return await authService.sendOtp(data);

        } catch (err: any) {

            return rejectWithValue(
                err.message || 'Failed to send OTP.'
            );
        }
    }
);


// --------------------------------------------------
// VERIFY OTP
// --------------------------------------------------

export const verifyOtp = createAsyncThunk(
    'auth/verifyOtp',

    async (
        data: VerifyOtpDto,
        { rejectWithValue }
    ) => {

        try {
            return await authService.verifyOtp(data);

        } catch (err: any) {

            return rejectWithValue(
                err.message || 'OTP verification failed.'
            );
        }
    }
);


// --------------------------------------------------
// REGISTER
// --------------------------------------------------

export const registerUser = createAsyncThunk(
    'auth/register',

    async (
        details: RegisterDto,
        { rejectWithValue }
    ) => {

        try {
            return await authService.register(details);

        } catch (err: any) {

            return rejectWithValue(
                err.message || 'Registration failed.'
            );
        }
    }
);


// --------------------------------------------------
// SLICE
// --------------------------------------------------

const authSlice = createSlice({
    name: 'auth',
    initialState,
    reducers: {
        logout: (state) => {
            authService.logout();
            state.user = null;
            state.isAuthenticated = false;
        },
        clearError: (state) => {
            state.error = null;
        },
    },
    extraReducers: (builder) => {
        builder
            // -------------------------
            // LOGIN
            // -------------------------
            .addCase(loginUser.pending, (state) => {
                state.loading = true;
                state.error = null;
            })
            .addCase(
                loginUser.fulfilled,
                (
                    state,
                    action: PayloadAction<AuthUser>
                ) => {

                    state.loading = false;
                    state.user = action.payload;
                    state.isAuthenticated = true;
                }
            )
            .addCase(loginUser.rejected, (state, action) => {

                state.loading = false;
                state.error = action.payload as string;
            })
            // -------------------------
            // SEND OTP
            // -------------------------
            .addCase(sendOtp.pending, (state) => {

                state.loading = true;
                state.error = null;
            })
            .addCase(sendOtp.fulfilled, (state) => {

                state.loading = false;
                state.error = null;
            })
            .addCase(sendOtp.rejected, (state, action) => {

                state.loading = false;
                state.error = action.payload as string;
            })
            // -------------------------
            // VERIFY OTP
            // -------------------------
            .addCase(verifyOtp.pending, (state) => {

                state.loading = true;
                state.error = null;
            })
            .addCase(verifyOtp.fulfilled, (state) => {

                state.loading = false;
                state.error = null;
            })
            .addCase(verifyOtp.rejected, (state, action) => {

                state.loading = false;
                state.error = action.payload as string;
            })
            // -------------------------
            // REGISTER
            // -------------------------
            .addCase(registerUser.pending, (state) => {

                state.loading = true;
                state.error = null;
            })
            .addCase(
                registerUser.fulfilled,
                (
                    state,
                    action: PayloadAction<AuthUser>
                ) => {

                    state.loading = false;
                    state.user = action.payload;
                    state.isAuthenticated = true;
                }
            )
            .addCase(registerUser.rejected, (state, action) => {
                state.loading = false;
                state.error = action.payload as string;
            });
    },
});

export const {
    logout,
    clearError,
} = authSlice.actions;

export default authSlice.reducer;
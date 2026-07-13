import { createSlice, createAsyncThunk } from '@reduxjs/toolkit';
import type { PayloadAction } from '@reduxjs/toolkit';
import authService from '../../services/authService';
import type { LoginDto, RegisterDto } from './authTypes';
import type { AuthState, AuthUser } from './authTypes';

const initialState: AuthState = {
    user: authService.getCurrentUser(), // rehydrate from localStorage on app load
    isAuthenticated: !!authService.getCurrentUser(),
    loading: false,
    error: null,
};

// Thunk handles the async call; the slice just reacts to its lifecycle
export const loginUser = createAsyncThunk(
    'auth/login',
    async (credentials: LoginDto, { rejectWithValue }) => {
        try {
            const user = await authService.login(credentials);
            return user;
        } catch (err: any) {
            return rejectWithValue(err.message);
        }
    }
);

export const registerUser = createAsyncThunk(
    'auth/register',
    async (details: RegisterDto, { rejectWithValue }) => {
        try {
            return await authService.register(details);
        } catch (err: any) {
            return rejectWithValue(err.message);
        }
    }
);

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
            .addCase(loginUser.pending, (state) => {
                state.loading = true;
                state.error = null;
            })
            .addCase(loginUser.fulfilled, (state, action: PayloadAction<AuthUser>) => {
                state.loading = false;
                state.user = action.payload;
                state.isAuthenticated = true;
            })
            .addCase(loginUser.rejected, (state, action) => {
                state.loading = false;
                state.error = action.payload as string;
            })
            .addCase(registerUser.pending, (state) => {
                state.loading = true;
                state.error = null;
            })
            .addCase(registerUser.fulfilled, (state, action: PayloadAction<AuthUser>) => {
                state.loading = false;
                state.user = action.payload;
                state.isAuthenticated = true;
            })
            .addCase(registerUser.rejected, (state, action) => {
                state.loading = false;
                state.error = action.payload as string;
            });
    },
});

export const { logout, clearError } = authSlice.actions;
export default authSlice.reducer;
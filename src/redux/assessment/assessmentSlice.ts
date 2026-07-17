// src/redux/assessment/assessmentSlice.ts

import { createSlice, createAsyncThunk } from '@reduxjs/toolkit';
import type { PayloadAction } from '@reduxjs/toolkit';
import assessmentService from '../../services/assessmentService';
import type { Assessment, StartAttemptData, SubmitRequest, SubmitResult, MyStatusData } from '../../types/assessment';
import type { AssessmentState } from './assessmentTypes';

const initialState: AssessmentState = {
    assessment: null,
    attempt: null,
    result: null,
    myStatus: null,
    loading: false,
    statusLoading: false,
    submitting: false,
    error: null,
};

export const fetchMyStatus = createAsyncThunk(
    'assessment/myStatus',
    async (courseId: number, { rejectWithValue }) => {
        try {
            return await assessmentService.getMyStatus(courseId);
        } catch (err: any) {
            return rejectWithValue(err.message);
        }
    }
);

export const fetchAssessmentByCourse = createAsyncThunk(
    'assessment/fetchByCourse',
    async (courseId: number, { rejectWithValue }) => {
        try {
            return await assessmentService.getAssessmentByCourse(courseId);
        } catch (err: any) {
            return rejectWithValue(err.message);
        }
    }
);

export const startAssessmentAttempt = createAsyncThunk(
    'assessment/start',
    async (assessmentId: number, { rejectWithValue }) => {
        try {
            return await assessmentService.startAttempt(assessmentId);
        } catch (err: any) {
            return rejectWithValue(err.message);
        }
    }
);

export const submitAssessmentAttempt = createAsyncThunk(
    'assessment/submit',
    async (payload: SubmitRequest, { rejectWithValue }) => {
        try {
            return await assessmentService.submitAttempt(payload);
        } catch (err: any) {
            return rejectWithValue(err.message);
        }
    }
);

const assessmentSlice = createSlice({
    name: 'assessment',
    initialState,
    reducers: {
        resetAssessment: (state) => {
            state.assessment = null;
            state.attempt = null;
            state.result = null;
            state.myStatus = null;
            state.error = null;
        },
    },
    extraReducers: (builder) => {
        builder
            // my-status
            .addCase(fetchMyStatus.pending, (state) => {
                state.statusLoading = true;
                state.error = null;
            })
            .addCase(fetchMyStatus.fulfilled, (state, action: PayloadAction<MyStatusData>) => {
                state.statusLoading = false;
                state.myStatus = action.payload;
            })
            .addCase(fetchMyStatus.rejected, (state, action) => {
                state.statusLoading = false;
                state.error = action.payload as string;
            })
            // fetch assessment
            .addCase(fetchAssessmentByCourse.pending, (state) => {
                state.loading = true;
                state.error = null;
            })
            .addCase(fetchAssessmentByCourse.fulfilled, (state, action: PayloadAction<Assessment>) => {
                state.loading = false;
                state.assessment = action.payload;
            })
            .addCase(fetchAssessmentByCourse.rejected, (state, action) => {
                state.loading = false;
                state.error = action.payload as string;
            })
            // start attempt
            .addCase(startAssessmentAttempt.pending, (state) => {
                state.loading = true;
                state.error = null;
            })
            .addCase(startAssessmentAttempt.fulfilled, (state, action: PayloadAction<StartAttemptData>) => {
                state.loading = false;
                state.attempt = action.payload;
            })
            .addCase(startAssessmentAttempt.rejected, (state, action) => {
                state.loading = false;
                state.error = action.payload as string;
            })
            // submit attempt
            .addCase(submitAssessmentAttempt.pending, (state) => {
                state.submitting = true;
                state.error = null;
            })
            .addCase(submitAssessmentAttempt.fulfilled, (state, action: PayloadAction<SubmitResult>) => {
                state.submitting = false;
                state.result = action.payload;
            })
            .addCase(submitAssessmentAttempt.rejected, (state, action) => {
                state.submitting = false;
                state.error = action.payload as string;
            });
    },
});

export const { resetAssessment } = assessmentSlice.actions;
export default assessmentSlice.reducer;
import { createSlice, PayloadAction } from '@reduxjs/toolkit';

export interface ReviewData {
  [userId: number]: {
    status: 'pending' | 'approved' | 'rejected';
    reviewedAt: string;
    reviewedBy: string;
  };
}

interface ReviewState {
  reviewData: ReviewData;
  isLoading: boolean;
}

const initialState: ReviewState = {
  reviewData: {},
  isLoading: false,
};

const reviewSlice = createSlice({
  name: 'review',
  initialState,
  reducers: {
    loadReviewData: (state) => {
      try {
        const savedData = localStorage.getItem('reviewData');
        if (savedData) {
          state.reviewData = JSON.parse(savedData);
        }
      } catch (error) {
        console.error('Failed to load review data:', error);
        state.reviewData = {};
      }
    },
    setReviewData: (state, action: PayloadAction<ReviewData>) => {
      state.reviewData = action.payload;
      localStorage.setItem('reviewData', JSON.stringify(action.payload));
    },
    updateReview: (
      state,
      action: PayloadAction<{
        userId: number;
        status: 'approved' | 'rejected';
        reviewedBy: string;
      }>
    ) => {
      const { userId, status, reviewedBy } = action.payload;
      state.reviewData = {
        ...state.reviewData,
        [userId]: {
          status,
          reviewedAt: new Date().toISOString(),
          reviewedBy,
        },
      };
      localStorage.setItem('reviewData', JSON.stringify(state.reviewData));
    },
    clearReviewData: (state) => {
      state.reviewData = {};
      localStorage.removeItem('reviewData');
    },
  },
});

export const { loadReviewData, setReviewData, updateReview, clearReviewData } = reviewSlice.actions;
export default reviewSlice.reducer;
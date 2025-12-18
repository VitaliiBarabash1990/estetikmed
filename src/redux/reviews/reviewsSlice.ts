// redux/main/slice.ts
import { createSlice } from "@reduxjs/toolkit";
import {
	createReviews,
	updateReviews,
	getAllReviews,
	deleteReviews,
} from "./operations";
import { ReviewsState } from "@/lib/types/types";

const initialState: ReviewsState = {
	reviewsList: [],
	isLoading: false,
	isError: false,
	isSuccess: false,
};

export const reviewsSlice = createSlice({
	name: "reviews",
	initialState,
	reducers: {
		resetServicesError(state) {
			state.isError = false;
		},
		resetSuccessReviews(state) {
			state.isSuccess = false;
		},
	},
	extraReducers: (builder) => {
		builder
			// CREATE
			.addCase(createReviews.pending, (state) => {
				state.isLoading = true;
				state.isError = false;
			})
			.addCase(createReviews.fulfilled, (state, { payload }) => {
				state.reviewsList.push(payload);
				state.isLoading = false;
				state.isSuccess = true;
			})
			.addCase(createReviews.rejected, (state) => {
				state.isLoading = false;
				state.isError = true;
			})

			// UPDATE
			.addCase(updateReviews.pending, (state) => {
				state.isLoading = true;
				state.isError = false;
			})
			.addCase(updateReviews.fulfilled, (state, { payload }) => {
				// state.aboutMe = payload;
				state.reviewsList = state.reviewsList.map((item) =>
					item._id === payload._id ? payload : item
				);
				state.isLoading = false;
				state.isSuccess = true;
			})
			.addCase(updateReviews.rejected, (state) => {
				state.isLoading = false;
				state.isError = true;
			})

			// GET ALL (поверне масив, беремо перший)
			.addCase(getAllReviews.fulfilled, (state, { payload }) => {
				state.reviewsList = payload;
			})

			// DELETE
			.addCase(deleteReviews.fulfilled, (state, { payload }) => {
				// state.aboutMe = null;
				state.reviewsList = state.reviewsList.filter(
					(item) => item._id !== payload
				);
			});
	},
});

export const { resetServicesError, resetSuccessReviews } = reviewsSlice.actions;
export const ReviewsReducer = reviewsSlice.reducer;

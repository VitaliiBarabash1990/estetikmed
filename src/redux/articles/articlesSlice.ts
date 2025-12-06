// redux/main/slice.ts
import { createSlice } from "@reduxjs/toolkit";
import {
	deleteArticles,
	getAllArticles,
	updateArticles,
	createArticles,
} from "./operations";
import { ArticlesState } from "@/lib/types/types";

const initialState: ArticlesState = {
	articlesList: [],
	isLoading: false,
	isError: false,
};

export const articlesSlice = createSlice({
	name: "articles",
	initialState,
	reducers: {
		resetServicesError(state) {
			state.isError = false;
		},
	},
	extraReducers: (builder) => {
		builder
			// CREATE
			.addCase(createArticles.pending, (state) => {
				state.isLoading = true;
				state.isError = false;
			})
			.addCase(createArticles.fulfilled, (state, { payload }) => {
				state.articlesList.push(payload);
				state.isLoading = false;
			})
			.addCase(createArticles.rejected, (state) => {
				state.isLoading = false;
				state.isError = true;
			})

			// UPDATE
			.addCase(updateArticles.pending, (state) => {
				state.isLoading = true;
				state.isError = false;
			})
			.addCase(updateArticles.fulfilled, (state, { payload }) => {
				// state.aboutMe = payload;
				state.articlesList = state.articlesList.map((item) =>
					item._id === payload._id ? payload : item
				);
				state.isLoading = false;
			})
			.addCase(updateArticles.rejected, (state) => {
				state.isLoading = false;
				state.isError = true;
			})

			// GET ALL (поверне масив, беремо перший)
			.addCase(getAllArticles.fulfilled, (state, { payload }) => {
				state.articlesList = payload;
			})

			// DELETE
			.addCase(deleteArticles.fulfilled, (state, { payload }) => {
				// state.aboutMe = null;
				state.articlesList = state.articlesList.filter(
					(item) => item._id !== payload
				);
			});
	},
});

export const { resetServicesError } = articlesSlice.actions;
export const ArticlesReducer = articlesSlice.reducer;

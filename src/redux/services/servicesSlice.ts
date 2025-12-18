// redux/main/slice.ts
import { createSlice } from "@reduxjs/toolkit";
import {
	createServices,
	updateServices,
	getAllServices,
	getServicesById,
	deleteServices,
} from "./operations";
import { ServicesState } from "@/lib/types/types";

const initialState: ServicesState = {
	servicesList: [],
	isLoading: false,
	isError: false,
	isSuccess: false,
};

export const servicesSlice = createSlice({
	name: "services",
	initialState,
	reducers: {
		resetServicesError(state) {
			state.isError = false;
		},
		resetSuccessServices(state) {
			state.isSuccess = false;
		},
	},
	extraReducers: (builder) => {
		builder
			// CREATE
			.addCase(createServices.pending, (state) => {
				state.isLoading = true;
				state.isError = false;
			})
			.addCase(createServices.fulfilled, (state, { payload }) => {
				state.servicesList.push(payload);
				state.isLoading = false;
				state.isSuccess = true;
			})
			.addCase(createServices.rejected, (state) => {
				state.isLoading = false;
				state.isError = true;
			})

			// UPDATE
			.addCase(updateServices.pending, (state) => {
				state.isLoading = true;
				state.isError = false;
			})
			.addCase(updateServices.fulfilled, (state, { payload }) => {
				// state.aboutMe = payload;
				state.servicesList = state.servicesList.map((item) =>
					item._id === payload._id ? payload : item
				);
				state.isLoading = false;
				state.isSuccess = true;
			})
			.addCase(updateServices.rejected, (state) => {
				state.isLoading = false;
				state.isError = true;
			})

			// GET ALL (поверне масив, беремо перший)
			.addCase(getAllServices.fulfilled, (state, { payload }) => {
				state.servicesList = payload;
			})

			// GET BY ID
			.addCase(getServicesById.fulfilled, (state, { payload }) => {
				// state.aboutMe = payload;

				const exists = state.servicesList.some(
					(item) => item._id === payload._id
				);
				if (exists) {
					state.servicesList = state.servicesList.map((item) =>
						item._id === payload._id ? payload : item
					);
				} else {
					state.servicesList.push(payload);
				}
			})

			// DELETE
			.addCase(deleteServices.fulfilled, (state, { payload }) => {
				// state.aboutMe = null;
				state.servicesList = state.servicesList.filter(
					(item) => item._id !== payload
				);
			});
	},
});

export const { resetServicesError, resetSuccessServices } =
	servicesSlice.actions;
export const ServicesReducer = servicesSlice.reducer;

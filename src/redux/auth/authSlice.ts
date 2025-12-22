import { createSlice } from "@reduxjs/toolkit";
import {
	logOut,
	adminLogIn,
	refreshSession,
	sendOrderEmail,
} from "./operations";
import { AuthState } from "@/lib/types/types";

const initialState: AuthState = {
	user: {
		user: null,
		email: null,
	},
	token: null,
	role: null,
	isLoggedIn: false,
	isLoading: false,
	isError: false,
	isSuccess: false,
	isEnterAuth: false,
	isSendOrder: false,
};

export const authSlice = createSlice({
	name: "auth",
	initialState,
	reducers: {
		resetError(state) {
			state.isError = false;
		},
		resetSuccess(state) {
			state.isSuccess = false;
			state.isSendOrder = false;
		},
		authEnter(state) {
			state.isEnterAuth = true;
		},
		authExit(state) {
			state.isEnterAuth = false;
		},
	},
	extraReducers: (builder) => {
		builder
			.addCase(adminLogIn.pending, (state) => {
				state.isLoading = true;
				state.isError = false;
			})
			.addCase(adminLogIn.fulfilled, (state, { payload }) => {
				// console.log("Payload", payload);
				state.user.user = payload.user ?? null;
				state.user.email = payload.email;
				state.token = payload.accessToken;
				state.role = payload.role;
				state.isEnterAuth = false;
				state.isLoggedIn = true;
				state.isLoading = false;
				state.isError = false;
				state.isSuccess = true;
			})
			.addCase(adminLogIn.rejected, (state) => {
				state.isLoading = false;
				state.isError = true;
			})
			.addCase(logOut.pending, (state) => {
				state.isLoading = true;
				state.isError = false;
			})
			.addCase(logOut.fulfilled, (state) => {
				state.user = {
					user: null,
					email: null,
				};
				state.token = null;
				state.role = null;
				state.isLoggedIn = false;
				state.isLoading = false;
				state.isError = false;
			})
			.addCase(logOut.rejected, (state) => {
				state.isLoading = false;
			})
			.addCase(refreshSession.pending, (state) => {
				state.isLoading = true;
				state.isError = false;
			})
			.addCase(refreshSession.fulfilled, (state, { payload }) => {
				state.user.user = payload.user ?? null;
				state.user.email = payload.email;
				state.token = payload.accessToken;
				state.role = payload.role;
				state.isEnterAuth = false;
				state.isLoggedIn = true;
				state.isLoading = false;
				state.isError = false;
				state.isSuccess = true;
			})
			.addCase(refreshSession.rejected, (state) => {
				state.token = null;
				state.isLoggedIn = false;
				state.isLoading = false;
			})
			.addCase(sendOrderEmail.fulfilled, (state) => {
				state.isSendOrder = true;
			});
	},
});

export const { resetError, resetSuccess, authEnter, authExit } =
	authSlice.actions;
export const authReducer = authSlice.reducer;

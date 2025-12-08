// redux/main/operations.ts
import { createAsyncThunk } from "@reduxjs/toolkit";
import { toast } from "react-toastify";
import { esteticMedAPI } from "../auth/operations";
import { RootState } from "../store";

// GET ALL
export const getAllReviews = createAsyncThunk(
	"reviews/getAllReviews",
	async (_, thunkAPI) => {
		try {
			const res = await esteticMedAPI.get("/reviews");
			console.log("MainData", res.data.data);
			return res.data.data;
		} catch (err) {
			// @ts-expect-error TS is not sure about error structure
			const message = err?.message || "Щось пішло не так";
			toast.error("Не вдалося завантажити список ❌");
			return thunkAPI.rejectWithValue(message);
		}
	}
);

// CREATE
export const createReviews = createAsyncThunk(
	"reviews/createReviews",
	async (formData: FormData, thunkAPI) => {
		try {
			const res = await esteticMedAPI.post("/reviews", formData, {
				headers: { "Content-Type": "multipart/form-data" },
			});
			toast.success("Reviews created successfully ✅");
			return res.data.data;
		} catch (error) {
			// @ts-expect-error TS is not sure about error structure
			const message = error?.message || "Щось пішло не так";
			toast.error("Помилка при створенні ❌");
			return thunkAPI.rejectWithValue(message);
		}
	}
);

// UPDATE

export const updateReviews = createAsyncThunk(
	"reviews/updateReviews",
	async ({ id, formData }: { id: string; formData: FormData }, thunkAPI) => {
		try {
			const state = thunkAPI.getState() as RootState;
			const token = state.auth.token;
			const res = await esteticMedAPI.patch(`/reviews/${id}`, formData, {
				headers: { Authorization: `Bearer ${token}` },
			});
			toast.success("Reviews updated successfully ✅");
			return res.data.data;
		} catch (error) {
			// @ts-expect-error TS is not sure про структуру error
			const message = error?.message || "Щось пішло не так";
			toast.error("Помилка при оновленні ❌");
			return thunkAPI.rejectWithValue(message);
		}
	}
);

// DELETE
export const deleteReviews = createAsyncThunk(
	"reviews/deleteReviews",
	async (id: string, thunkAPI) => {
		try {
			await esteticMedAPI.delete(`/reviews/${id}`);
			toast.success("Reviews deleted successfully ✅");
			return id; // повертаємо id щоб можна було прибрати зі стору
		} catch (err) {
			// @ts-expect-error TS is not sure about error structure
			const message = err?.message || "Щось пішло не так";
			toast.error("Помилка при видаленні ❌");
			return thunkAPI.rejectWithValue(message);
		}
	}
);

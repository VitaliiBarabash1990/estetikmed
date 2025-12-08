import { createSlice, PayloadAction } from "@reduxjs/toolkit";
import { getAllMedia, uploadMedia, deleteMedia } from "./operations";
import { GalleryCategory, GalleryState } from "@/lib/types/types";

const initialState: GalleryState = {
	media: [],
	isLoading: false,
	isError: false,
};

export const mediaSlice = createSlice({
	name: "media",
	initialState,
	reducers: {},
	extraReducers: (builder) => {
		builder
			// 🟢 GET
			.addCase(
				getAllMedia.fulfilled,
				(state, { payload }: PayloadAction<GalleryCategory[]>) => {
					console.log("PAYLOAD", payload);
					state.media = payload;
					state.isLoading = false;
				}
			)

			// 🟢 UPLOAD
			.addCase(
				uploadMedia.fulfilled,
				(state, { payload }: PayloadAction<GalleryCategory>) => {
					// console.log("Payload", payload);
					const index = state.media.findIndex((g) => g.type === payload.type);
					if (index >= 0) {
						state.media[index] = payload;
					} else {
						state.media.push(payload);
					}
					state.isLoading = false;
				}
			)

			// ❌ DELETE
			.addCase(
				deleteMedia.fulfilled,
				(
					state,
					{ payload }: PayloadAction<{ type: string; imageUrl: string }>
				) => {
					const category = state.media.find((g) => g.type === payload.type);
					if (category) {
						category.imgs = category.imgs.filter(
							(url) => url !== payload.imageUrl
							// (img) => img._id !== payload.imageUrl
						);
					}
					state.isLoading = false;
				}
			);
	},
});

export const MediaReducer = mediaSlice.reducer;

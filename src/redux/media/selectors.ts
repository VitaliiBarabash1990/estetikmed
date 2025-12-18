import { RootState } from "../store";

export const selectMedia = (state: RootState) => state.media.media;
export const selectIsSuccess = (state: RootState) => state.media.isSuccess;

import { RootState } from "../store";

export const selectMedia = (state: RootState) => state.media.media;

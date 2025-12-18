import { RootState } from "../store";

export const selectReviews = (state: RootState) => state.reviews.reviewsList;
export const selectIsSuccess = (state: RootState) => state.reviews.isSuccess;

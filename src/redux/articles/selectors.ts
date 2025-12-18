import { RootState } from "../store";

export const selectArticles = (state: RootState) => state.articles.articlesList;
export const selectIsSuccess = (state: RootState) => state.articles.isSuccess;

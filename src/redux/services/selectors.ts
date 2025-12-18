import { RootState } from "../store";

export const selectServices = (state: RootState) => state.services.servicesList;
export const selectSuccess = (state: RootState) => state.services.isSuccess;

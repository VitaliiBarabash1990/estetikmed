import { RootState } from "../store";

export const selectServices = (state: RootState) => state.services.servicesList;

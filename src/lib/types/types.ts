export interface AuthState {
	user: {
		name: string | null;
		email: string | null;
	};
	role?: string | null;
	token: string | null;
	isLoggedIn: boolean;
	isLoading: boolean;
	isError: boolean;
	isSuccess: boolean;
	isEnterAuth: boolean;
}

export interface AuthResponse {
	user: AuthUser;
	token: string;
}

interface AuthUser {
	name?: string | null;
	email: string;
	role?: string;
}

export interface SendOrderPayload {
	email?: string;
	name?: string;
}

export type RegisterProps = {
	email: string;
	password: string;
};

//forServices
export interface ServicesFormProps {
	namePl: string;
	nameDe: string;
	descriptionPl: string;
	descriptionDe: string;
	price: number;
	type?: string;
	imgs: (File | null)[];
	existingImg?: string[];
}

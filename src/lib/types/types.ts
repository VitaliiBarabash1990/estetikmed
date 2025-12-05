export interface AuthState {
	user: {
		user: string | null;
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

//state Services
export interface ServicesState {
	servicesList: ServicesPayload[];
	servicesLangList: ServicesLangPayload[];
	isLoading: boolean;
	isError: boolean;
}

export interface ServicesPayload {
	pl: {
		name: string;
		description?: string;
	};
	de: {
		name: string;
		description?: string;
	};
	price: string;
	type: string;
	_id?: undefined | string;
}

export interface ServicesLangPayload {
	pl: {
		name: string;
		description?: string;
	};
	de: {
		name: string;
		description?: string;
	};
}

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

export interface AuthResponse {
	user: string;
	email: string;
	role: string;
	accessToken: string;
	refreshToken: string;
	sessionId: string;
	userId: string;
	_id: string;
}

export interface SendOrderPayload {
	email?: string;
	name?: string;
}

export type RegisterProps = {
	email: string;
	password: string;
};

//forArticles
export interface ArticlesFormProps {
	titlePl: string;
	titleDe: string;
	textPl: string;
	textDe: string;
	img: File | null;
	existingImg?: string;
}

//forMedia
export interface MediaFormProps {
	type?: string;
	imgs: (File | null)[];
	videos: (File | null)[];
	existingImg?: string[];
	existingVideos?: string[];
}

//forReviews
export interface ReviewsFormProps {
	reviewsPl: string;
	reviewsDe: string;
	answersPl: string;
	answersDe: string;
	namePl: string;
	nameDe: string;
	servicesPl: string;
	servicesDe: string;
	img: File | null;
	existingImg?: string;
}

export type ArticleItemProps = {
	id: number;
	img: string;
	title: string;
	text: string;
};

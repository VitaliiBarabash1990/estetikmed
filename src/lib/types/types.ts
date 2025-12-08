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
	imgs: string[];
	_id?: string | undefined;
}

//state Articles
export interface ArticlesState {
	articlesList: ArticlesPayload[];
	isLoading: boolean;
	isError: boolean;
}

export interface ArticlesPayload {
	pl: {
		title: string;
		article: string;
	};
	de: {
		title: string;
		article: string;
	};
	img: string;
	_id?: string | undefined;
}

//state Reviews
export interface ReviewsState {
	reviewsList: ReviewsPayload[];
	isLoading: boolean;
	isError: boolean;
}

export interface ReviewsPayload {
	pl: {
		name: string;
		services: string;
		reviews: string;
		answers: string;
	};
	de: {
		name: string;
		services: string;
		reviews: string;
		answers: string;
	};
	img: string;
	_id?: string | undefined;
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
	articlePl: string;
	articleDe: string;
	img: File | string | null;
	existingImg?: string;
}

//forMedia
export interface MediaFormProps {
	categories: [
		{
			type?: string;
			imgs: (File | null)[];
		},
		{
			type?: string;
			videos: (File | null)[];
		}
	];
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
	img: File | string | null;
}

// 🔹 Тип для стану
export interface GalleryState {
	media: GalleryCategory[];
	isLoading: boolean;
	isError: boolean;
}
export interface GalleryCategory {
	_id?: string;
	type: "images" | "video";
	imgs: string[]; // URL[]
	videos: string[]; // URL[]
}

// /lib/utils/validationSchema.ts
import * as Yup from "yup";

const passwordRules = /^[a-zA-Z0-9]+$/;
export const validationSchemaRegister = () => {
	return Yup.object({
		email: Yup.string()
			.email("Не коректный Email!")
			.required("Введите коректный email!"),
		password: Yup.string()
			.matches(passwordRules, "Только латинськие буквы та цифри!")
			.min(5, "Минимум 5 символов")
			.required("Обовязательно!"),
	});
};

export const ValidationSchemaServices = Yup.object().shape({
	namePl: Yup.string().required(
		"Введите название на Польськом. Это обязательно!"
	),
	nameDe: Yup.string().required(
		"Введите название на Немецком. Это обязательно!"
	),
	descriptionPl: Yup.string().required(
		"Введите описание на Польськом. Это обязательно!"
	),
	descriptionDe: Yup.string().required(
		"Введите описание на Немецком. Это обязательно!"
	),
	price: Yup.number()
		.typeError("Цена должна быть числом!")
		.required("Введите цену. Это обязательно!")
		.min(1, "Цена должна быть не меньше 1"),

	imgs: Yup.array().test(
		"at-least-one-image",
		"Добавьте хотя бы 1 фото",
		function (imgs) {
			const { existingImg } = this.parent;

			const noExisting = !existingImg || existingImg.length === 0;
			const noNew = !imgs || imgs.length === 0;

			return !(noExisting && noNew); // повинно бути хоча б щось
		}
	),
});

export const ValidationSchemaArticles = Yup.object().shape({
	titlePl: Yup.string().required(
		"Введите название на Польськом. Это обязательно!"
	),
	titleDe: Yup.string().required(
		"Введите название на Немецком. Это обязательно!"
	),
	articlePl: Yup.string().required(
		"Введите описание на Польськом. Это обязательно!"
	),
	articleDe: Yup.string().required(
		"Введите описание на Немецком. Это обязательно!"
	),
	img: Yup.mixed()
		.required("Добавьте фото")
		.test(
			"is-file",
			"Файл должен быть изображением",
			(value) => value instanceof File
		)
		.test(
			"file-type-check",
			"Файл должен быть изображением (jpg, png, jpeg, webp)",
			(value) => {
				if (!(value instanceof File)) return false;
				return ["image/jpeg", "image/png", "image/webp"].includes(value.type);
			}
		),
});

export const ValidationSchemaReviews = Yup.object().shape({
	reviewsPl: Yup.string().required(
		"Введите отзыв на Польськом. Это обязательно!"
	),
	reviewsDe: Yup.string().required(
		"Введите отзыв на Немецком. Это обязательно!"
	),
	answersPl: Yup.string().required(
		"Введите ответ на Польськом. Это обязательно!"
	),
	answersDe: Yup.string().required(
		"Введите ответ на Немецком. Это обязательно!"
	),
	namePl: Yup.string().required("Введите имя на Польськом. Это обязательно!"),
	nameDe: Yup.string().required("Введите имя на Немецком. Это обязательно!"),
	servicesPl: Yup.string().required(
		"Введите услугу на Польськом. Это обязательно!"
	),
	servicesDe: Yup.string().required(
		"Введите услугу на Немецком. Это обязательно!"
	),
	img: Yup.mixed()
		.required("Добавьте фото")
		.test(
			"is-file",
			"Файл должен быть изображением",
			(value) => value instanceof File
		)
		.test(
			"file-type-check",
			"Файл должен быть изображением (jpg, png, jpeg, webp)",
			(value) => {
				if (!(value instanceof File)) return false;
				return ["image/jpeg", "image/png", "image/webp"].includes(value.type);
			}
		),
});

export const ValidationSchemaMedia = (type: number) =>
	Yup.object().shape({
		imgs: Yup.array().when([], {
			is: () => type === 0,
			then: (schema) =>
				schema
					.of(
						Yup.mixed().test(
							"is-file",
							"Файл должен быть изображением",
							(value) => value instanceof File
						)
					)
					.min(1, "Добавьте хотя бы 1 фото")
					.max(50, "Не можно добавлять больше 50 фото")
					.test(
						"file-type-check",
						"Файл должен быть изображением (jpg, png, jpeg, webp)",
						(value) => {
							if (!Array.isArray(value)) return true;
							return value.every((file) => {
								if (!(file instanceof File)) return true;
								return ["image/jpeg", "image/png", "image/webp"].includes(
									file.type
								);
							});
						}
					),
			otherwise: (schema) => schema.optional(),
		}),

		videos: Yup.array().when([], {
			is: () => type !== 0,
			then: (schema) =>
				schema
					.of(
						Yup.mixed()
							.test(
								"is-file",
								"Файл должен быть видео",
								(value) => value instanceof File
							)
							.test("file-type", "Разрешены только mp4, mov, webm", (value) => {
								if (!(value instanceof File)) return false;
								return ["video/mp4", "video/webm", "video/quicktime"].includes(
									value.type
								);
							})
					)
					.min(1, "Добавьте хотя бы 1 видео")
					.max(13, "Максимум 13 видео"),
			otherwise: (schema) => schema.optional(),
		}),
	});

export const ValidationSchemaCallback = Yup.object().shape({
	name: Yup.string()
		.required("Wpisz nazwę. To konieczność!")
		.min(2, "Minimum 2 znaki"),

	phone: Yup.string()
		.required("Wpisz swój numer telefonu. To konieczność!")
		.min(5, "Minimum 5 znaków"),

	email: Yup.string()
		.required("Proszę podać poprawny adres Email!")
		.email("Nieprawidłowy Email!"),

	message: Yup.string()
		.required("Wpisz swoją wiadomość. To konieczność!")
		.min(10, "Minimum 10 znaków"),

	file: Yup.mixed()
		.nullable()
		.test("file-type-check", "Недопустимый формат файла", (value) => {
			if (!value) return true; // файл НЕ обязателен
			if (!(value instanceof File)) return false;

			const allowed = [
				"image/jpeg",
				"image/png",
				"image/webp",
				"application/pdf",
				"application/msword",
				"application/vnd.openxmlformats-officedocument.wordprocessingml.document",
			];

			return allowed.includes(value.type);
		})
		.test("file-size", "Plik musi mieć mniej niż 10 MB", (value) => {
			if (!value || !(value instanceof File)) return true;
			return value.size <= 10 * 1024 * 1024; // 10MB
		}),
});

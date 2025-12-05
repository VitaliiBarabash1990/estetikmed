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
	textPl: Yup.string().required(
		"Введите описание на Польськом. Это обязательно!"
	),
	textDe: Yup.string().required(
		"Введите описание на Немецком. Это обязательно!"
	),
	img: Yup.array()
		.of(
			Yup.mixed()
				.test(
					"is-file",
					"Файл должен быть изображением",
					(value) => value instanceof File
				)
				.test(
					"file-type-check",
					"Файл должен быть изображением (jpg, png, jpeg, webp)",
					(value) => {
						if (!(value instanceof File)) return true;
						return ["image/jpeg", "image/png", "image/webp"].includes(
							value.type
						);
					}
				)
		)
		.min(1, "Добавьте 1 фото")
		.max(1, "Можно добавить только 1 фото"),
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
	imgs: Yup.array()
		.of(
			Yup.mixed()
				.test(
					"is-file",
					"Файл должен быть изображением",
					(value) => value instanceof File
				)
				.test(
					"file-type-check",
					"Файл должен быть изображением (jpg, png, jpeg, webp)",
					(value) => {
						if (!(value instanceof File)) return true;
						return ["image/jpeg", "image/png", "image/webp"].includes(
							value.type
						);
					}
				)
		)
		.min(1, "Добавьте 1 фото")
		.max(1, "Можно добавить только 1 фото"),
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

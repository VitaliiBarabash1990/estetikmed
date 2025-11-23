// /lib/utils/validationSchema.ts
import * as Yup from "yup";

const passwordRules = /^[a-zA-Z0-9]+$/;
export const validationSchemaRegister = () => {
	return Yup.object({
		email: Yup.string()
			.email("Не коректний Email!")
			.required("Введіть коректну email-адресу!"),
		password: Yup.string()
			.matches(passwordRules, "Лише латинські літери та цифри!")
			.min(5, "Мінімум 5 символів")
			.required("Обов'язково"),
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
	imgs: Yup.array()
		.of(
			Yup.mixed().test(
				"is-file",
				"Файл должен быть изображением",
				(value) => value instanceof File
			)
		)
		.min(1, "Добавьте хотя бы 1 фото")
		.max(10, "Не можна добавлять больше 10 фото")
		.test(
			"file-type-check",
			"Файл должен быть изображением (jpg, png, jpeg, webp)",
			(value) => {
				if (!Array.isArray(value)) return true;
				return value.every((file) => {
					if (!file) return true;
					if (!(file instanceof File)) return true;
					return ["image/jpeg", "image/png", "image/webp"].includes(file.type);
				});
			}
		),
	// imgs: Yup.array()
	// 	.of(Yup.mixed().nullable())
	// 	.test(
	// 		"four-images-required",
	// 		"Необходимо загрузить до 5 фотографий",
	// 		function (value) {
	// 			const existingImgs = this.parent?.existingImgs || [];

	// 			// Підрахунок усіх фото (нові файли + існуючі)
	// 			const total = [
	// 				...(Array.isArray(existingImgs) ? existingImgs.filter((v) => v) : []),
	// 				...(Array.isArray(value)
	// 					? value.filter((v) => v instanceof File || v instanceof Blob)
	// 					: []),
	// 			];

	// 			return total.length >= 5;
	// 		}
	// 	)
	// 	.test(
	// 		"file-type-check",
	// 		"Файл должен быть изображением (jpg, png, jpeg, webp)",
	// 		(value) => {
	// 			if (!Array.isArray(value)) return true;
	// 			return value.every((file) => {
	// 				if (!file) return true;
	// 				if (!(file instanceof File)) return true;
	// 				return ["image/jpeg", "image/png", "image/webp"].includes(file.type);
	// 			});
	// 		}
	// 	),
});

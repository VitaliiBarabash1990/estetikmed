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

export const ValidationSchema = Yup.object().shape({
	subTitleOneUa: Yup.string().required(
		"Введіть перший підзаголовок на Українській. Це обовязково!"
	),
	subTitleTwoUa: Yup.string().required(
		"Введіть другий підзаголовок на Українській. Це обовязково!"
	),

	img: Yup.array()
		.of(Yup.mixed().nullable())
		.test(
			"four-images-required",
			"Необхідно завантажити всі чотири фото",
			function (value) {
				const existingImg = this.parent?.existingImg || [];

				// Перевірка наявності 4 фото (або нові файли, або існуючі урли)
				const total = [
					...(Array.isArray(existingImg) ? existingImg : []),
					...(Array.isArray(value)
						? value.filter((v) => v instanceof File || v instanceof Blob)
						: []),
				];

				return total.length >= 4;
			}
		),
});

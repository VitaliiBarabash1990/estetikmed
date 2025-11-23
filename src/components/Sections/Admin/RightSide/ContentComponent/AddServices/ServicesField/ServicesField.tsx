"use client";
import React from "react";
import { Field, ErrorMessage } from "formik";
import s from "./ServicesField.module.css";
import AutoResizeTextarea from "./AutoResizeTextarea/AutoResizeTextarea";
import useIsMobile from "@/lib/isMobile/isMobile";

type ContentItemProps = {
	title: string; // наприклад: "Заголовок сторінки"
	description?: "description" | "price"; // якщо це підзаголовок
	lang?: "Pl" | "De";
};

const ServicesField = ({ title, description, lang }: ContentItemProps) => {
	const isMobile = useIsMobile();

	// визначаємо ім'я поля у Formik
	let fieldName = "";
	if (!description) {
		fieldName = `name${lang}`;
	} else if (description === "description") {
		fieldName = `description${lang}`;
	} else {
		fieldName = `price`;
	}

	// чи це textarea?
	const isTextarea = Boolean(description || isMobile);

	return (
		<li className={s.mainContentItem}>
			<label className={s.label}>
				<div className={s.labelName}>{title}</div>

				{isTextarea ? (
					<Field
						name={fieldName}
						component={AutoResizeTextarea}
						placeholder={`Введите ${title.toLowerCase()} ${lang?.toLowerCase()}...`}
					/>
				) : (
					<Field
						as="input"
						type="text"
						name={fieldName}
						placeholder={`Введите ${title.toLowerCase()} ${lang?.toLowerCase()}...`}
						className={s.input}
					/>
				)}
			</label>
			<ErrorMessage name={fieldName} component="p" className={s.error} />
		</li>
	);
};

export default ServicesField;

"use client";
import React from "react";
import { Field, ErrorMessage } from "formik";
import AutoResizeTextarea from "./AutoResizeTextarea/AutoResizeTextarea";
import useIsMobile from "@/lib/isMobile/isMobile";
import s from "./ReviewsField.module.css";

type ContentItemProps = {
	title: string; // наприклад: "Заголовок сторінки"
	text?: "reviews" | "answers" | "name" | "services";
	lang?: "Pl" | "De";
};

const ReviewsField = ({ title, text, lang }: ContentItemProps) => {
	const isMobile = useIsMobile();

	// визначаємо ім'я поля у Formik
	let fieldName = "";
	if (text === "reviews") {
		fieldName = `reviews${lang}`;
	} else if (text === "answers") {
		fieldName = `answers${lang}`;
	} else if (text === "name") {
		fieldName = `name${lang}`;
	} else if (text === "services") {
		fieldName = `services${lang}`;
	}

	// чи це textarea?
	const isTextarea = Boolean(
		text === "reviews" || text === "answers" || isMobile
	);

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

export default ReviewsField;

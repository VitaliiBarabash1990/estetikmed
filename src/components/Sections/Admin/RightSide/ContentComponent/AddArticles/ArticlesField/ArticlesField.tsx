"use client";
import React from "react";
import { Field, ErrorMessage } from "formik";
import AutoResizeTextarea from "./AutoResizeTextarea/AutoResizeTextarea";
import useIsMobile from "@/lib/isMobile/isMobile";
import s from "./ArticlesField.module.css";

type ContentItemProps = {
	title: string; // наприклад: "Заголовок сторінки"
	text?: "text";
	lang?: "Pl" | "De";
};

const ArticlesField = ({ title, text, lang }: ContentItemProps) => {
	const isMobile = useIsMobile();

	// визначаємо ім'я поля у Formik
	let fieldName = "";
	if (!text) {
		fieldName = `title${lang}`;
	} else if (text === "text") {
		fieldName = `text${lang}`;
	}

	// чи це textarea?
	const isTextarea = Boolean(text || isMobile);

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

export default ArticlesField;

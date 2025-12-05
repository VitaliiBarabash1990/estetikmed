"use client";
import React from "react";
import s from "./AddArticles.module.css";
import { Form, Formik, ErrorMessage, FormikHelpers } from "formik";
import { ArticleItemProps, ArticlesFormProps } from "@/lib/types/types";
import { ValidationSchemaArticles } from "@/lib/utils/validationSchema";
import Image from "next/image";
import ArticlesField from "./ArticlesField/ArticlesField";

type AddServicesProps = {
	language: string;
	id?: number;
	article?: ArticleItemProps | null;
};

const AddArticles = ({ language, id, article }: AddServicesProps) => {
	const isLanguagePl = language === "pl";
	console.log("IDTYPE", id);

	const initialValues: ArticlesFormProps = {
		titlePl: article?.title ?? "",
		titleDe: article?.title ?? "",
		textPl: article?.text ?? "",
		textDe: article?.text ?? "",
		img: null,
		existingImg: article?.img ?? "",
	};

	// medycyna", "depolacja_man", "depolacja_woman

	// 📌 Додавання зображень
	const handleImageChange = (
		e: React.ChangeEvent<HTMLInputElement>,
		setFieldValue: FormikHelpers<ArticlesFormProps>["setFieldValue"]
	) => {
		const file = e.target.files?.[0];
		if (!file) return;

		setFieldValue("img", file);
	};

	// ❌ Видалити одне фото
	const handleImageDelete = (
		setFieldValue: FormikHelpers<ArticlesFormProps>["setFieldValue"]
	) => {
		setFieldValue("img", null);
	};

	// 📤 submit
	const hundlerSubmit = (values: ArticlesFormProps) => {
		const formData = new FormData();

		formData.append("titlePl", values.titlePl);
		formData.append("titleDe", values.titleDe);
		formData.append("textPl", values.textPl);
		formData.append("textDe", values.textDe);

		if (values.img instanceof File) {
			formData.append("img", values.img);
		}

		// Якщо старе фото не видалене — передаємо його імʼя/URL
		if (!values.img && values.existingImg) {
			formData.append("existingImg", values.existingImg);
		}

		console.log("SEND FormData:", values);
	};

	return (
		<div className={s.addServicesWrapper}>
			<Formik
				initialValues={initialValues}
				validationSchema={ValidationSchemaArticles}
				onSubmit={hundlerSubmit}
				enableReinitialize
			>
				{({ values, setFieldValue, resetForm }) => (
					<Form className={s.form}>
						{isLanguagePl ? (
							<>
								<ArticlesField title="Заголовок статьи" lang="Pl" />
								<ArticlesField title="Текст статьи" text="text" lang="Pl" />
							</>
						) : (
							<>
								<ArticlesField title="Заголовок статьи" lang="De" />
								<ArticlesField title="Текст статьи" text="text" lang="De" />
							</>
						)}

						{/* 📌 Блок завантаження зображень */}
						<ul className={s.imageList}>
							<li className={`${s.imgItem} ${s.imgItemUpload}`}>
								<label className={s.uploadBox}>
									<input
										type="file"
										accept="image/*"
										onChange={(e) => handleImageChange(e, setFieldValue)}
										style={{ display: "none" }}
									/>
									<svg className={s.uploadIcon}>
										<use href="/sprite.svg#icon-upload"></use>
									</svg>
								</label>
							</li>
							{/* 📌 Прев’ю нового або існуючого зображення */}
							{(values.img || values.existingImg) && (
								<li className={`${s.imgItem} ${s.imgItemImage}`}>
									<Image
										src={
											values.img
												? URL.createObjectURL(values.img)
												: (values.existingImg as string)
										}
										alt="article-img-preview"
										width={150}
										height={100}
										className={s.imgPreview}
									/>

									<button
										type="button"
										className={s.deleteBtn}
										onClick={() => {
											// Видаляємо нове фото
											setFieldValue("img", null);
											// Видаляємо існуюче фото
											setFieldValue("existingImg", "");
										}}
									>
										<svg className={s.deleteIcon}>
											<use href="/sprite.svg#icon-delete"></use>
										</svg>
									</button>
								</li>
							)}
						</ul>

						<ErrorMessage name="img" component="p" className={s.error} />

						<div className={s.btnGroup}>
							<button type="submit" className={s.saveBtn}>
								Сохранить
							</button>

							<button
								type="button"
								className={s.cancelBtn}
								onClick={() => resetForm()}
							>
								Отменить
							</button>
						</div>
					</Form>
				)}
			</Formik>
		</div>
	);
};

export default AddArticles;

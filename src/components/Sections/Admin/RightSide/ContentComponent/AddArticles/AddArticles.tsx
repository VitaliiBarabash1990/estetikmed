"use client";
import React from "react";
import s from "./AddArticles.module.css";
import { Form, Formik, ErrorMessage, FormikHelpers } from "formik";
import { ArticlesFormProps, ArticlesPayload } from "@/lib/types/types";
import { ValidationSchemaArticles } from "@/lib/utils/validationSchema";
import Image from "next/image";
import ArticlesField from "./ArticlesField/ArticlesField";
import { useDispatch, useSelector } from "react-redux";
import { AppDispatch } from "@/redux/store";
import { createArticles, updateArticles } from "@/redux/articles/operations";
import { selectIsSuccess } from "@/redux/articles/selectors";
import ModalSuccessfull from "@/lib/utils/ModalSuccessfull/ModalSuccessfull";

type AddServicesProps = {
	language: string;
	article?: ArticlesPayload | null;
	isEdit: boolean;
};

const AddArticles = ({ language, article, isEdit }: AddServicesProps) => {
	const dispatch = useDispatch<AppDispatch>();
	const isLanguagePl = language === "pl";
	const isSuccess = useSelector(selectIsSuccess);

	const initialValues: ArticlesFormProps = {
		titlePl: isEdit ? article?.pl.title ?? "" : "",
		titleDe: isEdit ? article?.de.title ?? "" : "",
		articlePl: isEdit ? article?.pl.article ?? "" : "",
		articleDe: isEdit ? article?.de.article ?? "" : "",
		img: isEdit ? article?.img ?? "" : "", // або string, або File
	};

	// 📌 Додавання зображень
	const handleImageChange = (
		e: React.ChangeEvent<HTMLInputElement>,
		setFieldValue: FormikHelpers<ArticlesFormProps>["setFieldValue"]
	) => {
		const file = e.target.files?.[0];
		if (file) setFieldValue("img", file); // File → нове фото
	};

	// ❌ Видалити одне фото
	const handleImageDelete = (
		setFieldValue: FormikHelpers<ArticlesFormProps>["setFieldValue"]
	) => {
		setFieldValue("img", ""); // видалено → бекенд запише null
	};

	// 📤 submit
	const hundlerSubmit = (
		values: ArticlesFormProps,
		{ resetForm }: FormikHelpers<ArticlesFormProps>
	) => {
		if (!values.img) return;
		const formData = new FormData();

		formData.append("titlePl", values.titlePl);
		formData.append("titleDe", values.titleDe);
		formData.append("articlePl", values.articlePl);
		formData.append("articleDe", values.articleDe);

		// Якщо новий файл
		if (values.img instanceof File) {
			formData.append("img", values.img);
		} else {
			// Якщо старе фото (рядок)
			formData.append("img", values.img as string);
		}

		if (isEdit && article?._id) {
			dispatch(updateArticles({ id: article._id, formData }))
				.unwrap()
				.then(() => {
					resetForm();
				});
		} else if (isEdit) {
			dispatch(createArticles(formData))
				.unwrap()
				.then(() => {
					resetForm();
				});
		}
	};

	return (
		<>
			{" "}
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
								{values.img && (
									<li className={`${s.imgItem} ${s.imgItemImage}`}>
										<Image
											src={
												values.img instanceof File
													? URL.createObjectURL(values.img)
													: (values.img as string)
											}
											alt="article-img-preview"
											width={150}
											height={100}
											className={s.imgPreview}
										/>

										<button
											type="button"
											className={s.deleteBtn}
											onClick={() => handleImageDelete(setFieldValue)}
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
			{isSuccess && <ModalSuccessfull />}
		</>
	);
};

export default AddArticles;

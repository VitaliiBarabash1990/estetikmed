"use client";
import React from "react";
import s from "./AddReviews.module.css";
import { Form, Formik, ErrorMessage, FormikHelpers } from "formik";
import { ReviewsFormProps } from "@/lib/types/types";
import {
	ValidationSchemaArticles,
	ValidationSchemaReviews,
} from "@/lib/utils/validationSchema";
import Image from "next/image";
import { ReviewsItemProps } from "@/components/Sections/Reviews/SliderReviews/SliderReviews";
import ReviewsField from "./ReviewsField/ReviewsField";

type AddReviewsProps = {
	language: string;
	id?: number;
	reviews?: ReviewsItemProps | null;
};

const AddReviews = ({ language, id, reviews }: AddReviewsProps) => {
	const isLanguagePl = language === "pl";
	console.log("IDTYPE", id);

	const initialValues: ReviewsFormProps = {
		reviewsPl: reviews?.reviews ?? "",
		reviewsDe: reviews?.reviews ?? "",
		answersPl: reviews?.answers ?? "",
		answersDe: reviews?.answers ?? "",
		namePl: reviews?.name ?? "",
		nameDe: reviews?.name ?? "",
		servicesPl: reviews?.services ?? "",
		servicesDe: reviews?.services ?? "",
		img: null,
		existingImg: reviews?.img ?? "",
	};

	// medycyna", "depolacja_man", "depolacja_woman

	// 📌 Додавання зображень
	const handleImageChange = (
		e: React.ChangeEvent<HTMLInputElement>,
		setFieldValue: FormikHelpers<ReviewsFormProps>["setFieldValue"]
	) => {
		const file = e.target.files?.[0];
		if (!file) return;

		setFieldValue("img", file);
	};

	// ❌ Видалити одне фото
	const handleImageDelete = (
		setFieldValue: FormikHelpers<ReviewsFormProps>["setFieldValue"]
	) => {
		setFieldValue("img", null);
	};

	// 📤 submit
	const hundlerSubmit = (values: ReviewsFormProps) => {
		const formData = new FormData();

		formData.append("reviewsPl", values.reviewsPl);
		formData.append("reviewsDe", values.reviewsDe);
		formData.append("answersPl", values.answersPl);
		formData.append("answersDe", values.answersDe);
		formData.append("namePl", values.namePl);
		formData.append("nameDe", values.nameDe);
		formData.append("servicesPl", values.servicesPl);
		formData.append("servicesDe", values.servicesDe);

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
				validationSchema={ValidationSchemaReviews}
				onSubmit={hundlerSubmit}
				enableReinitialize
			>
				{({ values, setFieldValue, resetForm }) => (
					<Form className={s.form}>
						{isLanguagePl ? (
							<>
								<ReviewsField
									title="Отзыв клиента *"
									text="reviews"
									lang="Pl"
								/>
								<ReviewsField title="Ответ" text="answers" lang="Pl" />
								<ReviewsField title="Имя Клиента" text="name" lang="Pl" />
								<ReviewsField title="Услуга" text="services" lang="Pl" />
							</>
						) : (
							<>
								<ReviewsField
									title="Отзыв клиента *"
									text="reviews"
									lang="De"
								/>
								<ReviewsField title="Ответ" text="answers" lang="De" />
								<ReviewsField title="Имя Клиента" text="name" lang="De" />
								<ReviewsField title="Услуга" text="services" lang="De" />
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

export default AddReviews;

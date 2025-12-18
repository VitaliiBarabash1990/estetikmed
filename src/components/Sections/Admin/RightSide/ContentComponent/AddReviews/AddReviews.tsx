"use client";
import React from "react";
import s from "./AddReviews.module.css";
import { Form, Formik, ErrorMessage, FormikHelpers } from "formik";
import { ReviewsFormProps, ReviewsPayload } from "@/lib/types/types";
import { ValidationSchemaReviews } from "@/lib/utils/validationSchema";
import Image from "next/image";
import ReviewsField from "./ReviewsField/ReviewsField";
import { useDispatch, useSelector } from "react-redux";
import { AppDispatch } from "@/redux/store";
import { createReviews, updateReviews } from "@/redux/reviews/operations";
import { selectIsSuccess } from "@/redux/reviews/selectors";
import ModalSuccessfull from "@/lib/utils/ModalSuccessfull/ModalSuccessfull";

type AddReviewsProps = {
	language: string;
	reviews?: ReviewsPayload | null;
	isEdit: boolean;
};

const AddReviews = ({ language, reviews, isEdit }: AddReviewsProps) => {
	const dispatch = useDispatch<AppDispatch>();
	const isLanguagePl = language === "pl";
	const isSuccess = useSelector(selectIsSuccess);

	const initialValues: ReviewsFormProps = {
		reviewsPl: reviews?.pl.reviews ?? "",
		reviewsDe: reviews?.de.reviews ?? "",
		answersPl: reviews?.pl.answers ?? "",
		answersDe: reviews?.de.answers ?? "",
		namePl: reviews?.pl.name ?? "",
		nameDe: reviews?.de.name ?? "",
		servicesPl: reviews?.pl.services ?? "",
		servicesDe: reviews?.de.services ?? "",
		img: reviews?.img ?? "", // або string, або File
	};

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
		setFieldValue("img", ""); // видалено → бекенд запише null
	};

	// 📤 submit
	const hundlerSubmit = (
		values: ReviewsFormProps,
		{ resetForm }: FormikHelpers<ReviewsFormProps>
	) => {
		const formData = new FormData();

		formData.append("reviewsPl", values.reviewsPl);
		formData.append("reviewsDe", values.reviewsDe);
		formData.append("answersPl", values.answersPl);
		formData.append("answersDe", values.answersDe);
		formData.append("namePl", values.namePl);
		formData.append("nameDe", values.nameDe);
		formData.append("servicesPl", values.servicesPl);
		formData.append("servicesDe", values.servicesDe);

		// Якщо новий файл
		if (values.img instanceof File) {
			formData.append("img", values.img);
		} else {
			// Якщо старе фото (рядок)
			formData.append("img", values.img as string);
		}

		if (isEdit && reviews?._id) {
			dispatch(updateReviews({ id: reviews._id, formData }))
				.unwrap()
				.then(() => {
					resetForm();
				});
		} else if (isEdit) {
			dispatch(createReviews(formData))
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

export default AddReviews;

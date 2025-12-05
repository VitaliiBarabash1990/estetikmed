"use client";
import React from "react";
import s from "./AddMedia.module.css";
import { Form, Formik, ErrorMessage, FormikHelpers } from "formik";
import { MediaFormProps } from "@/lib/types/types";
import { ValidationSchemaMedia } from "@/lib/utils/validationSchema";
import Image from "next/image";

type AddMediaProps = {
	type: number;
};

const AddMedia = ({ type }: AddMediaProps) => {
	const initialValues: MediaFormProps = {
		type: type === 0 ? "image" : "video",
		imgs: [],
		videos: [],
		existingImg: [],
		existingVideos: [],
	};

	// 📌 Додавання зображень
	const handleImageChange = (
		e: React.ChangeEvent<HTMLInputElement>,
		setFieldValue: FormikHelpers<MediaFormProps>["setFieldValue"],
		values: MediaFormProps
	) => {
		const files = e.target.files;
		if (!files) return;

		const fileArray = Array.from(files).filter((f): f is File => f !== null);

		setFieldValue("imgs", [...values.imgs, ...fileArray]);
	};

	// 📌 Додавання відео
	const handleVideoChange = (
		e: React.ChangeEvent<HTMLInputElement>,
		setFieldValue: FormikHelpers<MediaFormProps>["setFieldValue"],
		values: MediaFormProps
	) => {
		const files = e.target.files;
		if (!files) return;

		const fileArray = Array.from(files).filter((f): f is File => f !== null);

		setFieldValue("videos", [...values.videos, ...fileArray]);
	};

	// ❌ Видалити одне фото
	const handleImageDelete = (
		index: number,
		setFieldValue: FormikHelpers<MediaFormProps>["setFieldValue"],
		values: MediaFormProps
	) => {
		const updated = values.imgs.filter((_, i) => i !== index);
		setFieldValue("imgs", updated);
	};

	// ❌ Видалити одне відео
	const handleVideoDelete = (
		index: number,
		setFieldValue: FormikHelpers<MediaFormProps>["setFieldValue"],
		values: MediaFormProps
	) => {
		const updated = values.videos.filter((_, i) => i !== index);
		setFieldValue("videos", updated);
	};

	// 📤 submit
	const hundlerSubmit = (values: MediaFormProps) => {
		const formData = new FormData();

		// Чітко визначаємо тип
		const mediaType = type === 0 ? "image" : "video";
		formData.append("type", mediaType);

		// Якщо фото
		if (mediaType === "image") {
			values.imgs.forEach((file) => {
				if (file instanceof File) {
					formData.append("imgs", file);
				}
			});
		}

		// Якщо відео
		if (mediaType === "video") {
			values.videos.forEach((file) => {
				if (file instanceof File) {
					formData.append("videos", file);
				}
			});
		}

		console.log("SEND FormData:", [...formData.entries()]);
	};

	return (
		<div className={s.addServicesWrapper}>
			<Formik
				initialValues={initialValues}
				validationSchema={ValidationSchemaMedia(type)}
				onSubmit={hundlerSubmit}
				enableReinitialize
			>
				{({ values, setFieldValue, resetForm }) => (
					<Form className={s.form}>
						{type !== 0 && (
							<div className={s.alarm}>
								Допускается одновременная загрузка до 13 видеофайлов. При
								превышении допустимого числа элементов новые загрузки будут
								вымещать более старые. Чтоб избежать нежелательного удаления
								контента, рекомендуется сперва вручную освободить место для
								нового файла, удалив тот, который хотите убрать. Не
								рекомендуется загружать слишком большие по объему и долгие
								видео, это может повлечь негативное влияние на скорость загрзки
								сайта.
							</div>
						)}

						{type === 0 ? (
							<>
								{/* 📌 Блок завантаження зображень */}
								<ul className={s.imageList}>
									<li className={`${s.imgItem} ${s.imgItemUpload}`}>
										<label className={s.uploadBox}>
											<input
												type="file"
												accept="image/*"
												multiple
												onChange={(e) =>
													handleImageChange(e, setFieldValue, values)
												}
												style={{ display: "none" }}
											/>
											<svg className={s.uploadIcon}>
												<use href="/sprite.svg#icon-upload"></use>
											</svg>
										</label>
									</li>

									{/* Прев'ю */}
									{values.imgs.map((img, i) => {
										// TypeScript-safe: only File can be used for preview
										const src =
											img instanceof File ? URL.createObjectURL(img) : "";

										return (
											<li key={i} className={s.imgItem}>
												<Image
													src={src}
													alt={`galery-img-${i}`}
													width={150}
													height={100}
													className={s.imgPreview}
												/>

												<button
													type="button"
													className={s.deleteBtn}
													onClick={() =>
														handleImageDelete(i, setFieldValue, values)
													}
												>
													<svg className={s.deleteIcon}>
														<use href="/sprite.svg#icon-delete"></use>
													</svg>
												</button>
											</li>
										);
									})}
								</ul>

								<ErrorMessage name="imgs" component="p" className={s.error} />
							</>
						) : (
							<>
								{/* 📌 Блок завантаження відео (тільки якщо type === 1) */}
								<ul className={s.videoList}>
									<li className={`${s.videoItem} ${s.videoItemUpload}`}>
										<label className={s.uploadBox}>
											<input
												type="file"
												accept="video/*"
												multiple
												onChange={(e) =>
													handleVideoChange(e, setFieldValue, values)
												}
												style={{ display: "none" }}
											/>
											<svg className={s.uploadIcon}>
												<use href="/sprite.svg#icon-upload"></use>
											</svg>
										</label>
									</li>

									{/* Прев'ю відео */}
									{values.videos.map((video, i) => {
										const src =
											video instanceof File ? URL.createObjectURL(video) : "";

										return (
											<li key={i} className={s.videoItem}>
												<video src={src} controls className={s.videoPreview} />

												<button
													type="button"
													className={s.deleteBtn}
													onClick={() =>
														handleVideoDelete(i, setFieldValue, values)
													}
												>
													<svg className={s.deleteIcon}>
														<use href="/sprite.svg#icon-delete"></use>
													</svg>
												</button>
											</li>
										);
									})}
								</ul>

								<ErrorMessage name="videos" component="p" className={s.error} />
							</>
						)}

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

export default AddMedia;

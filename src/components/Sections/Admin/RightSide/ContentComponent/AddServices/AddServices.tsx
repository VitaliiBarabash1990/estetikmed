"use client";
import React from "react";
import s from "./AddServices.module.css";
import { Form, Formik, ErrorMessage, FormikHelpers } from "formik";
import { ServicesFormProps } from "@/lib/types/types";
import { ValidationSchemaServices } from "@/lib/utils/validationSchema";
import ServicesField from "./ServicesField/ServicesField";
import Image from "next/image";

type AddServicesProps = {
	language: string;
	id: number;
};

const AddServices = ({ language, id }: AddServicesProps) => {
	const isLanguagePl = language === "pl";
	console.log("IDTYPE", id);

	const categoryToId: Record<number, string> = {
		0: "medycyna",
		1: "depilacja_woman",
		2: "depilacja_man",
	};

	const initialValues: ServicesFormProps = {
		namePl: "",
		nameDe: "",
		descriptionPl: "",
		descriptionDe: "",
		price: 0,
		type: categoryToId[id],
		imgs: [],
		existingImg: [],
	};

	// medycyna", "depolacja_man", "depolacja_woman

	// 📌 Додавання зображень
	const handleImageChange = (
		e: React.ChangeEvent<HTMLInputElement>,
		setFieldValue: FormikHelpers<ServicesFormProps>["setFieldValue"],
		values: ServicesFormProps
	) => {
		const files = e.target.files;
		if (!files) return;

		const fileArray = Array.from(files).filter((f): f is File => f !== null);

		setFieldValue("imgs", [...values.imgs, ...fileArray]);
	};

	// ❌ Видалити одне фото
	const handleImageDelete = (
		index: number,
		setFieldValue: FormikHelpers<ServicesFormProps>["setFieldValue"],
		values: ServicesFormProps
	) => {
		const updated = values.imgs.filter((_, i) => i !== index);
		setFieldValue("imgs", updated);
	};

	// 📤 submit
	const hundlerSubmit = (values: ServicesFormProps) => {
		const formData = new FormData();

		formData.append("namePl", values.namePl);
		formData.append("nameDe", values.nameDe);
		formData.append("descriptionPl", values.descriptionPl);
		formData.append("descriptionDe", values.descriptionDe);
		formData.append("price", String(values.price));
		formData.append("type", categoryToId[id]);

		values.imgs.forEach((file) => {
			if (file instanceof File) {
				formData.append("imgs", file);
			}
		});

		console.log("SEND FormData:", values);
	};

	return (
		<div className={s.addServicesWrapper}>
			<Formik
				initialValues={initialValues}
				validationSchema={ValidationSchemaServices}
				onSubmit={hundlerSubmit}
				enableReinitialize
			>
				{({ values, setFieldValue, resetForm }) => (
					<Form className={s.form}>
						{isLanguagePl ? (
							<>
								<ServicesField title="Название услуги" lang="Pl" />
								<ServicesField
									title="Описание"
									description="description"
									lang="Pl"
								/>
							</>
						) : (
							<>
								<ServicesField title="Название услуги" lang="De" />
								<ServicesField
									title="Описание"
									description="description"
									lang="De"
								/>
							</>
						)}

						<ServicesField title="Цена, PLN" description="price" />

						{/* 📌 Блок завантаження зображень */}
						<ul className={s.imageList}>
							<li className={s.imgItem}>
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
								const src = img instanceof File ? URL.createObjectURL(img) : "";

								return (
									<li key={i} className={s.imgItem}>
										<Image
											src={src}
											alt={`service-img-${i}`}
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

export default AddServices;

"use client";
import { ErrorMessage, Field, Form, Formik } from "formik";
import React from "react";
import s from "./FormCallback.module.css";
import { useTranslations } from "next-intl";
import AutoResizeTextarea from "./AutoResizeTextarea/AutoResizeTextarea";
import { useDispatch } from "react-redux";
import { AppDispatch } from "@/redux/store";
import { sendOrderEmail, sendOrderTelegram } from "@/redux/auth/operations";
import { ValidationSchemaCallback } from "@/lib/utils/validationSchema";

type FormCallBackProps = {
	name: string;
	phone: string;
	email: string;
	message: string;
	file: File | null;
};

const FormCallback = () => {
	const dispatch = useDispatch<AppDispatch>();
	const t = useTranslations("Callback");
	const initialValues: FormCallBackProps = {
		name: "",
		phone: "",
		email: "",
		message: "",
		file: null,
	};

	const handlerSubmit = (values: FormCallBackProps) => {
		const formData = new FormData();

		formData.append("name", values.name);
		formData.append("phone", values.phone);
		formData.append("email", values.email);
		formData.append("message", values.message);

		if (values.file) {
			formData.append("file", values.file);
		}

		dispatch(sendOrderEmail(formData));
		dispatch(sendOrderTelegram(formData));
	};

	return (
		<div className={s.callbackFormWrapper}>
			<div className={s.titleBlock}>
				<div className={s.title}>
					<h3
						className={s.titleTop}
						dangerouslySetInnerHTML={{
							__html: t("titleTop").replace(
								/(\S+)$/,
								`<span class="${s.lastWord}">$1</span>`
							),
						}}
					/>
					<h3
						className={s.titleBottom}
						dangerouslySetInnerHTML={{
							__html: t("titleBottom").replace(
								/(\S+)$/,
								`<span class="${s.lastWord}">$1</span>`
							),
						}}
					/>
				</div>
			</div>
			<Formik
				initialValues={initialValues}
				validationSchema={ValidationSchemaCallback}
				onSubmit={handlerSubmit}
			>
				{({ setFieldValue }) => (
					<Form className={s.form}>
						<div className={s.componentField}>
							<label className={s.label}>
								<span className={s.labelTitle}>{t("name")}</span>
								<Field type="text" name="name" className={s.input} />
							</label>
							<ErrorMessage name="name" component="p" className={s.error} />
						</div>
						<div className={s.componentField}>
							<label className={s.label}>
								<span className={s.labelTitle}>{t("phone")}</span>
								<Field type="text" name="phone" className={s.input} />
							</label>
							<ErrorMessage name="phone" component="p" className={s.error} />
						</div>
						<div className={s.componentField}>
							<label className={s.label}>
								<span className={s.labelTitle}>{t("email")}</span>
								<Field type="email" name="email" className={s.input} />
							</label>
							<ErrorMessage name="email" component="p" className={s.error} />
						</div>
						<div className={s.componentField}>
							<label className={s.label}>
								<span className={s.labelTitle}>{t("message")}</span>
								<Field
									name="message"
									component={AutoResizeTextarea}
									className={s.textArea}
								/>
							</label>
							<ErrorMessage name="message" component="p" className={s.error} />
						</div>
						<div className={s.fileBtnGroup}>
							<label className={s.labelFile} htmlFor="fileUpload">
								<span className={s.labelTitle}>{t("file")}</span>

								<svg className={s.fileIcon}>
									<use href="/sprite.svg#icon-hugeicons_file-upload1"></use>
								</svg>

								<input
									id="fileUpload"
									type="file"
									name="file"
									onChange={(e) => {
										setFieldValue("file", e.currentTarget.files?.[0] || null);
									}}
									className={s.fileInputHidden}
								/>
							</label>

							<button className={s.btnFile}>{t("btn")}</button>
						</div>
					</Form>
				)}
			</Formik>
		</div>
	);
};

export default FormCallback;

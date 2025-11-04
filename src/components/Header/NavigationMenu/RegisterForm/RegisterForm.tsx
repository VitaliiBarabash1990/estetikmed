"use client";
import React, { useState } from "react";
import { Formik, Form, Field, ErrorMessage } from "formik";
import { RegisterProps } from "@/lib/types/types";
import s from "./RegisterForm.module.css";
import { useTranslations } from "next-intl";
import { validationSchemaRegister } from "@/lib/utils/validationSchema";
import { useDispatch } from "react-redux";
import { AppDispatch } from "@/redux/store";
import { adminLogIn } from "@/redux/auth/operations";

const RegisterForm = () => {
	const dispatch = useDispatch<AppDispatch>();
	const t = useTranslations("Hero");
	const [showPassword, setShowPassword] = useState(false);
	console.log("ShowPassword", showPassword);
	const initialValues: RegisterProps = {
		email: "",
		password: "",
	};
	const hundlerVisual = () => {
		setShowPassword((prev) => !prev);
	};
	const hundlerSubmit = (values: RegisterProps) => {
		const dataForm = {
			email: values.email,
			password: values.password,
		};
		dispatch(adminLogIn(dataForm));

		console.log("DataForm", dataForm);
	};

	return (
		<div className={s.registerWrapper}>
			<h3 className={s.registerTitle}>{t("register_form")}</h3>
			<Formik
				initialValues={initialValues}
				validationSchema={validationSchemaRegister}
				onSubmit={hundlerSubmit}
			>
				<Form className={s.form}>
					<div className={s.field}>
						<label className={s.label}>
							<Field name="email" type="email" className={s.input} />
						</label>
						<ErrorMessage name="email" component="p" className={s.error} />
					</div>

					<div className={s.field}>
						<label className={`${s.label} ${s.pass}`}>
							<Field
								name="password"
								type={showPassword ? "text" : "password"}
								autoComplete="new-password"
								className={s.input}
							/>
							<div className={s.iconWrap} onClick={() => hundlerVisual()}>
								<svg className={s.iconOir}>
									<use
										href={
											showPassword
												? "/sprite.svg#icon-iconoir-close"
												: "/sprite.svg#icon-iconoir"
										}
									></use>
								</svg>
							</div>
						</label>
						<ErrorMessage name="password" component="p" className={s.error} />
					</div>

					<button type="submit" className={s.btn}>
						{t("btn_enter")}
					</button>
				</Form>
			</Formik>
		</div>
	);
};

export default RegisterForm;

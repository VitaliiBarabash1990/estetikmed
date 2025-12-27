"use client";
import React, { useState } from "react";
import { Formik, Form, Field, ErrorMessage } from "formik";
import { RegisterProps } from "@/lib/types/types";
import s from "./RegisterForm.module.css";
import { useTranslations } from "next-intl";
import { validationSchemaRegister } from "@/lib/utils/validationSchema";
import { useDispatch, useSelector } from "react-redux";
import { AppDispatch } from "@/redux/store";
import { adminLogIn } from "@/redux/auth/operations";
import { useRouter } from "@/i18n/routing";
import { selectIsError } from "@/redux/auth/selectors";

const RegisterForm = () => {
	const dispatch = useDispatch<AppDispatch>();
	const router = useRouter();
	const t = useTranslations("Hero");
	const [showPassword, setShowPassword] = useState(false);
	const isError = useSelector(selectIsError);
	const initialValues: RegisterProps = {
		email: "",
		password: "",
	};
	const hundlerVisual = () => {
		setShowPassword((prev) => !prev);
	};

	const hundlerSubmit = async (values: RegisterProps) => {
		const dataForm = {
			email: values.email,
			password: values.password,
		};

		try {
			await dispatch(adminLogIn(dataForm)).unwrap();
			// ✅ якщо дійшли сюди — логін успішний
			router.push("/admin");
		} catch (error) {
			// ❌ логін неуспішний
			console.error("Login failed:", error);
		}
	};

	return (
		<>
			{" "}
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
									autoComplete="current-password"
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
			{isError && (
				<h2 className={s.textError}>
					Ошибка авторизаци. Введите правильный логин и пароль!
				</h2>
			)}
		</>
	);
};

export default RegisterForm;

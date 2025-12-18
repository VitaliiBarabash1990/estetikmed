"use client";
import React, { useEffect } from "react";
import s from "./Footer.module.css";
import { useTranslations } from "next-intl";
import { useDispatch, useSelector } from "react-redux";
import { selectIsToken } from "@/redux/auth/selectors";
import { AppDispatch } from "@/redux/store";
import { authEnter } from "@/redux/auth/authSlice";
import WrapperForComponents from "@/lib/utils/WrapperForComponents/WrapperForComponents";
import { logOut } from "@/redux/auth/operations";
import { useRouter } from "@/i18n/routing";

const Footer = () => {
	const dispatch = useDispatch<AppDispatch>();
	const t = useTranslations("Footer");
	const isToken = useSelector(selectIsToken);
	const router = useRouter();

	const hundlerSwitchEnterAuth = () => {
		dispatch(authEnter());
	};
	const hundlerSwitchExitAuth = () => {
		dispatch(logOut());
		setTimeout(() => {
			router.push("/");
		}, 500);
	};

	return (
		<WrapperForComponents paddingTop={40} paddingBottom={40}>
			<div className={s.footerWrapper}>
				<div className={s.footerInfo}>
					<h5 className={s.text}>2025 ESTETIKMED</h5>
					<h5 className={s.text}> All rights reserved</h5>
				</div>
				<div className={s.footerBtn}>
					<button
						type="button"
						className={s.enterBtn}
						onClick={isToken ? hundlerSwitchExitAuth : hundlerSwitchEnterAuth}
					>
						{isToken ? t("exit") : t("enter")}
					</button>
				</div>
			</div>
		</WrapperForComponents>
	);
};

export default Footer;

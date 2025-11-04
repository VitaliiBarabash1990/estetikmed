"use client";
import React from "react";
import s from "./Footer.module.css";
import { useTranslations } from "next-intl";
import { useDispatch, useSelector } from "react-redux";
import { selectIsEnterAuth } from "@/redux/auth/selectors";
import { AppDispatch } from "@/redux/store";
import { authEnter, authExit } from "@/redux/auth/authSlice";
import WrapperForComponents from "@/lib/utils/WrapperForComponents/WrapperForComponents";

const Footer = () => {
	const dispatch = useDispatch<AppDispatch>();
	const t = useTranslations("Footer");
	const isEnterAuth = useSelector(selectIsEnterAuth);

	const hundlerSwitchEnterAuth = () => {
		dispatch(authEnter());
	};
	const hundlerSwitchExitAuth = () => {
		dispatch(authExit());
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
						onClick={
							isEnterAuth ? hundlerSwitchExitAuth : hundlerSwitchEnterAuth
						}
					>
						{isEnterAuth ? t("exit") : t("enter")}
					</button>
				</div>
			</div>
		</WrapperForComponents>
	);
};

export default Footer;

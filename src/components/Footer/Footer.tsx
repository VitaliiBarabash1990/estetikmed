"use client";
import React from "react";
import s from "./Footer.module.css";
import { useTranslations } from "next-intl";
import { useDispatch, useSelector } from "react-redux";
import { selectIsToken } from "@/redux/auth/selectors";
import { AppDispatch } from "@/redux/store";
import { authEnter } from "@/redux/auth/authSlice";
import WrapperForComponents from "@/lib/utils/WrapperForComponents/WrapperForComponents";
import { logOut } from "@/redux/auth/operations";
import { useRouter } from "@/i18n/routing";
import Image from "next/image";

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
					<a
						href="https://www.7flows.studio"
						className={s.studioLink}
						target="_blank"
					>
						<Image //add image
							src="/img/Footer/Logo.svg"
							alt="logo web studio"
							width={39}
							height={36}
						/>
						<p className={s.studioLinkText}>7flows.studio created</p>
					</a>
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

"use client";
import React, { useEffect, useState } from "react";
import s from "./Header.module.css";
import BurgerButton from "./BurgerButton/BurgerButton";
import LanguageSwitcher from "./LanguageSwitcher/LanguageSwitcher";
import { NavigationMenu } from "./NavigationMenu/NavigationMenu";
import { useSelector } from "react-redux";
import { selectIsEnterAuth, selectIsToken } from "@/redux/auth/selectors";
import { usePathname } from "@/i18n/routing";
import LogoAdmin from "./LogoAdmin/LogoAdmin";

const Header = () => {
	const [openMenu, setOpenMenu] = useState(false);

	const path = usePathname().split("/")[1];

	useEffect(() => {
		if (openMenu) {
			document.body.classList.add("no-scroll");
			document.documentElement.classList.add("no-scroll");
		} else {
			document.body.classList.remove("no-scroll");
			document.documentElement.classList.remove("no-scroll");
		}
		return () => {
			document.body.classList.remove("no-scroll");
			document.documentElement.classList.remove("no-scroll");
		};
	}, [openMenu]);

	const isEnterAuth = useSelector(selectIsEnterAuth);
	const isToken = useSelector(selectIsToken);
	console.log("isEnterAuth", isEnterAuth);

	useEffect(() => {
		if (isEnterAuth) {
			setOpenMenu(true);
		} else if (isToken) setOpenMenu(false);
	}, [isEnterAuth, isToken]);

	return (
		<>
			<div
				className={`${s.headerWrapper} ${
					path === "admin" || path === "blog" ? s.relative : s.fixed
				}`}
			>
				<LanguageSwitcher />

				<LogoAdmin />

				<BurgerButton openMenu={openMenu} setOpenMenu={setOpenMenu} />
			</div>
			<div className={`${s.menuHead} ${openMenu ? s.open : ""}`}>
				<NavigationMenu setOpenMenu={setOpenMenu} openMenu={openMenu} />
			</div>
		</>
	);
};

export default Header;

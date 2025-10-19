"use client";
import React, { useEffect, useState } from "react";
import s from "./Header.module.css";
import BurgerButton from "./BurgerButton/BurgerButton";
import LanguageSwitcher from "./LanguageSwitcher/LanguageSwitcher";

const Header = () => {
	const [openMenu, setOpenMenu] = useState(false);
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
	return (
		<div className={s.headerWrapper}>
			<LanguageSwitcher />

			<BurgerButton openMenu={openMenu} setOpenMenu={setOpenMenu} />
		</div>
	);
};

export default Header;

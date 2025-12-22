import React, { Dispatch, SetStateAction } from "react";
import s from "./BurgerButton.module.css";
import clsx from "clsx";
import { usePathname } from "@/i18n/routing";

type BurgerProps = {
	setOpenMenu: Dispatch<SetStateAction<boolean>>;
	openMenu: boolean;
	section?: string;
};

const BurgerButton = ({ setOpenMenu, openMenu, section }: BurgerProps) => {
	const pathname = usePathname();
	const path = pathname.split("/")[1];

	// ✅ одна логіка, як домовлялись
	const isContacts = section === "contacts";
	const isDarkSection = path === "admin" || path === "blog" || isContacts;

	const handlerBurgerMenu = () => {
		setOpenMenu((prev) => !prev);
	};

	return (
		<div className={s.burgerMenu} onClick={handlerBurgerMenu}>
			<svg
				className={clsx(
					s.burgerIcon,
					isDarkSection && s.darkColor,
					isContacts && s.whiteText, // ❗ ОСЬ ВОНО
					openMenu ? s.iconClose : s.iconOpen
				)}
			>
				<use
					href={
						openMenu
							? "/sprite.svg#icon-burger-menu-close"
							: "/sprite.svg#icon-burger-menu"
					}
				/>
			</svg>
		</div>
	);
};

export default BurgerButton;

import React, { Dispatch, SetStateAction } from "react";
import s from "./BurgerButton.module.css";
import clsx from "clsx";
import { usePathname } from "@/i18n/routing";

type BurgerProps = {
	setOpenMenu: Dispatch<SetStateAction<boolean>>;
	openMenu: boolean;
};

const BurgerButton = ({ setOpenMenu, openMenu }: BurgerProps) => {
	const path = usePathname().split("/")[1];
	// console.log("OpenMenu", openMenu);
	const hundlerBurgerMenu = () => {
		setOpenMenu((prev) => !prev);
	};
	return (
		<div className={s.burgerMenu} onClick={hundlerBurgerMenu}>
			<svg
				className={clsx(
					s.burgerIcon,
					path === "admin" ? s.darkColor : "",
					openMenu ? s.iconClose : s.iconOpen
				)}
			>
				<use
					href={
						openMenu
							? "/sprite.svg#icon-burger-menu-close"
							: "/sprite.svg#icon-burger-menu"
					}
				></use>
			</svg>
		</div>
	);
};

export default BurgerButton;

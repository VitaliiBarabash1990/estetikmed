"use client";

import s from "./NavigationMenu.module.css";
import { LocalizedScrollLink } from "../LocalizedScrollLink/LocalizedScrollLink";
import { SetStateAction } from "react";
import Image from "next/image";
import LanguageSwitcher from "../LanguageSwitcher/LanguageSwitcher";
import BurgerButton from "../BurgerButton/BurgerButton";
import { useTranslations } from "next-intl";
import { useSelector } from "react-redux";
import { selectIsEnterAuth, selectIsLoggedIn } from "@/redux/auth/selectors";
import RegisterForm from "./RegisterForm/RegisterForm";

type MyComponentProps = {
	setOpenMenu: React.Dispatch<SetStateAction<boolean>>;
	openMenu: boolean;
};

type LinkData = {
	id: number;
	link: string;
	text: string;
};

export const NavigationMenu = ({ setOpenMenu, openMenu }: MyComponentProps) => {
	const t = useTranslations("Hero");
	const isEnterAuth = useSelector(selectIsEnterAuth);
	// const isLoggedIn = useSelector(selectIsLoggedIn);
	const isLoggedIn = false;
	const linkDatas: LinkData[] = [
		{ id: 0, link: "/Admin", text: t("menu.0") },
		{ id: 1, link: "AboutMe", text: t("menu.1") },
		{ id: 2, link: "BlogSwiper", text: t("menu.2") },
		{ id: 3, link: "Barber", text: t("menu.3") },
		{ id: 4, link: "Psychologist", text: t("menu.4") },
		{ id: 5, link: "Gallery", text: t("menu.5") },
		{ id: 6, link: "Contacts", text: t("menu.6") },
	];
	const linksDatasCurrent = !isLoggedIn
		? linkDatas.filter((item) => item.id !== 0)
		: linkDatas;

	const handlerSubmit = () => setOpenMenu(false);

	return (
		<div className={s.navMenuWrapper}>
			<div className={s.menu}>
				<LanguageSwitcher />
				<div className={s.menuLogo}>
					<Image
						src="/img/Hero/logo.svg"
						alt={`logo`}
						fill // замість width/height
						style={{ objectFit: "cover", objectPosition: "center" }} // замощення
						sizes="100vw" // опційно для адаптивності
					/>
				</div>
				<BurgerButton setOpenMenu={handlerSubmit} openMenu={openMenu} />
			</div>

			{!isEnterAuth && (
				<ul className={s.navMenuList}>
					{linksDatasCurrent.map((linkData) => (
						<li key={linkData.id} className={s.navMenuItem}>
							<LocalizedScrollLink
								href="/"
								scrollId={linkData.link}
								className={s.navMenuLink}
								onClick={handlerSubmit}
							>
								{linkData.text}
							</LocalizedScrollLink>
							<div className={s.fadingLine}></div>
						</li>
					))}
				</ul>
			)}

			{isEnterAuth && <RegisterForm />}
			<div
				className={`${s.menuBlockCta} ${
					isEnterAuth && s.menuBlockCtaAuthEnter
				}`}
			>
				<h2 className={s.subtitleMenu}>{t("sub_title")}</h2>
				{!isEnterAuth && (
					<div className={s.blockBtn}>
						<button type="button" className={s.menuBtn}>
							{t("button_1")}
						</button>
						<button type="button" className={s.menuBtn}>
							{t("button_2")}
						</button>
					</div>
				)}
			</div>
		</div>
	);
};

{
	/* <NavigationLink
				className={s.navMenu__link}
				href={linkData.link}
				onClick={handlerSubmit}
			>
				{linkData.text}
			</NavigationLink> */
}

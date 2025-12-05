"use client";

import s from "./NavigationMenu.module.css";
import { LocalizedScrollLink } from "../LocalizedScrollLink/LocalizedScrollLink";
import { SetStateAction } from "react";
import LanguageSwitcher from "../LanguageSwitcher/LanguageSwitcher";
import BurgerButton from "../BurgerButton/BurgerButton";
import { useTranslations } from "next-intl";
import { useSelector } from "react-redux";
import { selectIsEnterAuth, selectIsToken } from "@/redux/auth/selectors";
import RegisterForm from "./RegisterForm/RegisterForm";
import Logo from "./Logo/Logo";
import { Link, Pathnames } from "@/i18n/routing";

type MyComponentProps = {
	setOpenMenu: React.Dispatch<SetStateAction<boolean>>;
	openMenu: boolean;
};

type LinkData =
	| { id: number; type: "route"; link: Pathnames; text: string }
	| { id: number; type: "scroll"; link: string; text: string };

export const NavigationMenu = ({ setOpenMenu, openMenu }: MyComponentProps) => {
	const t = useTranslations("Hero");
	const isEnterAuth = useSelector(selectIsEnterAuth);
	const isToken = useSelector(selectIsToken);
	const linkDatas: LinkData[] = [
		{ id: 0, type: "route", link: "/admin" as Pathnames, text: t("menu.0") },
		{ id: 1, type: "scroll", link: "about", text: t("menu.1") },
		{ id: 2, type: "scroll", link: "BlogSwiper", text: t("menu.2") },
		{ id: 3, type: "scroll", link: "Barber", text: t("menu.3") },
		{ id: 4, type: "scroll", link: "Psychologist", text: t("menu.4") },
		{ id: 5, type: "scroll", link: "Gallery", text: t("menu.5") },
		{ id: 6, type: "scroll", link: "Contacts", text: t("menu.6") },
	];
	const linksDatasCurrent = !isToken
		? linkDatas.filter((item) => item.id !== 0)
		: linkDatas;

	const handlerSubmit = () => setOpenMenu(false);

	return (
		<div className={s.navMenuWrapper}>
			<div className={s.menu}>
				<LanguageSwitcher />
				<Logo />
				<BurgerButton setOpenMenu={handlerSubmit} openMenu={openMenu} />
			</div>

			{!isEnterAuth && (
				<ul className={s.navMenuList}>
					{linksDatasCurrent.map((item) => (
						<li key={item.id} className={s.navMenuItem}>
							{item.type === "route" ? (
								<Link
									href={item.link}
									className={s.navMenuLink}
									onClick={handlerSubmit}
								>
									{item.text}
								</Link>
							) : (
								<LocalizedScrollLink
									href="/"
									scrollId={item.link}
									className={s.navMenuLink}
									onClick={handlerSubmit}
								>
									{item.text}
								</LocalizedScrollLink>
							)}
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

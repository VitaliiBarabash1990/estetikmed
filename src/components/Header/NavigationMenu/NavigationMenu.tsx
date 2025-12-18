"use client";

import s from "./NavigationMenu.module.css";
import { LocalizedScrollLink } from "../LocalizedScrollLink/LocalizedScrollLink";
import { SetStateAction } from "react";
import LanguageSwitcher from "../LanguageSwitcher/LanguageSwitcher";
import BurgerButton from "../BurgerButton/BurgerButton";
import { useTranslations } from "next-intl";
import { useDispatch, useSelector } from "react-redux";
import { selectIsEnterAuth, selectIsToken } from "@/redux/auth/selectors";
import RegisterForm from "./RegisterForm/RegisterForm";
import Logo from "./Logo/Logo";
import { Link, Pathnames, usePathname } from "@/i18n/routing";
import { AppDispatch } from "@/redux/store";
import { authExit } from "@/redux/auth/authSlice";
import { useRouter } from "next/navigation";

type MyComponentProps = {
	setOpenMenu: React.Dispatch<SetStateAction<boolean>>;
	openMenu: boolean;
};

type LinkData =
	| { id: number; type: "route"; link: Pathnames; text: string }
	| { id: number; type: "scroll"; link: string; text: string };

export const NavigationMenu = ({ setOpenMenu, openMenu }: MyComponentProps) => {
	const dispatch = useDispatch<AppDispatch>();
	const t = useTranslations("Hero");
	const isEnterAuth = useSelector(selectIsEnterAuth);
	const isToken = useSelector(selectIsToken);
	const path = usePathname().split("/")[1];
	const router = useRouter();
	const linkDatas: LinkData[] = [
		{ id: 0, type: "route", link: "/admin" as Pathnames, text: t("menu.0") },
		{ id: 1, type: "scroll", link: "About", text: t("menu.1") },
		{ id: 2, type: "scroll", link: "Services", text: t("menu.2") },
		{ id: 3, type: "scroll", link: "Articles", text: t("menu.3") },
		{ id: 4, type: "scroll", link: "Faq", text: t("menu.4") },
		{ id: 5, type: "scroll", link: "CallbackForm", text: t("menu.5") },
		{ id: 6, type: "scroll", link: "Contacts", text: t("menu.6") },
	];
	const linksDatasCurrent =
		!isToken || path === "admin"
			? linkDatas.filter((item) => item.id !== 0)
			: linkDatas;

	const handlerSubmit = () => {
		setOpenMenu(false);
		dispatch(authExit());
	};
	const closeMenuOnly = () => {
		setOpenMenu(false);
	};

	const handleScrollLinkClick = (scrollId: string) => (e: React.MouseEvent) => {
		// ❗️тільки закриваємо меню
		closeMenuOnly();

		if (path === "admin" || path === "blog") {
			e.preventDefault();
			router.push(`/?scroll=${scrollId}`);
		}
	};

	return (
		<div className={s.navMenuWrapper}>
			<div className={s.blokTopMenu}>
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
										// onClick={handlerSubmit}
										onClick={
											path === "admin" || path === "blog"
												? handleScrollLinkClick(item.link)
												: handlerSubmit
										}
									>
										{item.text}
									</LocalizedScrollLink>
								)}
								<div className={s.fadingLine}></div>
							</li>
						))}
					</ul>
				)}
			</div>

			{isEnterAuth && <RegisterForm />}
			<div
				className={`${s.menuBlockCta} ${
					isEnterAuth && s.menuBlockCtaAuthEnter
				}`}
			>
				<h2 className={s.subtitleMenu}>{t("sub_title")}</h2>
				{!isEnterAuth && (
					<div className={s.blockBtn}>
						{/* <button type="button" className={s.menuBtn}>
							{t("button_1")}
						</button> */}
						<a
							href="https://booksy.com/pl-pl/202886_medycyna-estetyczna-laser-diodowy_medycyna-estetyczna_19380_swinoujscie?do=invite&_branch_match_id=1529221794714245955&utm_medium=profile_share_from_profile&_branch_referrer=H4sIAAAAAAAAA8soKSkottLXT07J0UvKz88urtRLzs%2FVDymIKAjLtTTxjkiyrytKTUstKsrMS49PKsovL04tsnXLBIrlVwAAnvjsTz0AAAA%3D"
							target="_blank"
							rel="noopener noreferrer"
							className={s.menuBtn}
						>
							{t("button_1")}
						</a>
						<LocalizedScrollLink
							href="/"
							scrollId="CallbackForm"
							className={s.menuBtn}
							onClick={handleScrollLinkClick("CallbackForm")}
						>
							{t("button_2")}
						</LocalizedScrollLink>
						{/* <a
							href="#CallbackForm"
							className={s.menuBtn}
							onClick={handlerSubmit}
						>
							{t("button_2")}
						</a> */}
						{/* <button type="button" className={s.menuBtn}>
							{t("button_2")}
						</button> */}
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

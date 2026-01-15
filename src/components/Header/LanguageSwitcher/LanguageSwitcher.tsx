"use client";
import { routing, usePathname, useRouter } from "@/i18n/routing";
import { useLocale } from "next-intl";
import React, { useTransition } from "react";
import s from "./LanguageSwitcher.module.css";

type Props = {
	section?: string;
};

const LanguageSwitcher = ({ section }: Props) => {
	const router = useRouter();
	const pathname = usePathname();
	const path = pathname.split("/")[1];
	const [isPending, startTransition] = useTransition();

	const locale = useLocale();

	// 👉 винесена логіка
	const isNavMenu = section === "navmenu";
	const isContacts = section === "contacts";
	const isDarkSection = path === "admin" || path === "blog" || isContacts;

	// 🔥 Перемикач локалі
	const handleLocaleChange = (nextLocale: string) => {
		if (nextLocale === locale) return;

		startTransition(() => {
			router.replace(pathname, { locale: nextLocale });
		});
	};

	return (
		<ul className={s.menuLanguageList}>
			{routing.locales.map((item) => (
				<React.Fragment key={item}>
					<li
						className={`${s.menuLanguageItem}
							${isDarkSection ? s.darkColor : ""}
							${isNavMenu ? s.whiteText : ""}
							${item === locale ? s.activeLang : ""}
						`}
						onClick={() => handleLocaleChange(item)}
					>
						{item === "pl" ? "PL" : "DEU"}
					</li>

					<div
						className={`${s.separator}
							${isDarkSection ? s.darkColor : ""}
							${isNavMenu ? s.whiteText : ""}
						`}
					>
						|
					</div>
				</React.Fragment>
			))}
		</ul>
	);
};

export default LanguageSwitcher;

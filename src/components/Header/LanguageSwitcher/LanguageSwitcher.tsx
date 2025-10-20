import { routing, usePathname, useRouter } from "@/i18n/routing";
import { useLocale } from "next-intl";
import React, { useTransition } from "react";
import s from "./LanguageSwitcher.module.css";

const LanguageSwitcher = () => {
	const router = useRouter();
	const pathname = usePathname();
	const [isPending, startTransition] = useTransition();

	const locale = useLocale();

	// 🔥 Перемикач локалі
	const handleLocaleChange = (nextLocale: string) => {
		if (nextLocale === locale) return;

		startTransition(() => {
			router.replace(pathname, { locale: nextLocale }); // 🔹 без params
		});
	};

	return (
		<ul className={s.menuLanguageList}>
			{routing.locales.map((item) => (
				<React.Fragment key={item}>
					<li
						className={`${s.menuLanguageItem} ${
							item === locale ? s.activeLang : ""
						}`}
						onClick={() => handleLocaleChange(item)}
					>
						{item === "pl" ? "PLK" : "DEU".toUpperCase()}
					</li>
					<div className={s.separator}>|</div>
				</React.Fragment>
			))}
		</ul>
	);
};

export default LanguageSwitcher;

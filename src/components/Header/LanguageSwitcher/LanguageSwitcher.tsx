import { routing, usePathname, useRouter } from "@/i18n/routing";
import { useLocale } from "next-intl";
import React, { useTransition } from "react";
import s from "./LanguageSwitcher.module.css";

type Props = {
	section?: string;
};

const LanguageSwitcher = ({ section }: Props) => {
	const router = useRouter();
	// const path = usePathname().split("/")[1];
	const pathname = usePathname();
	const path = pathname.split("/")[1];
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
							path === "admin" || path === "blog" || section === "contacts"
								? s.darkColor
								: ""
						} ${item === locale ? s.activeLang : ""}`}
						onClick={() => handleLocaleChange(item)}
					>
						{item === "pl" ? "PLK" : "DEU".toUpperCase()}
					</li>
					<div
						className={`${s.separator} ${
							path === "admin" || path === "blog" || section === "contacts"
								? s.darkColor
								: ""
						}`}
					>
						|
					</div>
				</React.Fragment>
			))}
		</ul>
	);
};

export default LanguageSwitcher;

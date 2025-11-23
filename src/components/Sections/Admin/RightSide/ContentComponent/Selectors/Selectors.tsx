import React, { SetStateAction, useState } from "react";
import s from "./Selectors.module.css";
import useIsMobile from "@/lib/isMobile/isMobile";

type SelectorsProps = {
	type: string;
	category: number;
	option: number;
	language: string;
	setCategory: React.Dispatch<SetStateAction<number>>;
	setOption: React.Dispatch<SetStateAction<number>>;
	setLanguage: React.Dispatch<SetStateAction<string>>;
};

const Selectors: React.FC<SelectorsProps> = ({
	type,
	option,
	category,
	language,
	setCategory,
	setOption,
	setLanguage,
}) => {
	const [subHidden, setSubHidden] = useState(true);
	const [mainCategory, setMainCategory] = useState<number | null>(null);

	const isMobile = useIsMobile();

	const services = ["Мои услуги", "Добавить услугу"];
	const languages = ["Польский", "Немецкий"];
	const categories = isMobile
		? [
				"Medycyna", // 0
				"Depilacja", // 1 (main)
				"Dla kobiet", // 2 (sub)
				"Dla mężczyzn",
		  ]
		: [
				"Medycyna estetyczna i regeneracyjna", // 0
				"Depilacja laserowa", // 1 (main)
				"Depilacja laserowa dla kobiet", // 2 (sub)
				"Depilacja laserowa dla mężczyzn", // 3 (sub)
		  ];
	return (
		<div className={s.selectors}>
			<ul className={s.servicesOptionsList}>
				{services.map((item, idx) => (
					<li
						key={idx}
						className={`${s.servicesOptionsItem} ${
							option === idx ? s.activeOptions : ""
						}`}
						onClick={() => setOption(idx)}
					>
						{item}
					</li>
				))}
			</ul>

			<ul className={s.servicesCategoryList}>
				{categories.map((item, index) => {
					const isMain = index === 1;
					const isSub = index === 2 || index === 3;

					// Якщо підкатегорії сховані у верхньому списку — не рендеримо їх тут
					if (subHidden && isSub) return null;

					const isActiveMain = mainCategory === 1 && index === 1; // підсвічування головного
					const isActiveCat = category === index; // підсвічування вибраної підкатегорії / категорії

					return (
						<li
							key={index}
							className={`${s.servicesCategoryItem} ${
								isActiveMain ? s.active : ""
							} ${isActiveCat ? s.active : ""}`}
							onClick={() => {
								if (isMain) {
									// toggle видимість підкатегорій
									setSubHidden((prev) => {
										const next = !prev;
										if (next) {
											// коли ховаємо підкатегорії — за замовчуванням виділяємо підкатегорію 0
											setMainCategory(null);
											setCategory(0);
										} else {
											setMainCategory(1);
											setCategory(2);
											// коли показуємо підкатегорії знову — просто виділяємо підкатегорію 2
											// (можна очистити mainCategory, якщо треба)
										}
										return next;
									});
								} else {
									// клік по звичайній категорії або по підкатегорії
									setCategory(index);
									// якщо натиснули підкатегорію — зберігаємо, що mainCategory = 1 (щоб 1 залишався підсіченим)
									if (isSub) setMainCategory(1);
									// якщо натиснули іншу (0) — можна зняти mainCategory
									if (!isSub && !isMain) setMainCategory(null);
								}
							}}
						>
							{item}
						</li>
					);
				})}
			</ul>

			<ul className={s.servicesLanguageList}>
				{languages.map((item, idx) => {
					const value = idx === 0 ? "pl" : "de";
					const isActive = language === value;

					return (
						<li
							key={idx}
							className={`${s.servicesLanguageItem} ${
								isActive ? s.active : ""
							}`}
							onClick={() => setLanguage(value)}
						>
							{item}
						</li>
					);
				})}
			</ul>
		</div>
	);
};

export default Selectors;

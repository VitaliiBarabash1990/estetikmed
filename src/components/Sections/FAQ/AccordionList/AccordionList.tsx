"use client";
import React, { useState } from "react";
import s from "./AccordionList.module.css";
import { useTranslations } from "next-intl";
import { accordion } from "@/lib/data/accordion";

const AccordionList = () => {
	const [activeItem, setActiveItem] = useState<number | null>(null);
	const t = useTranslations("Faq");
	const AccordionList = accordion.map((item) => ({
		id: item.id,
		title: t(item.titleKey),
		description: t(item.descriptionKey),
	}));

	const hundlerOpenItem = (id: number) => {
		setActiveItem((prev) => (prev === id ? null : id));
	};

	return (
		<div className={s.accordionWrapper}>
			<ul className={s.accordionList}>
				{AccordionList.slice(0, 3).map((item) => (
					<li
						key={item.id}
						className={s.accordionItem}
						onClick={() => hundlerOpenItem(item.id)}
					>
						<div
							className={`${s.accordionBtn} ${
								activeItem === item.id ? s.accordioBtnPurpure : ""
							}`}
						>
							{item.title}
							<div className={s.iconWrapper}>
								<svg
									className={`${s.iconAccordion} ${
										activeItem === item.id ? s.iconPurpure : ""
									}`}
								>
									<use href="/sprite.svg#icon-accordion-plus"></use>
								</svg>
							</div>
						</div>
						<div
							className={`${s.accordionDescription} ${
								activeItem === item.id ? s.open : ""
							}`}
						>
							{item.description}
						</div>
					</li>
				))}
			</ul>
			<ul className={s.accordionList}>
				{AccordionList.slice(3, 6).map((item) => (
					<li
						key={item.id}
						className={s.accordionItem}
						onClick={() => hundlerOpenItem(item.id)}
					>
						<div
							className={`${s.accordionBtn} ${
								activeItem === item.id ? s.accordioBtnPurpure : ""
							}`}
						>
							{item.title}
							<div className={s.iconWrapper}>
								<svg
									className={`${s.iconAccordion} ${
										activeItem === item.id ? s.iconPurpure : ""
									}`}
								>
									<use href="/sprite.svg#icon-accordion-plus"></use>
								</svg>
							</div>
						</div>
						<div
							className={`${s.accordionDescription} ${
								activeItem === item.id ? s.open : ""
							}`}
						>
							{item.description}
						</div>
					</li>
				))}
			</ul>
		</div>
	);
};

export default AccordionList;

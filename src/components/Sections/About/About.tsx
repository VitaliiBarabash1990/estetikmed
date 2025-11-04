"use client";
import React from "react";
import WrapperForComponentsAllSides from "@/lib/utils/WrapperForComponentsAllSides/WrapperForComponentsAllSides";
import useSizeWindows from "@/lib/useSizeWindows/useSizeWindows";
import { useTranslations } from "next-intl";
import s from "./About.module.css";

const About = () => {
	const { left, right, top, bottom } = useSizeWindows();
	const t = useTranslations("About");

	const numberList = [
		{ id: 0, number: "11", title: t("year") },
		{ id: 1, number: "840+", title: t("clients") },
		{ id: 2, number: "75", title: t("procedure") },
		{ id: 3, number: "98%", title: t("procents") },
	];

	return (
		<WrapperForComponentsAllSides
			paddingLeft={left}
			paddingRight={right}
			paddingTop={top}
			paddingBottom={bottom}
		>
			<div className={s.aboutWrapper}>
				<h3 className={s.titleAbout}>{t("title")}</h3>
				<div className={s.descriptionAbout}>{t("description")}</div>
				<ul className={s.numberList}>
					{numberList.map((item) => (
						<li key={item.id} className={s.numberItem}>
							<p className={s.number}>{item.number}</p>
							<h5 className={s.titleNumber}>{item.title}</h5>
						</li>
					))}
				</ul>
			</div>
		</WrapperForComponentsAllSides>
	);
};

export default About;

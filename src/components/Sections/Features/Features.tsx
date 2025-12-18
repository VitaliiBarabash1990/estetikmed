"use client";
import React from "react";
import WrapperForComponentsAllSides from "@/lib/utils/WrapperForComponentsAllSides/WrapperForComponentsAllSides";
import s from "./Features.module.css";
import { useTranslations } from "next-intl";
import Image from "next/image";
import useIsMobile from "@/lib/isMobile/isMobile";

const Features = () => {
	const isMobile = useIsMobile();
	const t = useTranslations("Features");
	const procedureList = [
		{
			id: 0,
			title: t("item_1.title"),
			text: t("item_1.text"),
			src: "/sprite.svg#icon-two-circle",
		},
		{
			id: 1,
			title: t("item_2.title"),
			text: t("item_2.text"),
			src: "/sprite.svg#icon-thre-heart",
		},
		{
			id: 2,
			title: t("item_3.title"),
			text: t("item_3.text"),
			src: "/sprite.svg#icon-arcticons",
		},
		{
			id: 3,
			title: t("item_4.title"),
			text: t("item_4.text"),
			src: "/sprite.svg#icon-heart-people",
		},
		{
			id: 4,
			title: t("item_5.title"),
			text: t("item_5.text"),
			src: "/sprite.svg#icon-thre-heart",
		},
	];
	return (
		<WrapperForComponentsAllSides
			paddingTop={20}
			paddingBottom={20}
			paddingLeft={isMobile ? 8 : 24}
			paddingRight={isMobile ? 8 : 24}
		>
			<div id="Features" className={s.featuresWrapper}>
				<div className={s.imageBlock}>
					<Image
						src="/img/Features/bg_blur.webp"
						width={604}
						height={632}
						alt="image_dlajego"
						className={s.featuresImage}
					/>
					<h4 className={s.textTop}>{t("imageTextTop")}</h4>
					<p className={s.textBottom}>{t("imageTextBottom")}</p>
				</div>
				<ul className={s.procedureList}>
					{procedureList.map((item) => (
						<li key={item.id} className={s.procedureItem}>
							<div className={s.iconBlock}>
								<svg className={s.iconItem}>
									<use href={item.src}></use>
								</svg>
							</div>

							<h5 className={s.titleItem}>{item.title}</h5>

							<p className={s.textItem}>{item.text}</p>
						</li>
					))}
				</ul>
			</div>
		</WrapperForComponentsAllSides>
	);
};

export default Features;

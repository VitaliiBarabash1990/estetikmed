"use client";
import React from "react";
import s from "./SlideItem.module.css";
import Image from "next/image";
import { BlogLink } from "./BlogLink/BlogLink";
import { ArticlesPayload } from "@/lib/types/types";
import { Locale, usePathname } from "@/i18n/routing";
import { useLocale } from "next-intl";

type SlideItemProps = {
	item: ArticlesPayload;
	setOpenSAInfo?: React.Dispatch<React.SetStateAction<ArticlesPayload | null>>;
};

const SlideItem: React.FC<SlideItemProps> = ({ item, setOpenSAInfo }) => {
	const locale = useLocale() as Locale;
	const path = usePathname().split("/")[1];

	const content = (
		<div className={s.sliderContent}>
			<div className={s.imgWrapper}>
				<Image src={item.img} fill className={s.image} alt="image" />
			</div>

			<div className={s.sliderContentDescr}>
				<h3 className={s.title}>{item[locale].title}</h3>
			</div>
		</div>
	);

	// ✅ ADMIN — без переходу, просто клік
	if (path === "admin") {
		return (
			<div
				className={s.slideWrapper}
				onClick={() => setOpenSAInfo?.(item)}
				role="button"
			>
				{content}
			</div>
		);
	}

	// ✅ SITE — звичайний <a>, без router.push
	return (
		<div className={s.slideWrapper}>
			<BlogLink id={String(item._id)} className={s.linkWrapper}>
				{content}
			</BlogLink>
		</div>
	);
};

export default SlideItem;

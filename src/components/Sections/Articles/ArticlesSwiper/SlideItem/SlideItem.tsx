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
	const local = useLocale() as Locale;
	const path = usePathname().split("/")[1];
	return (
		<div className={s.slideWrapper}>
			<div className={s.sliderContent}>
				<div className={s.imgWrapper}>
					<Image src={item.img} fill className={s.image} alt="image" />
					{/* <Image
						src={item.img}
						width={372}
						height={300}
						sizes="100vw"
						alt={`article_` + `${item._id}`}
						className={s.image}
					/> */}
				</div>

				{path === "admin" ? (
					<div
						className={s.btnArticle}
						onClick={() => {
							if (setOpenSAInfo) setOpenSAInfo(item);
						}}
					>
						<svg className={s.iconBtn}>
							<use href="/sprite.svg#icon-arrow-bottom-left"></use>
						</svg>
					</div>
				) : (
					<BlogLink id={String(item._id)} className={s.btnArticle}>
						<svg className={s.iconBtn}>
							<use href="/sprite.svg#icon-arrow-bottom-left"></use>
						</svg>
					</BlogLink>
				)}

				<div className={s.sliderContentDescr}>
					<h3 className={s.title}>{item[local].title}</h3>
					{/* <p className={s.description}>{item[local].article.slice(0, 50)}</p> */}
				</div>
			</div>
		</div>
	);
};

export default SlideItem;

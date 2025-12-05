"use client";
import React from "react";
import s from "./SlideItem.module.css";
import { ItemProps } from "../ArticlesSwiper";
import Image from "next/image";
import { BlogLink } from "./BlogLink/BlogLink";
import { ArticleItemProps } from "@/lib/types/types";
import { usePathname } from "@/i18n/routing";

type SlideItemProps = {
	item: ItemProps;
	setOpenSAInfo?: React.Dispatch<React.SetStateAction<ArticleItemProps | null>>;
};

const SlideItem: React.FC<SlideItemProps> = ({ item, setOpenSAInfo }) => {
	const path = usePathname().split("/")[1];
	return (
		<div className={s.slideWrapper}>
			<div className={s.sliderContent}>
				<Image
					src={item.img}
					width={372}
					height={300}
					sizes="100vw"
					alt={`article_` + `${item.id}`}
					className={s.image}
				/>
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
					<BlogLink id={String(item.id)} className={s.btnArticle}>
						<svg className={s.iconBtn}>
							<use href="/sprite.svg#icon-arrow-bottom-left"></use>
						</svg>
					</BlogLink>
				)}

				<div className={s.sliderContentDescr}>
					<h3 className={s.title}>{item.title}</h3>
					<p className={s.description}>{item.text.slice(0, 50)}</p>
				</div>
			</div>
		</div>
	);
};

export default SlideItem;

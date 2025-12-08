"use client";
import React from "react";
import s from "./SlideItem.module.css";
import Image from "next/image";
import { ReviewsPayload } from "@/lib/types/types";
import { useLocale } from "next-intl";
import { Locale } from "@/i18n/routing";

type SlideItemProps = {
	item: ReviewsPayload;
};

const SlideItem: React.FC<SlideItemProps> = ({ item }) => {
	const local = useLocale() as Locale;
	return (
		<div className={s.slideWrapper}>
			<div className={s.sliderContent}>
				<div className={s.imageWrapper}>
					<Image
						src={item.img}
						width={372}
						height={300}
						sizes="100vw"
						alt={`article_` + `${item._id}`}
						className={s.image}
					/>
				</div>

				<div className={s.sliderRewiews}>
					<ul className={s.rewiewsList}>
						<li className={`${s.rewiewsItem} ${s.rewiews}`}>
							{item[local].reviews}
						</li>
						<li className={`${s.rewiewsItem} ${s.answers}`}>
							{item[local].answers}
						</li>
					</ul>
					<ul className={s.nameServiceList}>
						<li className={`${s.serviceItem} ${s.name}`}>{item[local].name}</li>
						<li className={`${s.serviceItem} ${s.service}`}>
							{item[local].services}
						</li>
					</ul>
				</div>
			</div>
		</div>
	);
};

export default SlideItem;

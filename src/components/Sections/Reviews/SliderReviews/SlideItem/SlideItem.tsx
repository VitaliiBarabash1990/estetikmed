"use client";
import React from "react";
import s from "./SlideItem.module.css";
import Image from "next/image";
import { ReviewsItemProps } from "../SliderReviews";

type SlideItemProps = {
	item: ReviewsItemProps;
};

const SlideItem: React.FC<SlideItemProps> = ({ item }) => {
	return (
		<div className={s.slideWrapper}>
			<div className={s.sliderContent}>
				<div className={s.imageWrapper}>
					<Image
						src={item.img}
						width={372}
						height={300}
						sizes="100vw"
						alt={`article_` + `${item.id}`}
						className={s.image}
					/>
				</div>

				<div className={s.sliderRewiews}>
					<ul className={s.rewiewsList}>
						<li className={`${s.rewiewsItem} ${s.rewiews}`}>{item.reviews}</li>
						<li className={`${s.rewiewsItem} ${s.answers}`}>{item.answers}</li>
					</ul>
					<ul className={s.nameServiceList}>
						<li className={`${s.serviceItem} ${s.name}`}>{item.name}</li>
						<li className={`${s.serviceItem} ${s.service}`}>{item.services}</li>
					</ul>
				</div>
			</div>
		</div>
	);
};

export default SlideItem;

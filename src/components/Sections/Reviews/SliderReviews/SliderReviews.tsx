"use client";

import React from "react";
import { Swiper, SwiperSlide } from "swiper/react";
import { Navigation, Pagination } from "swiper/modules";

import "swiper/css";
import "swiper/css/navigation";
import "swiper/css/pagination";

import s from "./SliderReviews.module.css";
import SlideItem from "./SlideItem/SlideItem";
import { useTranslations } from "next-intl";
import { ReviewItemRaw, reviews } from "@/lib/data/reviews";

export type ItemProps = {
	id: number;
	img: string;
	name: string;
	services: string;
	reviews: string;
	answers: string;
};

const SliderReviews = () => {
	const t = useTranslations("Reviews");

	const reviewsList: ItemProps[] = reviews.map((item: ReviewItemRaw) => ({
		id: item.id,
		img: item.img,
		name: t(item.nameKey),
		services: t(item.servicesKey),
		reviews: t(item.reviewsKey),
		answers: t(item.answersKey),
	}));

	return (
		<div id="SliderReviews" className={s.articlesSwiper}>
			<div className={s.sliderContainer}>
				<Swiper
					className={s.swiper}
					navigation={{
						nextEl: ".reviews-next",
						prevEl: ".reviews-prev",
					}}
					modules={[Pagination, Navigation]}
					loop={true}
					breakpoints={{
						320: { slidesPerView: 1, spaceBetween: 4 },
					}}
				>
					{reviewsList.map((item) => (
						<SwiperSlide key={item.id} className={s.slide}>
							<SlideItem item={item} />
						</SwiperSlide>
					))}
				</Swiper>

				<div className={s.headBlock}>
					<h3 className={s.title}>{t("title")}</h3>

					<div className={s.paginationBlock}>
						<button type="button" className={`reviews-prev ${s.navButton}`}>
							<svg className={s.navButton_icon}>
								<use href="/sprite.svg#icon-arrow-outlined"></use>
							</svg>
						</button>

						<button type="button" className={`reviews-next ${s.navButton}`}>
							<svg className={`${s.navButton_icon} ${s.right}`}>
								<use href="/sprite.svg#icon-arrow-outlined"></use>
							</svg>
						</button>
					</div>
				</div>
			</div>
		</div>
	);
};

export default SliderReviews;

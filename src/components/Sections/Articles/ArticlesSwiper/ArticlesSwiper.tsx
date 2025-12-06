"use client";

import React from "react";
import { Swiper, SwiperSlide } from "swiper/react";
import { Navigation, Pagination } from "swiper/modules";

import "swiper/css";
import "swiper/css/navigation";
import "swiper/css/pagination";
import s from "./ArticlesSwiper.module.css";
import SlideItem from "./SlideItem/SlideItem";
import { useTranslations } from "next-intl";
import { useSelector } from "react-redux";
import { selectArticles } from "@/redux/articles/selectors";

const ArticlesSwiper = () => {
	const t = useTranslations("Articles");

	const articlesList = useSelector(selectArticles);

	return (
		<div id="ArticlesSwiper" className={s.articlesSwiper}>
			<div className={s.sliderContainer}>
				<Swiper
					className={s.swiper}
					navigation={{
						nextEl: ".article-next",
						prevEl: ".article-prev",
					}}
					modules={[Pagination, Navigation]}
					loop={true}
					breakpoints={{
						320: { slidesPerView: 1, spaceBetween: 4 },
						768: { slidesPerView: 2, spaceBetween: 12 },
						1280: { slidesPerView: 3, spaceBetween: 12 },
					}}
				>
					{articlesList?.map((item, index) => (
						<SwiperSlide key={index} className={s.slide}>
							<SlideItem item={item} />
						</SwiperSlide>
					))}
				</Swiper>
				<div className={s.headBlock}>
					<h3 className={s.title}>{t("title")}</h3>
					<div className={s.paginationBlock}>
						<button type="button" className={`article-prev ${s.navButton}`}>
							<svg className={s.navButton_icon}>
								<use href="/sprite.svg#icon-arrow-outlined"></use>
							</svg>
						</button>
						<button type="button" className={`article-next ${s.navButton}`}>
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

export default ArticlesSwiper;

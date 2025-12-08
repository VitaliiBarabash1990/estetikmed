"use client";

import React from "react";
import { Swiper, SwiperSlide } from "swiper/react";
import { Navigation, Pagination } from "swiper/modules";

import "swiper/css";
import "swiper/css/navigation";
import "swiper/css/pagination";

import s from "./SliderGallery.module.css";
import SlideItem from "./SlideItem/SlideItem";
import { useTranslations } from "next-intl";

type ImageGaleryProps = {
	media: string[];
};

const SliderGallery = ({ media }: ImageGaleryProps) => {
	const t = useTranslations("Media");

	// const GalerryList = [
	// 	"/img/Media/photo_1.webp",
	// 	"/img/Media/photo_2.webp",
	// 	"/img/Media/photo_1.webp",
	// 	"/img/Media/photo_2.webp",
	// 	"/img/Media/photo_1.webp",
	// 	"/img/Media/photo_2.webp",
	// ];

	return (
		<div id="SliderGallery" className={s.gallerySwiper}>
			<div className={s.sliderContainer}>
				<Swiper
					className={s.swiper}
					navigation={{
						nextEl: ".gallery-next",
						prevEl: ".gallery-prev",
					}}
					modules={[Pagination, Navigation]}
					loop={true}
					breakpoints={{
						320: { slidesPerView: 1, spaceBetween: 4 },
						768: { slidesPerView: 1, spaceBetween: 4 },
						1280: { slidesPerView: 2, spaceBetween: 24 },
					}}
				>
					{media.map((item, index) => (
						<SwiperSlide key={index} className={s.slide}>
							<SlideItem item={item} />
						</SwiperSlide>
					))}
				</Swiper>

				<div className={s.headBlock}>
					<h3 className={s.title}>{t("gallery")}</h3>

					<div className={s.paginationBlock}>
						<button type="button" className={`gallery-prev ${s.navButton}`}>
							<svg className={s.navButton_icon}>
								<use href="/sprite.svg#icon-arrow-outlined"></use>
							</svg>
						</button>

						<button type="button" className={`gallery-next ${s.navButton}`}>
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

export default SliderGallery;

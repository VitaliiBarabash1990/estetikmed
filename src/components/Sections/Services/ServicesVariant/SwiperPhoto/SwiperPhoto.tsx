"use client";

import React from "react";
import { Swiper, SwiperSlide } from "swiper/react";
import { Navigation, Pagination } from "swiper/modules";

import "swiper/css";
import "swiper/css/navigation";
import "swiper/css/pagination";
import s from "./SwiperPhoto.module.css";
import SlideItem from "./SlideItem/SlideItem";

type HowItWorksProps = { cardLists: string[] };

const SwiperPhoto: React.FC<HowItWorksProps> = ({ cardLists }) => {
	return (
		<div id="ServicesItem" className={s.worksSwiper}>
			<div className={s.sliderContainer}>
				<Swiper
					className={s.swiper}
					navigation={{
						nextEl: ".services-next",
						prevEl: ".services-prev",
					}}
					modules={[Pagination, Navigation]}
					loop={true}
					breakpoints={{
						320: { slidesPerView: 1, spaceBetween: 8 },
						768: { slidesPerView: 2, spaceBetween: 24 },
					}}
				>
					{cardLists?.map((item, index) => (
						<SwiperSlide key={index} className={s.slide}>
							<SlideItem item={item} />
						</SwiperSlide>
					))}
				</Swiper>
				<div className={s.paginationBlock}>
					<button className={`services-prev ${s.navButton} ${s.prevButton}`}>
						<svg className={s.navButton_icon}>
							<use href="/sprite.svg#icon-arrow-outlined"></use>
						</svg>
					</button>
					<button className={`services-next ${s.navButton} ${s.nextButton}`}>
						<svg className={`${s.navButton_icon} ${s.right}`}>
							<use href="/sprite.svg#icon-arrow-outlined"></use>
						</svg>
					</button>
				</div>
			</div>
		</div>
	);
};

export default SwiperPhoto;

"use client";

import React from "react";
import { Swiper, SwiperSlide } from "swiper/react";
import { Navigation, Pagination } from "swiper/modules";

import "swiper/css";
import "swiper/css/navigation";
import "swiper/css/pagination";

import s from "./SwiperPhoto.module.css";
import SlideItem from "./SlideItem/SlideItem";

type HowItWorksProps = { cardLists: string[] | undefined };

const SwiperPhoto: React.FC<HowItWorksProps> = ({ cardLists }) => {
	return (
		<div id="ServicesItem" className={s.worksSwiper}>
			<div className={s.sliderContainer}>
				<Swiper
					className={s.swiper}
					modules={[Pagination, Navigation]}
					loop
					navigation={{
						nextEl: ".services-next",
						prevEl: ".services-prev",
					}}
					pagination={{
						el: ".services-pagination",
						clickable: true,
						bulletClass: s.bullet,
						bulletActiveClass: s.bulletActive,
					}}
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

				{/* BULLETS + ARROWS (column-reverse вже враховано) */}
				<div className={s.paginationBlock}>
					<div className={`services-pagination ${s.pagination}`}></div>

					<div className={s.navWrapper}>
						<button className={`services-prev ${s.navButton}`}>
							<svg className={s.navButton_icon}>
								<use href="/sprite.svg#icon-arrow-outlined" />
							</svg>
						</button>
						<button className={`services-next ${s.navButton}`}>
							<svg className={`${s.navButton_icon} ${s.right}`}>
								<use href="/sprite.svg#icon-arrow-outlined" />
							</svg>
						</button>
					</div>
				</div>
			</div>
		</div>
	);
};

export default SwiperPhoto;

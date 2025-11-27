"use client";

import React from "react";
import { Swiper, SwiperSlide } from "swiper/react";
import { Navigation, Pagination } from "swiper/modules";

import "swiper/css";
import "swiper/css/navigation";
import "swiper/css/pagination";

import s from "./SliderReels.module.css";
import SlideItem from "./SlideItem/SlideItem";
import { useTranslations } from "next-intl";

const SliderReels = () => {
	const t = useTranslations("Media");

	const GalerryList = [
		// "/img/Media/video_reels.png",
		// "/img/Media/video_reels.png",
		// "/img/Media/video_reels.png",
		// "/img/Media/video_reels.png",
		// "/img/Media/video_reels.png",
		// "/img/Media/video_reels.png",
		// "/img/Media/video_reels.png",
		// "/img/Media/video_reels.png",
		// "/img/Media/video_reels.png",
		// "/img/Media/video_reels.png",
		// "/img/Media/video_reels.png",
		// "/img/Media/video_reels.png",
		// "/img/Media/video_reels.png",
		// "/img/Media/video_reels.png",
		// "/img/Media/video_reels.png",
		// "/img/Media/video_reels.png",
		"/img/Media/reels/kak_yznat_horoshego_cheloveka.mp4",
		"/img/Media/reels/kak_yznat_horoshego_cheloveka.mp4",
		"/img/Media/reels/kak_yznat_horoshego_cheloveka.mp4",
		"/img/Media/reels/kak_yznat_horoshego_cheloveka.mp4",
		"/img/Media/reels/kak_yznat_horoshego_cheloveka.mp4",
		"/img/Media/reels/kak_yznat_horoshego_cheloveka.mp4",
		"/img/Media/reels/kak_yznat_horoshego_cheloveka.mp4",
		"/img/Media/reels/kak_yznat_horoshego_cheloveka.mp4",
		"/img/Media/reels/kak_yznat_horoshego_cheloveka.mp4",
		"/img/Media/reels/kak_yznat_horoshego_cheloveka.mp4",
		"/img/Media/reels/kak_yznat_horoshego_cheloveka.mp4",
		"/img/Media/reels/kak_yznat_horoshego_cheloveka.mp4",
		"/img/Media/reels/kak_yznat_horoshego_cheloveka.mp4",
		"/img/Media/reels/kak_yznat_horoshego_cheloveka.mp4",
		"/img/Media/reels/kak_yznat_horoshego_cheloveka.mp4",
		"/img/Media/reels/kak_yznat_horoshego_cheloveka.mp4",
	];

	return (
		<div id="SliderGallery" className={s.reelsSwiper}>
			<div className={s.sliderContainer}>
				<Swiper
					className={s.swiper}
					navigation={{
						nextEl: ".reels-next",
						prevEl: ".reels-prev",
					}}
					modules={[Pagination, Navigation]}
					loop={true} // можна і true, але з 10 видимими треба тестити
					slidesPerView={10} // показуємо 10 картинок
					slidesPerGroup={1} // гортати по одній
					spaceBetween={16} // відступи між слайдами
				>
					{GalerryList.map((item, index) => (
						<SwiperSlide key={index} className={s.slide}>
							<SlideItem item={item} />
						</SwiperSlide>
					))}
				</Swiper>

				<div className={s.headBlock}>
					<h3 className={s.title}>{t("reels")}</h3>

					<div className={s.paginationBlock}>
						<button type="button" className={`reels-prev ${s.navButton}`}>
							<svg className={s.navButton_icon}>
								<use href="/sprite.svg#icon-arrow-outlined"></use>
							</svg>
						</button>

						<button type="button" className={`reels-next ${s.navButton}`}>
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

export default SliderReels;

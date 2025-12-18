"use client";

import React, { SetStateAction, useState } from "react";
import { Swiper, SwiperSlide } from "swiper/react";
import { Navigation, Pagination } from "swiper/modules";

import "swiper/css";
import "swiper/css/navigation";
import "swiper/css/pagination";

import s from "./SliderReviews.module.css";
import SlideItem from "./SlideItem/SlideItem";
import { useTranslations } from "next-intl";
// import { ReviewItemRaw, reviews } from "@/lib/data/reviews";
import BlockBtnEdit from "./BlockBtnEdit/BlockBtnEdit";
import { selectReviews } from "@/redux/reviews/selectors";
import { ReviewsPayload } from "@/lib/types/types";
import ModalConfirmation from "@/lib/utils/ModalConfirmation/ModalConfirmation";
import { useSelector } from "react-redux";

export type ReviewsProps = {
	page: string;
	hundlerEdit?: () => void;
	setOpenRSInfo?: React.Dispatch<SetStateAction<ReviewsPayload | null>>;
};

const SliderReviews = ({ page, hundlerEdit, setOpenRSInfo }: ReviewsProps) => {
	const t = useTranslations("Reviews");

	const [activeSlide, setActiveSlide] = useState<ReviewsPayload | null>(null);
	const [confirmation, setConfirmation] = useState(false);

	const reviewsList = useSelector(selectReviews);

	return (
		<>
			{" "}
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
						autoHeight={true}
						breakpoints={{
							320: { slidesPerView: 1, spaceBetween: 4 },
						}}
						onSlideChange={(swiper) => {
							const index = swiper.realIndex;
							setActiveSlide(reviewsList[index]);
						}}
						// onSwiper={(swiper) => {
						// 	setActiveSlide(reviewsList[swiper.realIndex]); // записати перший слайд
						// }}
					>
						{reviewsList.map((item) => (
							<SwiperSlide key={item._id} className={s.slide}>
								<SlideItem item={item} />
							</SwiperSlide>
						))}
					</Swiper>

					<div
						className={`${s.headBlock} ${
							page === "admin" ? s.reverseHeadBlock : ""
						}`}
					>
						{page === "admin" ? (
							<BlockBtnEdit
								hundlerDelete={() => {
									setConfirmation(true);
								}}
								// hundlerDelete={() => {
								// 	if (activeSlide?._id !== null) {
								// 		dispatch(deleteReviews(String(activeSlide?._id)));
								// 	}
								// 	setOpenRSInfo?.(null);
								// }}
								hundlerEdit={() => {
									if (activeSlide && setOpenRSInfo) {
										setOpenRSInfo(activeSlide);
									}
									hundlerEdit?.();
								}}
							/>
						) : (
							// <h3 className={s.title}>{t("title")}</h3>
							// <h3
							// 	className={s.title}
							// 	dangerouslySetInnerHTML={{
							// 		__html: t("title").replace(
							// 			/(\S+)$/,
							// 			`<span class="${s.lastWord}">$1</span>`
							// 		),
							// 	}}
							// />
							<h3
								className={s.title}
								dangerouslySetInnerHTML={{
									__html: t("title").replace(
										/(.*?)([-–—]\s*.*)/,
										`$1<span class="${s.afterDash}">$2</span>`
									),
								}}
							/>
						)}

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
			{confirmation && (
				<ModalConfirmation
					type="reviews"
					id={activeSlide?._id ?? null}
					setOpenRSInfo={setOpenRSInfo}
					hundlerCloseServices={() => setConfirmation(false)}
				/>
			)}
		</>
	);
};

export default SliderReviews;

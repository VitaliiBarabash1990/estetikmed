"use client";
import React from "react";
import s from "./ServicesCategory.module.css";
import Image from "next/image";
import ServicesSection from "./ServicesSection/ServicesSection";
import { ServicesPayload } from "@/lib/types/types";

export type CategoryProps = {
	id: number;
	currentPage: number;
	onPageChange: (page: number) => void;
	setOpenSCInfo: (payload: ServicesPayload, page: number) => void;
};

const imageList: Record<number, string> = {
	0: "/img/Services/service_med_est_reg.webp",
	1: "/img/Services/service_dep_laz_dla_wooman.webp",
	2: "/img/Services/service_depilation_laz_dla_man.webp",
};

const ServicesCategory: React.FC<CategoryProps> = ({
	id,
	setOpenSCInfo,
	currentPage,
	onPageChange,
}) => {
	return (
		<div className={s.wrapperComponent}>
			<div
				className={`${s.sectionComponent} ${
					id % 2 !== 0 ? s.sectionComponentReverse : ""
				}`}
			>
				<div className={s.imgWrapper}>
					<Image
						src={imageList[id]}
						width={604}
						height={664}
						alt={`img_${id}`}
						className={s.image}
					/>
				</div>

				{/* ServicesSection передає payload */}
				<ServicesSection
					id={id}
					currentPage={currentPage}
					onPageChange={onPageChange}
					setOpenSCInfo={setOpenSCInfo}
				/>
			</div>
		</div>
	);
};

export default ServicesCategory;

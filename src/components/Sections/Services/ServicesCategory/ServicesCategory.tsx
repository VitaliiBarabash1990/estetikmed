"use client";
import React, { SetStateAction } from "react";
import s from "./ServicesCategory.module.css";
import Image from "next/image";
import ServicesSection from "./ServicesSection/ServicesSection";
import { ServicesPayload } from "@/lib/types/types";

export type CategoryProps = {
	id: number;
	setOpenSCInfo: React.Dispatch<SetStateAction<ServicesPayload | null>>;
};

const ServicesCategory: React.FC<CategoryProps> = ({ id, setOpenSCInfo }) => {
	return (
		<div className={s.wrapperComponent}>
			<div
				className={`${s.sectionComponent} ${
					id % 2 !== 0 ? s.sectionComponentReverse : ""
				}`}
			>
				<div className={s.imgWrapper}>
					<Image
						src="/img/Services/service_med_est_reg.webp"
						width={604}
						height={664}
						alt={`img_` + id}
						className={s.image}
					/>
				</div>
				<ServicesSection id={id} setOpenSCInfo={setOpenSCInfo} />
			</div>
		</div>
	);
};

export default ServicesCategory;

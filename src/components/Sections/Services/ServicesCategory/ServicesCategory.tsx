import React from "react";
import s from "./ServicesCategory.module.css";
import PaginationBlock from "./PaginationBlock/PaginationBlock";
import Image from "next/image";

type CategoryProps = {
	id: number;
};

const ServicesCategory: React.FC<CategoryProps> = ({ id }) => {
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
				<div className={s.servicesSection}>
					<div className={s.servicesHead}>
						<h4 className={s.servicesTitle}></h4>
						<PaginationBlock />
					</div>
				</div>
			</div>
		</div>
	);
};

export default ServicesCategory;

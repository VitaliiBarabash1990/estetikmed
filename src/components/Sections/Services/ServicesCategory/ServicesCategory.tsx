"use client";
import React from "react";
import s from "./ServicesCategory.module.css";
import PaginationBlock from "./PaginationBlock/PaginationBlock";
import Image from "next/image";
import { useTranslations } from "next-intl";
import { services } from "@/lib/ data/services";
import PaginationBoolit from "./PaginationBoolit/PaginationBoolit";

type CategoryProps = {
	id: number;
};

const ServicesCategory: React.FC<CategoryProps> = ({ id }) => {
	const t = useTranslations("Services");
	const countItem = 8;

	const localizedServices = Object.fromEntries(
		Object.entries(services).map(([groupName, serviceArray]) => [
			groupName,
			serviceArray.map((item) => ({
				...item,
				name: t(item.nameKey),
				price: t(item.priceKey),
				currency: t(item.currencyKey),
			})),
		])
	);

	const list = localizedServices[`services_${id}`] || [];

	const hundlerClickInfo = () => {};

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
						<h4 className={s.servicesTitle}>{t(`services.${id}`)}</h4>
						<PaginationBlock />
					</div>
					<ul className={s.servicesList}>
						{list.map((item) => (
							<li key={item.id} className={s.servicesItem}>
								{item.name}
								<div className={s.infoBlock}>
									{item.price} {item.currency}
									<svg className={s.iconInfo} onClick={hundlerClickInfo}>
										<use href="/sprite.svg#icon-solar-info"></use>
									</svg>
								</div>
							</li>
						))}
					</ul>
					<PaginationBoolit countItem={countItem} />
				</div>
			</div>
		</div>
	);
};

export default ServicesCategory;

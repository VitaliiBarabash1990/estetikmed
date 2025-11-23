"use client";
import React from "react";
import s from "./ServicesSection.module.css";
import PaginationBlock from "../PaginationBlock/PaginationBlock";
import PaginationBoolit from "../PaginationBoolit/PaginationBoolit";
import { useTranslations } from "next-intl";
import { CategoryProps } from "../ServicesCategory";
import { services } from "@/lib/ data/services";
import { usePathname } from "@/i18n/routing";

export type ItemProps = {
	id: number;
	name: string;
	price: string;
	currency: string;
	description: string;
};

const ServicesSection = ({ id, setOpenSCInfo }: CategoryProps) => {
	const isAdmin = usePathname().split("/")[1] === "admin";

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
				description: t(item.description),
			})),
		])
	);

	const list = localizedServices[`services_${id}`] || [];

	const hundlerClickInfo = (item: ItemProps) => {
		setOpenSCInfo(item);
	};

	return (
		<div className={isAdmin ? s.servicesSectionAdmin : s.servicesSection}>
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
							<svg
								className={s.iconInfo}
								onClick={() => hundlerClickInfo(item)}
							>
								<use href="/sprite.svg#icon-solar-info"></use>
							</svg>
						</div>
					</li>
				))}
			</ul>
			<PaginationBoolit countItem={countItem} />
		</div>
	);
};

export default ServicesSection;

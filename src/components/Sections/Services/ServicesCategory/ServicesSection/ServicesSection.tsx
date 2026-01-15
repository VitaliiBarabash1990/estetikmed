"use client";
import React, { useMemo } from "react";
import s from "./ServicesSection.module.css";
import PaginationBlock from "../PaginationBlock/PaginationBlock";
import PaginationBoolit from "../PaginationBoolit/PaginationBoolit";
import { useTranslations, useLocale } from "next-intl";
import { Locale, usePathname } from "@/i18n/routing";
import { useSelector } from "react-redux";
import { selectServices } from "@/redux/services/selectors";
import { ServicesPayload } from "@/lib/types/types";

type Props = {
	id: number;
	currentPage: number;
	onPageChange: (page: number) => void;
	setOpenSCInfo: (payload: ServicesPayload, page: number) => void;
};

const ServicesSection = ({
	id,
	currentPage,
	onPageChange,
	setOpenSCInfo,
}: Props) => {
	const page = currentPage;
	const setPage = onPageChange;

	const isAdmin = usePathname().split("/")[1] === "admin";
	const locale = useLocale() as Locale;
	const t = useTranslations("Services");

	const servicesTypeToId: Record<number, string> = {
		0: t("services.0"),
		1: t("services.1"),
		2: t("services.2"),
	};

	const idInType: Record<number, string> = {
		0: "medycyna",
		1: "depilacja_woman",
		2: "depilacja_man",
	};

	const servicesData = useSelector(selectServices);

	const filterServicesData = useMemo(
		() => servicesData.filter((item) => item.type === idInType[id]),
		[servicesData, id]
	);

	// -----------------------------
	// PAGINATION
	// -----------------------------
	const itemsPerPage = 6;

	const totalPages = Math.ceil(filterServicesData.length / itemsPerPage);

	const paginatedList = useMemo(() => {
		const start = (page - 1) * itemsPerPage;
		return filterServicesData.slice(start, start + itemsPerPage);
	}, [filterServicesData, page]);
	// -----------------------------

	const hundlerClickInfo = (item: ServicesPayload) => {
		setOpenSCInfo(item, page);
	};

	return (
		<div className={isAdmin ? s.servicesSectionAdmin : s.servicesSection}>
			<div className={s.servicesHead}>
				<h4 className={s.servicesTitle}>{servicesTypeToId[id]}</h4>

				<PaginationBlock
					page={page}
					setPage={setPage}
					totalPages={totalPages}
				/>
			</div>

			<ul className={s.servicesList}>
				{paginatedList.map((item) => (
					<li
						key={item._id}
						className={s.servicesItem}
						onClick={() => hundlerClickInfo(item)}
					>
						{item[locale].name}

						<div className={s.infoBlock}>
							{item.price} PLN
							<svg className={s.iconInfo}>
								<use href="/sprite.svg#icon-solar-info"></use>
							</svg>
						</div>
					</li>
				))}
			</ul>

			<PaginationBoolit page={page} setPage={setPage} totalPages={totalPages} />
		</div>
	);
};

export default ServicesSection;

"use client";
import React, { useEffect, useState } from "react";
import s from "./Services.module.css";
import WrapperForComponentsAllSides from "@/lib/utils/WrapperForComponentsAllSides/WrapperForComponentsAllSides";
import useSizeWindows from "@/lib/useSizeWindows/useSizeWindows";
import { useTranslations } from "next-intl";
import useIsMobile from "@/lib/isMobile/isMobile";
import BtnBlock from "./BtnBlock/BtnBlock";
import ServicesCategory from "./ServicesCategory/ServicesCategory";
import ServicesVariant from "./ServicesVariant/ServicesVariant";
import { ServicesPayload } from "@/lib/types/types";
import { useDispatch } from "react-redux";
import { AppDispatch } from "@/redux/store";
import { getAllServices } from "@/redux/services/operations";

type OpenServiceState = {
	categoryId: number;
	payload: ServicesPayload;
} | null;

const Services = () => {
	const dispatch = useDispatch<AppDispatch>();
	const [openService, setOpenService] = useState<OpenServiceState>(null);

	useEffect(() => {
		dispatch(getAllServices());
	}, [dispatch]);

	const isMobile = useIsMobile();
	const { left, right } = useSizeWindows();
	const t = useTranslations("Services");

	const handleCloseServices = () => {
		setOpenService(null);
	};

	const categoryIds = [0, 1, 2];

	return (
		<>
			<WrapperForComponentsAllSides
				paddingLeft={left}
				paddingRight={right}
				paddingTop={isMobile ? 20 : 40}
				paddingBottom={isMobile ? 20 : 40}
			>
				<div id="Services" className={s.titleBlock}>
					<h3 className={s.title}>{t("title")}</h3>
					<a
						href="https://booksy.com/pl-pl/202886_medycyna-estetyczna-laser-diodowy_medycyna-estetyczna_19380_swinoujscie"
						target="_blank"
						rel="noopener noreferrer"
						className={`${s.btn} ${s.btn_mob}`}
					>
						{t("btn_reservation")}
					</a>
				</div>
			</WrapperForComponentsAllSides>

			{categoryIds.map((id) =>
				openService?.categoryId === id ? (
					<ServicesVariant
						key={`variant-${id}`}
						openSCInfo={openService.payload}
						page="main"
						hundlerCloseServices={handleCloseServices}
					/>
				) : (
					<ServicesCategory
						key={`category-${id}`}
						id={id}
						setOpenSCInfo={(payload) =>
							setOpenService({ categoryId: id, payload })
						}
					/>
				)
			)}

			<BtnBlock />
		</>
	);
};

export default Services;

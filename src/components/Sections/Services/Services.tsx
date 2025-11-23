"use client";
import React, { useState } from "react";
import s from "./Services.module.css";
import WrapperForComponentsAllSides from "@/lib/utils/WrapperForComponentsAllSides/WrapperForComponentsAllSides";
import useSizeWindows from "@/lib/useSizeWindows/useSizeWindows";
import { useTranslations } from "next-intl";
import useIsMobile from "@/lib/isMobile/isMobile";
import BtnBlock from "./BtnBlock/BtnBlock";
import ServicesCategory from "./ServicesCategory/ServicesCategory";
import ServicesVariant from "./ServicesVariant/ServicesVariant";
import { ItemProps } from "./ServicesCategory/ServicesSection/ServicesSection";

const Services = () => {
	const [openSCInfo, setOpenSCInfo] = useState<null | ItemProps>(null);
	console.log("OpenSCInfo", openSCInfo);
	const isMobile = useIsMobile();
	const { left, right } = useSizeWindows();
	const t = useTranslations("Services");
	return (
		<>
			<WrapperForComponentsAllSides
				paddingLeft={left}
				paddingRight={right}
				paddingTop={isMobile ? 20 : 40}
				paddingBottom={isMobile ? 20 : 40}
			>
				<div className={s.titleBlock}>
					<h3 className={s.title}>{t("title")}</h3>
					<button type="button" className={`${s.btn} ${s.btn_mob}`}>
						{t("btn_reservation")}
					</button>
				</div>
			</WrapperForComponentsAllSides>
			{openSCInfo ? (
				<ServicesVariant openSCInfo={openSCInfo} />
			) : (
				<>
					<ServicesCategory id={0} setOpenSCInfo={setOpenSCInfo} />
					<ServicesCategory id={1} setOpenSCInfo={setOpenSCInfo} />
					<ServicesCategory id={2} setOpenSCInfo={setOpenSCInfo} />
				</>
			)}

			<BtnBlock />
		</>
	);
};

export default Services;

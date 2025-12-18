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

const Services = () => {
	const dispatch = useDispatch<AppDispatch>();
	const [openSCInfo, setOpenSCInfo] = useState<null | ServicesPayload>(null);

	useEffect(() => {
		dispatch(getAllServices());
	}, [dispatch]);

	const isMobile = useIsMobile();
	const { left, right } = useSizeWindows();
	const t = useTranslations("Services");
	const hundlerCloseServices = () => {
		setOpenSCInfo(null);
	};
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
						href="https://booksy.com/pl-pl/202886_medycyna-estetyczna-laser-diodowy_medycyna-estetyczna_19380_swinoujscie?do=invite&_branch_match_id=1529221794714245955&utm_medium=profile_share_from_profile&_branch_referrer=H4sIAAAAAAAAA8soKSkottLXT07J0UvKz88urtRLzs%2FVDymIKAjLtTTxjkiyrytKTUstKsrMS49PKsovL04tsnXLBIrlVwAAnvjsTz0AAAA%3D"
						target="_blank"
						rel="noopener noreferrer"
						className={`${s.btn} ${s.btn_mob}`}
					>
						{t("btn_reservation")}
					</a>
					{/* <button type="button" className={`${s.btn} ${s.btn_mob}`}>
						{t("btn_reservation")}
					</button> */}
				</div>
			</WrapperForComponentsAllSides>
			{openSCInfo ? (
				<ServicesVariant
					openSCInfo={openSCInfo}
					page="main"
					hundlerCloseServices={hundlerCloseServices}
				/>
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

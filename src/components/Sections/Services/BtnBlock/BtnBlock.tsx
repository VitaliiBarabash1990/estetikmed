import React from "react";
import s from "./BtnBlock.module.css";
import { useTranslations } from "next-intl";
import { LocalizedScrollLink } from "@/lib/utils/LocalizedScrollLink/LocalizedScrollLink";

const BtnBlock = () => {
	const t = useTranslations("Services");
	return (
		<div className={s.btnBlock}>
			<button type="button" className={s.btn}>
				{t("btn_reservation")}
			</button>
			<LocalizedScrollLink href="/" scrollId="Consultation" className={s.btn}>
				{t("btn_consultation")}
			</LocalizedScrollLink>
			{/* <button type="button" className={s.btn}>
				{t("btn_consultation")}
			</button> */}
		</div>
	);
};

export default BtnBlock;

import React from "react";
import s from "./BtnBlock.module.css";
import { useTranslations } from "next-intl";

const BtnBlock = () => {
	const t = useTranslations("Services");
	return (
		<div className={s.btnBlock}>
			<button type="button" className={s.btn}>
				{t("btn_reservation")}
			</button>
			<button type="button" className={s.btn}>
				{t("btn_consultation")}
			</button>
		</div>
	);
};

export default BtnBlock;

import React from "react";
import s from "./BtnBlock.module.css";
import { useTranslations } from "next-intl";
import { LocalizedScrollLink } from "@/lib/utils/LocalizedScrollLink/LocalizedScrollLink";

const BtnBlock = () => {
	const t = useTranslations("Services");
	return (
		<div className={s.btnBlock}>
			{/* <button type="button" className={s.btn}>
				{t("btn_reservation")}
			</button> */}
			{/* <a
				href="https://booksy.com/pl-pl/202886_medycyna-estetyczna-laser-diodowy_medycyna-estetyczna_19380_swinoujscie?do=invite&_branch_match_id=1529221794714245955&utm_medium=profile_share_from_profile&_branch_referrer=H4sIAAAAAAAAA8soKSkottLXT07J0UvKz88urtRLzs%2FVDymIKAjLtTTxjkiyrytKTUstKsrMS49PKsovL04tsnXLBIrlVwAAnvjsTz0AAAA%3D"
				target="_blank"
				rel="noopener noreferrer"
				className={s.btn}
			>
				{t("btn_reservation")}
			</a> */}
			<LocalizedScrollLink href="/" scrollId="Contacts" className={s.btn}>
				{t("btn_reservation")}
			</LocalizedScrollLink>
			<LocalizedScrollLink href="/" scrollId="CallbackForm" className={s.btn}>
				{t("btn_consultation")}
			</LocalizedScrollLink>
			{/* <button type="button" className={s.btn}>
				{t("btn_consultation")}
			</button> */}
		</div>
	);
};

export default BtnBlock;

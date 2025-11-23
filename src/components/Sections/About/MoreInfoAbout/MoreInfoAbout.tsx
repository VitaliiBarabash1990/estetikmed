"use client";
import React, { SetStateAction } from "react";
import s from "./MoreInfoAbout.module.css";
import { useTranslations } from "next-intl";
import Image from "next/image";
import { Link } from "@/i18n/routing";
import { LocalizedScrollLink } from "@/lib/utils/LocalizedScrollLink/LocalizedScrollLink";

type AboutProps = {
	setIsMore: React.Dispatch<SetStateAction<boolean>>;
};

const MoreInfoAbout: React.FC<AboutProps> = ({ setIsMore }) => {
	const t = useTranslations("About");

	return (
		<div className={s.aboutInfoWrapper}>
			<div className={s.aboutInfoDescription}>
				<div className={s.aboutBlockHead}>
					<h4 className={s.aboutInfoTitle}>{t("name")}</h4>
					<div className={s.aboutClose} onClick={() => setIsMore(false)}>
						<svg className={s.aboutIcon}>
							<use href="sprite.svg#icon-material-close-rounded"></use>
						</svg>
					</div>
				</div>

				<p className={s.aboutInfoText}>{t("description_large")}</p>
			</div>
			<LocalizedScrollLink
				href="/"
				scrollId="Consultation"
				className={s.btnConsultation}
			>
				{t("btn")}
			</LocalizedScrollLink>
			{/* <Link href="#" className={s.btnConsultation}>
				{t("btn")}
			</Link> */}
			<Image
				src="/img/About/about.webp"
				width={1152}
				height={600}
				alt="image"
				className={s.image}
			/>
		</div>
	);
};

export default MoreInfoAbout;

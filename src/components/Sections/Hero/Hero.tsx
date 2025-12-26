"use client";
import React from "react";
import s from "./Hero.module.css";
import Image from "next/image";
import { useTranslations } from "next-intl";

const Hero = () => {
	const t = useTranslations("Hero");

	// const linkReservation = () => {
	// 	window.open(
	// 		"https://booksy.com/pl-pl/202886_medycyna-estetyczna-laser-diodowy_medycyna-estetyczna_19380_swinoujscie?do=invite&_branch_match_id=1529221794714245955&utm_medium=profile_share_from_profile&_branch_referrer=H4sIAAAAAAAAA8soKSkottLXT07J0UvKz88urtRLzs%2FVDymIKAjLtTTxjkiyrytKTUstKsrMS49PKsovL04tsnXLBIrlVwAAnvjsTz0AAAA%3D",
	// 		"_blank",
	// 		"noopener,noreferrer"
	// 	);
	// };

	return (
		<div id="Hero" className={s.heroWrapper}>
			<div className={s.heroImageBlock}>
				<picture>
					{/* Desktop */}
					<source
						srcSet="/img/Hero/Hero_laptop_x2.webp"
						media="(min-width: 1280px)"
					/>

					{/* Tablet */}
					<source
						srcSet="/img/Hero/hero_tab_x2.webp"
						media="(min-width: 768px)"
					/>

					{/* Mobile */}
					<source
						srcSet="/img/Hero/hero_mob_x2.webp"
						media="(max-width: 767px)"
					/>

					<Image
						src="/img/Hero/hero_mob_x2.webp" // fallback
						alt="hero"
						fill
						style={{
							objectFit: "cover",
							objectPosition: "center",
						}}
						priority
					/>
				</picture>
			</div>
			<div className={s.heroBlockTitle}>
				<div className={s.heroTitleBlock}>
					<div className={s.heroName}>
						<div className={s.heroIcon}>
							<Image
								src="/img/Hero/logo.svg"
								alt={`logo`}
								fill // замість width/height
								style={{ objectFit: "cover", objectPosition: "center" }} // замощення
								sizes="100vw" // опційно для адаптивності
							/>
						</div>

						<h1 className={s.heroTitle}>{t("title")}</h1>
					</div>

					<h2 className={s.heroSubTitle}>{t("sub_title")}</h2>
				</div>
				<div className={s.heroBtnBlock}>
					{/* <button
						type="button"
						className={`${s.btn} ${s.reservationBtn}`}
						onClick={() => linkReservation()}
					>
						{t("button_1")}
					</button> */}
					{/* <a
						href="https://booksy.com/pl-pl/202886_medycyna-estetyczna-laser-diodowy_medycyna-estetyczna_19380_swinoujscie?do=invite&_branch_match_id=1529221794714245955&utm_medium=profile_share_from_profile&_branch_referrer=H4sIAAAAAAAAA8soKSkottLXT07J0UvKz88urtRLzs%2FVDymIKAjLtTTxjkiyrytKTUstKsrMS49PKsovL04tsnXLBIrlVwAAnvjsTz0AAAA%3D"
						target="_blank"
						rel="noopener noreferrer"
						className={`${s.btn} ${s.reservationBtn}`}
					>
						{t("button_1")}
					</a> */}
					<a href="#Contacts" className={`${s.btn} ${s.consultationBtn}`}>
						{t("button_1")}
					</a>
					<a href="#CallbackForm" className={`${s.btn} ${s.consultationBtn}`}>
						{t("button_2")}
					</a>
					{/* <button type="button" className={`${s.btn} ${s.consultationBtn}`}>
						{t("button_2")}
					</button> */}
				</div>
			</div>
		</div>
	);
};

export default Hero;

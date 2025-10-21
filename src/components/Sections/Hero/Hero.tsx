"use client";
import React, { useEffect, useState } from "react";
import s from "./Hero.module.css";
import Image from "next/image";
import { useTranslations } from "next-intl";

const Hero = () => {
	const [isLoaded, setIsLoaded] = useState(false);
	const t = useTranslations("Hero");

	useEffect(() => {
		setTimeout(() => {
			setIsLoaded(true);
		}, 10);
	}, []);

	return (
		<div className={`${s.heroWrapper} ${isLoaded ? s.lazyLoaded : ""}`}>
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
					<button type="button" className={`${s.btn} ${s.reservationBtn}`}>
						{t("button_1")}
					</button>
					<button type="button" className={`${s.btn} ${s.consultationBtn}`}>
						{t("button_2")}
					</button>
				</div>
			</div>
		</div>
	);
};

export default Hero;

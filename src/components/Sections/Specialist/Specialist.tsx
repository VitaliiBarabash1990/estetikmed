import React from "react";
import s from "./Specialist.module.css";
import { useTranslations } from "next-intl";
import Image from "next/image";

const Specialist = () => {
	const t = useTranslations("Specialist");
	return (
		<div id="Specialist" className={s.sectionSpecialist}>
			<div className={s.containerSpecialist}>
				<ul className={s.specialistWrapper}>
					<li className={s.specialistDescription}>
						<h3 className={s.specialistTitle}>{t("name")}</h3>
						<div className={s.textBlock}>
							<p className={s.specialistText}>{t("description")}</p>
						</div>
					</li>
					<li className={s.specialistImageBlock}>
						<Image
							src="/img/specialist/bg_specialist.webp"
							width={604}
							height={632}
							alt="img_specialist"
							className={s.image}
						/>
					</li>
				</ul>
			</div>
		</div>
	);
};

export default Specialist;

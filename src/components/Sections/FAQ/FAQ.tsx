"use client";
import useIsMobile from "@/lib/isMobile/isMobile";
import WrapperForComponentsAllSides from "@/lib/utils/WrapperForComponentsAllSides/WrapperForComponentsAllSides";
import React from "react";
import s from "./FAQ.module.css";
import AccordionList from "./AccordionList/AccordionList";
import { useTranslations } from "next-intl";

function FAQ() {
	const isMobile = useIsMobile();
	const t = useTranslations("Faq");
	return (
		<WrapperForComponentsAllSides
			paddingTop={isMobile ? 12 : 20}
			paddingBottom={isMobile ? 12 : 20}
			paddingLeft={isMobile ? 12 : 24}
			paddingRight={isMobile ? 12 : 24}
		>
			<div className={s.faqWrapper}>
				<div className={s.titleGroup}>
					<h3 className={s.title}>{t("title")}</h3>
				</div>
				<AccordionList />
			</div>
		</WrapperForComponentsAllSides>
	);
}

export default FAQ;

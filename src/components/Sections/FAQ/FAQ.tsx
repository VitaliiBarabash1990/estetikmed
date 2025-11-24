"use client";
import useIsMobile from "@/lib/isMobile/isMobile";
import WrapperForComponentsAllSides from "@/lib/utils/WrapperForComponentsAllSides/WrapperForComponentsAllSides";
import React from "react";
import s from "./FAQ.module.css";
import AccordionList from "./AccordionList/AccordionList";

function FAQ() {
	const isMobile = useIsMobile();
	return (
		<WrapperForComponentsAllSides
			paddingTop={isMobile ? 12 : 20}
			paddingBottom={isMobile ? 12 : 20}
			paddingLeft={isMobile ? 12 : 24}
			paddingRight={isMobile ? 12 : 24}
		>
			<div className={s.faqWrapper}>
				<div className={s.titleGroup}>
					<h3></h3>
				</div>
				<AccordionList />
			</div>
		</WrapperForComponentsAllSides>
	);
}

export default FAQ;

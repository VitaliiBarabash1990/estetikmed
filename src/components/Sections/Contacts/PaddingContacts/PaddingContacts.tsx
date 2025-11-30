import React, { ReactNode } from "react";
import s from "./PaddingContacts.module.css";

type MediaPaddingProps = {
	children: ReactNode;
};

const PaddingContacts = ({ children }: MediaPaddingProps) => {
	return (
		<div className={s.sectionContacts}>
			<div className={s.containerContacts}>{children}</div>
		</div>
	);
};

export default PaddingContacts;

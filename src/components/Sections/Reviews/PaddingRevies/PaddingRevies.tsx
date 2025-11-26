import React, { ReactNode } from "react";
import s from "./PaddingRevies.module.css";

type RewiewsPaddingProps = {
	children: ReactNode;
};

const PaddingRevies = ({ children }: RewiewsPaddingProps) => {
	return (
		<div className={s.sectionReviews}>
			<div className={s.containerReviews}>{children}</div>
		</div>
	);
};

export default PaddingRevies;

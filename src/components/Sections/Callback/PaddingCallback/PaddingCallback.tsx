import React, { ReactNode } from "react";
import s from "./PaddingCallback.module.css";

type MediaPaddingProps = {
	children: ReactNode;
};

const PaddingCallback = ({ children }: MediaPaddingProps) => {
	return (
		<div className={s.sectionCallback}>
			<div className={s.containerCallback}>{children}</div>
		</div>
	);
};

export default PaddingCallback;

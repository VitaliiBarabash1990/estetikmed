import React, { ReactNode } from "react";
import s from "./PaddingMedia.module.css";

type MediaPaddingProps = {
	children: ReactNode;
};

const PaddingMedia = ({ children }: MediaPaddingProps) => {
	return (
		<div className={s.sectionGallery}>
			<div className={s.containerGallery}>{children}</div>
		</div>
	);
};

export default PaddingMedia;

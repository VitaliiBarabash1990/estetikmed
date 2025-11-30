import React from "react";
import SliderGallery from "./SliderGallery/SliderGallery";
import PaddingMedia from "./PaddingMedia/PaddingMedia";
import SliderReels from "./SliderReels/SliderReels";
import s from "./Media.module.css";

function Media() {
	return (
		<PaddingMedia>
			<div className={s.mediaWrapper}>
				{/* <SliderReels /> */}
				<SliderGallery />
			</div>
		</PaddingMedia>
	);
}

export default Media;

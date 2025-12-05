import React from "react";
import s from "./SlideItem.module.css";
import Image from "next/image";

type SlideItemProps = {
	item: string;
};

const SlideItem: React.FC<SlideItemProps> = ({ item }) => {
	return (
		<div className={s.slideWrapper}>
			<Image src={item} fill className={s.image} alt="image" />
		</div>
	);
};

export default SlideItem;

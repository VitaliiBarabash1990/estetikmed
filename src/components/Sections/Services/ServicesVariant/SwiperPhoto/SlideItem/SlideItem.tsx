import React from "react";
import s from "./SlideItem.module.css";
import Image from "next/image";

type SlideItemProps = {
	item: string;
};

const SlideItem: React.FC<SlideItemProps> = ({ item }) => {
	console.log("item", item);
	return (
		<div className={s.slideWrapper}>
			<Image
				src={item}
				width={100}
				height={100}
				sizes="100vw"
				className={s.image}
				alt="image"
			/>
		</div>
	);
};

export default SlideItem;

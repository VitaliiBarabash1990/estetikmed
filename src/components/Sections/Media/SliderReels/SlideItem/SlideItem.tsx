"use client";
import React from "react";
import s from "./SlideItem.module.css";
import Image from "next/image";

type SlideItemProps = {
	item: string;
};

const SlideItem: React.FC<SlideItemProps> = ({ item }) => {
	return (
		<div className={s.slideWrapper}>
			<div className={s.imageWrapper}>
				{/* <Image
					src={item}
					width={80}
					height={80}
					sizes="100vw"
					alt={`article`}
					className={s.image}
				/> */}

				<video src={item} className={s.video} playsInline muted autoPlay loop />
			</div>
		</div>
	);
};

export default SlideItem;

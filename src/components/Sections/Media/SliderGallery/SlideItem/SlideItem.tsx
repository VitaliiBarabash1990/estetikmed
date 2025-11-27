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
			<div className={s.sliderContent}>
				<div className={s.imageWrapper}>
					<Image
						src={item}
						width={372}
						height={300}
						sizes="100vw"
						alt={`article`}
						className={s.image}
					/>
				</div>
			</div>
		</div>
	);
};

export default SlideItem;

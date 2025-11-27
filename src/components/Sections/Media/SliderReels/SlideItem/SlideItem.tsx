"use client";
import React, { SetStateAction } from "react";
import s from "./SlideItem.module.css";
import Image from "next/image";

type SlideItemProps = {
	item: string;
	setModalVideo: React.Dispatch<SetStateAction<string | null>>;
};

const SlideItem: React.FC<SlideItemProps> = ({ item, setModalVideo }) => {
	return (
		<div className={s.slideWrapper}>
			<div className={s.imageWrapper} onClick={() => setModalVideo(item)}>
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

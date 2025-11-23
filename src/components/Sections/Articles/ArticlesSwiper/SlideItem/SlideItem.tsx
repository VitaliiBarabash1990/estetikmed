import React from "react";
import s from "./SlideItem.module.css";
import { ItemProps } from "../ArticlesSwiper";
import Image from "next/image";

type SlideItemProps = {
	item: ItemProps;
};

const SlideItem: React.FC<SlideItemProps> = ({ item }) => {
	return (
		<div className={s.slideWrapper}>
			<div className={s.sliderContent}>
				<Image
					src={item.img}
					width={372}
					height={300}
					sizes="100vw"
					alt={`article_` + `${item.id}`}
					className={s.image}
				/>
				<div className={s.btnArticle}>
					<svg className={s.iconBtn}>
						<use href="/sprite.svg#icon-arrow-bottom-left"></use>
					</svg>
				</div>
				<div className={s.sliderContentDescr}>
					<h3 className={s.title}>{item.title}</h3>
					<p className={s.description}>{item.text.slice(0, 50)}</p>
				</div>
			</div>
		</div>
	);
};

export default SlideItem;

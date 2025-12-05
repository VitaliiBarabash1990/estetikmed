import React from "react";
import s from "./ArticleList.module.css";
import SlideItem from "../../Articles/ArticlesSwiper/SlideItem/SlideItem";
import { ArticleItemProps } from "@/lib/types/types";

type ArticlesListProps = {
	articlesList: ItemProps[];
	setOpenSAInfo?: React.Dispatch<React.SetStateAction<ArticleItemProps | null>>;
};

export type ItemProps = {
	id: number;
	img: string;
	title: string;
	text: string;
};

const ArticleList: React.FC<ArticlesListProps> = ({
	articlesList,
	setOpenSAInfo,
}) => {
	return (
		<ul className={s.articleList}>
			{articlesList.map((item) => (
				<li key={item.id} className={s.articleItem}>
					<SlideItem item={item} setOpenSAInfo={setOpenSAInfo} />
				</li>
			))}
		</ul>
	);
};

export default ArticleList;

import React from "react";
import s from "./ArticleList.module.css";
import SlideItem from "../../Articles/ArticlesSwiper/SlideItem/SlideItem";

type ArticlesListProps = { articlesList: ItemProps[] };

export type ItemProps = {
	id: number;
	img: string;
	title: string;
	text: string;
};

const ArticleList: React.FC<ArticlesListProps> = ({ articlesList }) => {
	return (
		<ul className={s.articleList}>
			{articlesList.map((item) => (
				<li key={item.id} className={s.articleItem}>
					<SlideItem item={item} />
				</li>
			))}
		</ul>
	);
};

export default ArticleList;

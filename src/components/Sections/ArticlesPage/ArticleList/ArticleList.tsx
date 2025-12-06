import React from "react";
import s from "./ArticleList.module.css";
import SlideItem from "../../Articles/ArticlesSwiper/SlideItem/SlideItem";
import { ArticlesPayload } from "@/lib/types/types";

type ArticlesListProps = {
	articlesList: ArticlesPayload[];
	setOpenSAInfo?: React.Dispatch<React.SetStateAction<ArticlesPayload | null>>;
};

const ArticleList: React.FC<ArticlesListProps> = ({
	articlesList,
	setOpenSAInfo,
}) => {
	return (
		<ul className={s.articleList}>
			{articlesList.map((item) => (
				<li key={item._id} className={s.articleItem}>
					<SlideItem item={item} setOpenSAInfo={setOpenSAInfo} />
				</li>
			))}
		</ul>
	);
};

export default ArticleList;

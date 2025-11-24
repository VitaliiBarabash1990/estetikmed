import { articles } from "@/lib/ data/articles";
import { useTranslations } from "next-intl";
import React from "react";
import TitleGroup from "../ArticlesPage/TitleGroup/TitleGroup";
import s from "./ArticlesItem.module.css";
import Image from "next/image";

type ArticlesItemType = {
	id: string;
};

const ArticlesItem: React.FC<ArticlesItemType> = ({ id }) => {
	const t = useTranslations("Articles");

	const article = articles.find((item) => String(item.id) === id);

	if (!article) {
		return <div>Article not found</div>;
	}

	return (
		<div className={s.articleWrapper}>
			<TitleGroup title={t(article.titleKey)} type="article" />
			<p className={s.text}>{t(article.textKey)}</p>
			<div className={s.imageWrapper}>
				<Image
					src={article.img}
					width={1152}
					height={600}
					alt={`imgage` + `${article.id}`}
					className={s.image}
				/>
			</div>
		</div>
	);
};

export default ArticlesItem;

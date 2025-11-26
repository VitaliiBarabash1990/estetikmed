"use client";
import React from "react";
import s from "./ArticlesPage.module.css";
import TitleGroup from "./TitleGroup/TitleGroup";
import { useTranslations } from "next-intl";
import ArticleList from "./ArticleList/ArticleList";
import { articles } from "@/lib/data/articles";

const ArticlesPage = () => {
	const t = useTranslations("Articles");
	const articlesList = articles.map((item) => ({
		id: item.id,
		img: item.img,
		title: t(item.titleKey),
		text: t(item.textKey),
	}));
	return (
		<div className={s.articlePageWrapper}>
			<TitleGroup title={t("title")} type="blog" />
			<ArticleList articlesList={articlesList} />
		</div>
	);
};

export default ArticlesPage;

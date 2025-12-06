"use client";
import React from "react";
import s from "./ArticlesPage.module.css";
import TitleGroup from "./TitleGroup/TitleGroup";
import { useTranslations } from "next-intl";
import ArticleList from "./ArticleList/ArticleList";
import { useSelector } from "react-redux";
import { selectArticles } from "@/redux/articles/selectors";

const ArticlesPage = () => {
	const t = useTranslations("Articles");
	const articlesList = useSelector(selectArticles);
	return (
		<div className={s.articlePageWrapper}>
			<TitleGroup title={t("title")} type="blog" />
			<ArticleList articlesList={articlesList} />
		</div>
	);
};

export default ArticlesPage;

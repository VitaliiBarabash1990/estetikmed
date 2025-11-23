"use client";
import React from "react";
import s from "./Articles.module.css";
import { articles } from "@/lib/ data/articles";
import { useTranslations } from "next-intl";
import ArticlesSwiper from "./ArticlesSwiper/ArticlesSwiper";
import AllArticles from "./AllArticles/AllArticles";

const Articles = () => {
	const t = useTranslations("Articles");
	const articlesList = articles.map((item) => ({
		id: item.id,
		img: "/img/Articles/Photo.webp",
		title: t(item.titleKey),
		text: t(item.textKey),
	}));
	return (
		<div className={s.sectionWrapper}>
			<ArticlesSwiper articlesList={articlesList} />
			<AllArticles text={t("btn")} />
		</div>
	);
};

export default Articles;

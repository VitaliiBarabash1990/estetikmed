"use client";
import React, { useEffect } from "react";
import s from "./Articles.module.css";
import { articles } from "@/lib/data/articles";
import { useTranslations } from "next-intl";
import ArticlesSwiper from "./ArticlesSwiper/ArticlesSwiper";
import AllArticles from "./AllArticles/AllArticles";
import { useDispatch } from "react-redux";
import { AppDispatch } from "@/redux/store";
import { getAllArticles } from "@/redux/articles/operations";

const Articles = () => {
	const dispatch = useDispatch<AppDispatch>();
	const t = useTranslations("Articles");
	useEffect(() => {
		dispatch(getAllArticles());
	}, [dispatch]);

	return (
		<div className={s.sectionWrapper}>
			<ArticlesSwiper />
			<AllArticles text={t("btn")} />
		</div>
	);
};

export default Articles;

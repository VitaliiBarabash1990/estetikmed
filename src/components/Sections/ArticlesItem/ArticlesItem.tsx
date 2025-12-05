"use client";
import { articles } from "@/lib/data/articles";
import { useTranslations } from "next-intl";
import React, { SetStateAction } from "react";
import TitleGroup from "../ArticlesPage/TitleGroup/TitleGroup";
import s from "./ArticlesItem.module.css";
import Image from "next/image";
import { usePathname } from "@/i18n/routing";
import { ArticleItemProps } from "@/lib/types/types";

type ArticlesItemType = {
	id: string | number | null;
	setOpenSAInfo?: React.Dispatch<SetStateAction<ArticleItemProps | null>>;
	type?: "blog" | "article" | "admin";
	hundlerEdit?: () => void;
};

const ArticlesItem: React.FC<ArticlesItemType> = ({
	id,
	setOpenSAInfo,
	type,
	hundlerEdit,
}) => {
	const path = usePathname().split("/")[1];

	const t = useTranslations("Articles");

	const article = articles.find((item) =>
		path === "admin" ? String(item.id) : String(item.id) === id
	);

	if (!article) {
		return <div>Article not found</div>;
	}

	return (
		<div className={s.articleWrapper}>
			<TitleGroup
				title={t(article.titleKey)}
				setOpenSAInfo={setOpenSAInfo}
				type={type}
				hundlerEdit={hundlerEdit}
			/>
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

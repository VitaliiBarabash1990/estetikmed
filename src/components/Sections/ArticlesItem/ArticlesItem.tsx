"use client";
import { useLocale } from "next-intl";
import React, { SetStateAction } from "react";
import TitleGroup from "../ArticlesPage/TitleGroup/TitleGroup";
import s from "./ArticlesItem.module.css";
import Image from "next/image";
import { Locale } from "@/i18n/routing";
import { ArticlesPayload } from "@/lib/types/types";
import { useSelector } from "react-redux";
import { selectArticles } from "@/redux/articles/selectors";

type ArticlesItemType = {
	id: string | null;
	setOpenSAInfo?: React.Dispatch<SetStateAction<ArticlesPayload | null>>;
	type?: "blog" | "article" | "admin";
	hundlerEdit?: () => void;
};

const ArticlesItem: React.FC<ArticlesItemType> = ({
	id,
	setOpenSAInfo,
	type,
	hundlerEdit,
}) => {
	const articles = useSelector(selectArticles);
	const local = useLocale() as Locale;

	const article = articles.find((item) => String(item._id) === id);

	if (!article) {
		return <div>Article not found</div>;
	}

	return (
		<div className={s.articleWrapper}>
			<TitleGroup
				title={article[local].title}
				setOpenSAInfo={setOpenSAInfo}
				type={type}
				hundlerEdit={hundlerEdit}
				id={id}
			/>
			<p className={s.text}>{article[local].article}</p>
			{article.img && (
				<div className={s.imageWrapper}>
					<Image
						src={article.img}
						width={1152}
						height={600}
						alt={`image` + `${article._id}`}
						className={s.image}
					/>
				</div>
			)}
		</div>
	);
};

export default ArticlesItem;

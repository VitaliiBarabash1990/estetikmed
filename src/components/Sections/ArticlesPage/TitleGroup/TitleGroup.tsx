"use client";
import React from "react";
import s from "./TitleGroup.module.css";
import { redirect } from "@/i18n/routing";
import { useLocale } from "next-intl";

type TitleGroupProps = {
	title: string;
	type?: "blog" | "article";
};

const TitleGroup: React.FC<TitleGroupProps> = ({ title, type = "blog" }) => {
	const locale = useLocale();
	const redirectLink = () => {
		if (type !== "blog") {
			redirect({ href: "/blog", locale });
		} else redirect({ href: "/", locale });
	};
	return (
		<div className={s.titleGroup}>
			<h3 className={s.titleArticle}>{title}</h3>
			<button
				type="button"
				className={`${s.btnArticle} ${type !== "blog" ? s.btnArticleDark : ""}`}
				onClick={redirectLink}
			>
				<svg className={s.iconClose}>
					<use href="/sprite.svg#icon-material-close-rounded"></use>
				</svg>
			</button>
		</div>
	);
};

export default TitleGroup;

"use client";
import React, { SetStateAction } from "react";
import s from "./TitleGroup.module.css";
import { redirect, usePathname } from "@/i18n/routing";
import { useLocale } from "next-intl";
import { ArticlesPayload } from "@/lib/types/types";
import { deleteArticles } from "@/redux/articles/operations";
import { useDispatch } from "react-redux";
import { AppDispatch } from "@/redux/store";

type TitleGroupProps = {
	title: string;
	type?: string;
	setOpenSAInfo?: React.Dispatch<SetStateAction<ArticlesPayload | null>>;
	hundlerEdit?: () => void;
	id: string | null;
};

const TitleGroup: React.FC<TitleGroupProps> = ({
	title,
	type = "blog",
	setOpenSAInfo,
	hundlerEdit,
	id,
}) => {
	const dispatch = useDispatch<AppDispatch>();
	const path = usePathname().split("/")[1];
	const segments = usePathname().split("/").filter(Boolean);
	const locale = useLocale();
	const redirectLink = () => {
		if (type === "admin" && path === "admin") {
			setOpenSAInfo?.(null);
			return;
		}

		if (segments[0] === "blog" && segments.length === 1) {
			redirect({ href: "/", locale });
			return;
		}

		if (segments[0] === "blog" && segments.length === 2) {
			redirect({ href: "/blog", locale });
			return;
		}
	};
	console.log("TYPE", type);
	return (
		<div className={s.titleGroup}>
			<h3
				className={`${s.titleArticle} ${
					type !== "blog" ? "" : s.titleArticleBlog
				}`}
			>
				{title}
			</h3>
			<div className={s.btnTitleGroup}>
				{type === "admin" && (
					<>
						<button
							type="button"
							className={`${s.btnArticle} ${
								type === "admin" ? s.btnArticleDark : ""
							}`}
							onClick={() => {
								if (id !== null) {
									dispatch(deleteArticles(String(id)));
								}
								setOpenSAInfo?.(null);
							}}
						>
							<svg className={s.iconClose}>
								<use href="/sprite.svg#icon-delete"></use>
							</svg>
						</button>
						<button
							type="button"
							className={`${s.btnArticle} ${
								type === "admin" ? s.btnArticleDark : ""
							}`}
							onClick={() => {
								if (hundlerEdit) hundlerEdit();
							}}
						>
							<svg className={`${s.iconClose} ${s.edit}`}>
								<use href="/sprite.svg#icon-edit"></use>
							</svg>
						</button>
					</>
				)}

				<button
					type="button"
					className={`${s.btnArticle} ${
						type !== "blog" ? s.btnArticleDark : ""
					}`}
					onClick={redirectLink}
				>
					<svg className={s.iconClose}>
						<use href="/sprite.svg#icon-material-close-rounded"></use>
					</svg>
				</button>
			</div>
		</div>
	);
};

export default TitleGroup;

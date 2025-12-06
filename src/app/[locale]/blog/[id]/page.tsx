"use client";
import AllArticles from "@/components/Sections/Articles/AllArticles/AllArticles";
import ArticlesItem from "@/components/Sections/ArticlesItem/ArticlesItem";
import useIsMobile from "@/lib/isMobile/isMobile";
import WrapperForComponentsAllSides from "@/lib/utils/WrapperForComponentsAllSides/WrapperForComponentsAllSides";
import { getAllArticles } from "@/redux/articles/operations";
import { AppDispatch } from "@/redux/store";
import { useTranslations } from "next-intl";
import { useParams } from "next/navigation";
import React, { useEffect } from "react";
import { useDispatch } from "react-redux";

const Page = () => {
	const dispatch = useDispatch<AppDispatch>();
	const isMobile = useIsMobile();
	const params = useParams();
	const id = params?.id as string;
	const t = useTranslations("Articles");
	useEffect(() => {
		dispatch(getAllArticles());
	}, [dispatch]);
	return (
		<WrapperForComponentsAllSides
			paddingTop={isMobile ? 20 : 40}
			paddingBottom={isMobile ? 20 : 40}
			paddingLeft={isMobile ? 12 : 24}
			paddingRight={isMobile ? 12 : 24}
		>
			<ArticlesItem id={id} type="article" />
			<div
				style={{
					display: "flex",
					justifyContent: "center",
					paddingTop: isMobile ? "24px" : "40px",
				}}
			>
				<AllArticles text={t("btn")} />
			</div>
		</WrapperForComponentsAllSides>
	);
};

export default Page;

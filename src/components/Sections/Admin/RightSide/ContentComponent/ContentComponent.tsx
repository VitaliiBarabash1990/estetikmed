"use client";
import React, { useEffect, useState } from "react";
import s from "./ContentComponent.module.css";
import Selectors from "./Selectors/Selectors";
import Container from "./Container/Container";
import ServicesSection from "@/components/Sections/Services/ServicesCategory/ServicesSection/ServicesSection";
import AddServices from "./AddServices/AddServices";
import ServicesVariant from "@/components/Sections/Services/ServicesVariant/ServicesVariant";
import {
	ArticlesPayload,
	ReviewsPayload,
	ServicesPayload,
} from "@/lib/types/types";
import ArticleList from "@/components/Sections/ArticlesPage/ArticleList/ArticleList";
import ArticlesItem from "@/components/Sections/ArticlesItem/ArticlesItem";
import AddArticles from "./AddArticles/AddArticles";
import SliderReviews from "@/components/Sections/Reviews/SliderReviews/SliderReviews";
import AddReviews from "./AddReviews/AddReviews";
import AddMedia from "./AddMedia/AddMedia";
import { useDispatch, useSelector } from "react-redux";
import { AppDispatch } from "@/redux/store";
import { getAllServices } from "@/redux/services/operations";
import { getAllArticles } from "@/redux/articles/operations";
import { selectArticles } from "@/redux/articles/selectors";
import { getAllReviews } from "@/redux/reviews/operations";

export type ContentComponentProps = {
	type: string;
};

const ContentComponent: React.FC<ContentComponentProps> = ({ type }) => {
	const dispatch = useDispatch<AppDispatch>();

	// ---------------- States ----------------
	const [openSCInfo, setOpenSCInfo] = useState<ServicesPayload | null>(null);
	const [openSAInfo, setOpenSAInfo] = useState<ArticlesPayload | null>(null);
	const [openRSInfo, setOpenRSInfo] = useState<ReviewsPayload | null>(null);
	const [option, setOption] = useState(0);
	const [category, setCategory] = useState(0); // вибрана категорія
	const [language, setLanguage] = useState("pl");

	// Зберігаємо номер сторінки для кожної категорії
	const [pagesByCategory, setPagesByCategory] = useState<
		Record<number, number>
	>({});

	// ---------------- Fetch ----------------
	useEffect(() => {
		dispatch(getAllServices());
		dispatch(getAllArticles());
		dispatch(getAllReviews());
	}, [dispatch]);

	// ---------------- Helpers ----------------
	const isServices = option === 0;

	const categoryToId: Record<number, number> = {
		0: 0,
		2: 1,
		3: 2,
	};

	const articlesList = useSelector(selectArticles);

	const hundlerEdit = () => {
		setOption(1);
	};

	const hundlerCloseServices = () => {
		setOpenSCInfo(null);
	};

	const handlePageChange = (catId: number, page: number) => {
		setPagesByCategory((prev) => ({ ...prev, [catId]: page }));
	};

	// ---------------- Render ----------------
	return (
		<div className={s.content}>
			<Selectors
				type={type}
				category={category}
				setCategory={setCategory}
				option={option}
				setOption={setOption}
				language={language}
				setLanguage={setLanguage}
				setOpenSCInfo={setOpenSCInfo}
				setOpenSAInfo={setOpenSAInfo}
				setOpenRSInfo={setOpenRSInfo}
			/>

			{/* ---------- SERVICES ---------- */}
			{type === "services" &&
				(isServices ? (
					<Container>
						{openSCInfo ? (
							<ServicesVariant
								openSCInfo={openSCInfo}
								hundlerCloseServices={hundlerCloseServices}
								hundlerEdit={hundlerEdit}
								page="admin"
								type={type}
							/>
						) : (
							<ServicesSection
								id={categoryToId[category]}
								currentPage={pagesByCategory[categoryToId[category]] ?? 1}
								onPageChange={(page) =>
									handlePageChange(categoryToId[category], page)
								}
								setOpenSCInfo={(payload) => setOpenSCInfo(payload)}
							/>
						)}
					</Container>
				) : (
					<AddServices
						isEdit={!isServices}
						language={language}
						id={categoryToId[category]}
						category={openSCInfo}
						setOption={setOption}
						setBack={setOpenSCInfo}
					/>
				))}

			{/* ---------- ARTICLES ---------- */}
			{type === "articles" &&
				(isServices ? (
					<Container>
						{openSAInfo ? (
							<ArticlesItem
								id={openSAInfo?._id ?? null}
								setOpenSAInfo={setOpenSAInfo}
								type="admin"
								hundlerEdit={hundlerEdit}
							/>
						) : (
							<ArticleList
								articlesList={articlesList}
								setOpenSAInfo={setOpenSAInfo}
							/>
						)}
					</Container>
				) : (
					<AddArticles
						isEdit={!isServices}
						language={language}
						article={openSAInfo}
						setOption={setOption}
						setBack={setOpenSAInfo}
					/>
				))}

			{/* ---------- MEDIA ---------- */}
			{type === "media" &&
				(isServices ? <AddMedia type={option} /> : <AddMedia type={option} />)}

			{/* ---------- REVIEWS ---------- */}
			{type === "reviews" &&
				(isServices ? (
					<Container>
						<SliderReviews
							page="admin"
							hundlerEdit={hundlerEdit}
							setOpenRSInfo={setOpenRSInfo}
						/>
					</Container>
				) : (
					<AddReviews
						isEdit={!isServices}
						language={language}
						reviews={openRSInfo}
						setOption={setOption}
					/>
				))}
		</div>
	);
};

export default ContentComponent;

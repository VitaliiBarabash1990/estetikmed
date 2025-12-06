"use client";
import React, { useEffect, useState } from "react";
import s from "./ContentComponent.module.css";
import Selectors from "./Selectors/Selectors";
import Container from "./Container/Container";
import ServicesSection from "@/components/Sections/Services/ServicesCategory/ServicesSection/ServicesSection";
import AddServices from "./AddServices/AddServices";
import ServicesVariant from "@/components/Sections/Services/ServicesVariant/ServicesVariant";
import { ArticlesPayload, ServicesPayload } from "@/lib/types/types";
import ArticleList from "@/components/Sections/ArticlesPage/ArticleList/ArticleList";
import ArticlesItem from "@/components/Sections/ArticlesItem/ArticlesItem";
import AddArticles from "./AddArticles/AddArticles";
import SliderReviews, {
	ReviewsItemProps,
} from "@/components/Sections/Reviews/SliderReviews/SliderReviews";
import AddReviews from "./AddReviews/AddReviews";
import AddMedia from "./AddMedia/AddMedia";
import { useDispatch, useSelector } from "react-redux";
import { AppDispatch } from "@/redux/store";
import { getAllServices } from "@/redux/services/operations";
import { getAllArticles } from "@/redux/articles/operations";
import { selectArticles } from "@/redux/articles/selectors";

export type ContentComponentProps = {
	type: string;
};

const ContentComponent: React.FC<ContentComponentProps> = ({ type }) => {
	const dispatch = useDispatch<AppDispatch>();
	const [openSCInfo, setOpenSCInfo] = useState<null | ServicesPayload>(null);
	const [openSAInfo, setOpenSAInfo] = useState<null | ArticlesPayload>(null);
	const [openRSInfo, setOpenRSInfo] = useState<null | ReviewsItemProps>(null);
	const [option, setOption] = useState(0);
	const [category, setCategory] = useState(0); // вибрана категорія (0..n)
	const [language, setLanguage] = useState("pl");

	useEffect(() => {
		dispatch(getAllServices());
		dispatch(getAllArticles());
	}, [dispatch]);

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
			/>

			{type === "services" &&
				(isServices ? (
					<Container>
						{openSCInfo ? (
							<ServicesVariant
								openSCInfo={openSCInfo}
								hundlerCloseServices={hundlerCloseServices}
								hundlerEdit={hundlerEdit}
								page="admin"
							/>
						) : (
							<ServicesSection
								id={categoryToId[category]}
								setOpenSCInfo={setOpenSCInfo}
							/>
						)}
					</Container>
				) : (
					<AddServices
						isEdit={!isServices}
						language={language}
						id={categoryToId[category]}
						category={openSCInfo}
					/>
				))}

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
					/>
				))}

			{type === "media" &&
				(isServices ? <AddMedia type={option} /> : <AddMedia type={option} />)}

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
					<AddReviews language={language} reviews={openRSInfo} />
				))}
		</div>
	);
};

export default ContentComponent;

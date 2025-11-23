"use client";
import React, { useState } from "react";
import s from "./ContentComponent.module.css";
import Selectors from "./Selectors/Selectors";
import Container from "./Container/Container";
import ServicesSection, {
	ItemProps,
} from "@/components/Sections/Services/ServicesCategory/ServicesSection/ServicesSection";
import AddServices from "./AddServices/AddServices";
import ServicesVariant from "@/components/Sections/Services/ServicesVariant/ServicesVariant";

export type ContentComponentProps = {
	type: string;
};

const ContentComponent: React.FC<ContentComponentProps> = ({ type }) => {
	const [openSCInfo, setOpenSCInfo] = useState<null | ItemProps>(null);
	const [option, setOption] = useState(0);
	const [category, setCategory] = useState(0); // вибрана категорія (0..n)
	const [language, setLanguage] = useState("pl");

	const isServices = option === 0;

	const categoryToId: Record<number, number> = {
		0: 0,
		2: 1,
		3: 2,
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
			/>

			{isServices ? (
				<Container>
					{openSCInfo ? (
						<ServicesVariant openSCInfo={openSCInfo} />
					) : (
						<ServicesSection
							id={categoryToId[category]}
							setOpenSCInfo={setOpenSCInfo}
						/>
					)}
				</Container>
			) : (
				<AddServices language={language} id={categoryToId[category]} />
			)}
		</div>
	);
};

export default ContentComponent;

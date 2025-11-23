"use client";
import React from "react";
import ContentComponent from "./ContentComponent/ContentComponent";

type RightSideProps = {
	activeItem: number;
};

const RightSide: React.FC<RightSideProps> = ({ activeItem }) => {
	return (
		<>
			{activeItem === 0 && <ContentComponent type="services" />}
			{activeItem === 1 && <ContentComponent type="articles" />}
			{activeItem === 2 && <ContentComponent type="media" />}
			{activeItem === 3 && <ContentComponent type="reviews" />}
		</>
	);
};

export default RightSide;

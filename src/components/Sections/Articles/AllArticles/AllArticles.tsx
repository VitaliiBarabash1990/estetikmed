import React from "react";
import s from "./AllArticles.module.css";

const AllArticles = ({ text }: { text: string }) => {
	return (
		<button type="button" className={s.btnAllArticles}>
			{text}
		</button>
	);
};

export default AllArticles;

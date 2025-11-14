"use client";
import React from "react";
import s from "./PaginationBoolit.module.css";

type CountItemProps = {
	countItem: number;
};

const PaginationBoolit: React.FC<CountItemProps> = ({ countItem }) => {
	return (
		<ul className={s.boolitList}>
			{[0, 1, 2, 3, 4, 5, 6, 7].map((item) => (
				<li key={item} className={s.boolitItem}></li>
			))}
		</ul>
	);
};

export default PaginationBoolit;

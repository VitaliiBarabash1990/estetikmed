"use client";
import React from "react";
import s from "./PaginationBoolit.module.css";

type Props = {
	page: number; // активна сторінка
	setPage: (p: number) => void;
	totalPages: number; // скільки ВСЬОГО сторінок
};

const PaginationBoolit = ({ page, setPage, totalPages }: Props) => {
	return (
		<ul className={s.boolitList}>
			{Array.from({ length: totalPages }).map((_, i) => (
				<li
					key={i}
					className={`${s.boolitItem} ${page === i + 1 ? s.active : ""}`}
					onClick={() => setPage(i + 1)}
				></li>
			))}
		</ul>
	);
};

export default PaginationBoolit;

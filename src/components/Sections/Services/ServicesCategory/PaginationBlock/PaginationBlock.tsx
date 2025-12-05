import React from "react";
import s from "./PaginationBlock.module.css";

type Props = {
	page: number;
	setPage: (p: number) => void;
	totalPages: number;
};

const PaginationBlock = ({ page, setPage, totalPages }: Props) => {
	const prev = () => page > 1 && setPage(page - 1);
	const next = () => page < totalPages && setPage(page + 1);

	return (
		<div className={s.paginationBlock}>
			<button type="button" className={s.btnPagination} onClick={prev}>
				<svg className={s.paginationIcon}>
					<use href="/sprite.svg#icon-arrow-outlined"></use>
				</svg>
			</button>

			<button type="button" className={s.btnPagination} onClick={next}>
				<svg className={`${s.paginationIcon} ${s.iconRight}`}>
					<use href="/sprite.svg#icon-arrow-outlined"></use>
				</svg>
			</button>
		</div>
	);
};

export default PaginationBlock;

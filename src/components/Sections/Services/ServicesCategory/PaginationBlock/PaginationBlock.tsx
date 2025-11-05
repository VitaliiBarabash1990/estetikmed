import React from "react";
import s from "./PaginationBlock.module.css";

const PaginationBlock = () => {
	return (
		<div className={s.paginationBlock}>
			<button type="button" className={s.btnPagination}>
				<svg className={`${s.paginationIcon}`}>
					<use href="/sprite.svg#icon-arrow-outlined"></use>
				</svg>
			</button>
			<button type="button" className={s.btnPagination}>
				<svg className={`${s.paginationIcon} ${s.iconRight}`}>
					<use href="/sprite.svg#icon-arrow-outlined"></use>
				</svg>
			</button>
		</div>
	);
};

export default PaginationBlock;

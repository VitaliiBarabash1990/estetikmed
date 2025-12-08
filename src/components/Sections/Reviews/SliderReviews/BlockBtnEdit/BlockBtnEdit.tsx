import React from "react";
import s from "./BlockBtnEdit.module.css";

export type BlockBtnProps = {
	hundlerEdit: () => void;
	hundlerDelete: () => void;
};

const BlockBtnEdit = ({ hundlerEdit, hundlerDelete }: BlockBtnProps) => {
	return (
		<div className={s.wrapperBlockBtn}>
			<button className={s.btn} onClick={hundlerDelete}>
				<svg className={s.deleteBtn}>
					<use href="/sprite.svg#icon-delete"></use>
				</svg>
			</button>
			<button className={s.btn} onClick={hundlerEdit}>
				<svg className={s.editBtn}>
					<use href="/sprite.svg#icon-edit"></use>
				</svg>
			</button>
		</div>
	);
};

export default BlockBtnEdit;

import React, { SetStateAction } from "react";
import s from "./LeftSide.module.css";

type activeProps = {
	activeItem: number;
	setActiveItem: React.Dispatch<SetStateAction<number>>;
};

const LeftSide: React.FC<activeProps> = ({ activeItem, setActiveItem }) => {
	const menuList = ["Услуги", "Блог", "Галерея", "Отзывы"];
	return (
		<ul className={s.menuAdmin}>
			{menuList.map((item, idx) => (
				<li key={idx} className={s.menuItem}>
					<button
						type="button"
						className={`${s.menuBtn} ${activeItem === idx ? s.active : ""}`}
						onClick={() => setActiveItem(idx)}
					>
						{item}
					</button>
				</li>
			))}
		</ul>
	);
};

export default LeftSide;

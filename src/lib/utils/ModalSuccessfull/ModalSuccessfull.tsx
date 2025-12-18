import React from "react";
import s from "./ModalSuccessfull.module.css";
import { useDispatch } from "react-redux";
import { AppDispatch } from "@/redux/store";
import { resetSuccessServices } from "@/redux/services/servicesSlice";
import { resetSuccessArticles } from "@/redux/articles/articlesSlice";
import { resetSuccessReviews } from "@/redux/reviews/reviewsSlice";
import { resetSuccessMedia } from "@/redux/media/mediaSlice";

const ModalSuccessfull = () => {
	const dispatch = useDispatch<AppDispatch>();
	const hundlerOnClick = () => {
		dispatch(resetSuccessServices());
		dispatch(resetSuccessArticles());
		dispatch(resetSuccessReviews());
		dispatch(resetSuccessMedia());
	};

	return (
		<div className={s.modal} onClick={hundlerOnClick}>
			<div className={s.modalContent} onClick={(e) => e.stopPropagation()}>
				<div className={s.content}>
					<h3 className={s.title}>Категория успешно внесенна в базу!</h3>

					<button
						className={s.modalCloseBtn}
						type="button"
						onClick={hundlerOnClick}
					>
						Ok!
					</button>
				</div>
			</div>
		</div>
	);
};

export default ModalSuccessfull;

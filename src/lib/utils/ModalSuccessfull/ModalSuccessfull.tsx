import React from "react";
import s from "./ModalSuccessfull.module.css";
import { useDispatch } from "react-redux";
import { AppDispatch } from "@/redux/store";
import { resetSuccessServices } from "@/redux/services/servicesSlice";
import { resetSuccessArticles } from "@/redux/articles/articlesSlice";
import { resetSuccessReviews } from "@/redux/reviews/reviewsSlice";
import { resetSuccessMedia } from "@/redux/media/mediaSlice";
import { resetSuccess } from "@/redux/auth/authSlice";

type CallBackProps = {
	message?: string;
};

const ModalSuccessfull = ({
	message = "Категория успешно внесенна в базу!",
}: CallBackProps) => {
	const dispatch = useDispatch<AppDispatch>();
	const hundlerOnClick = () => {
		dispatch(resetSuccess());
		dispatch(resetSuccessServices());
		dispatch(resetSuccessArticles());
		dispatch(resetSuccessReviews());
		dispatch(resetSuccessMedia());
	};

	return (
		<div className={s.modal} onClick={hundlerOnClick}>
			<div className={s.modalContent} onClick={(e) => e.stopPropagation()}>
				<div className={s.content}>
					<h3 className={s.title}>{message}</h3>

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

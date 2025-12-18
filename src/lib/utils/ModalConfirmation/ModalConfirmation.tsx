import React, { SetStateAction } from "react";
import s from "./ModalConfirmation.module.css";
import { useDispatch } from "react-redux";
import { AppDispatch } from "@/redux/store";
import {
	ArticlesPayload,
	ReviewsPayload,
	ServicesPayload,
} from "@/lib/types/types";
import { deleteServices } from "@/redux/services/operations";
import { deleteArticles } from "@/redux/articles/operations";
import { deleteReviews } from "@/redux/reviews/operations";

type ModalConfirmationProps = {
	type?: string;
	info?: ServicesPayload | null;
	hundlerCloseServices?: () => void;
	setOpenSAInfo?: React.Dispatch<SetStateAction<ArticlesPayload | null>>;
	setOpenRSInfo?: React.Dispatch<SetStateAction<ReviewsPayload | null>>;
	id?: string | null;
};

const ModalConfirmation = ({
	hundlerCloseServices,
	info,
	type,
	id,
	setOpenSAInfo,
	setOpenRSInfo,
}: ModalConfirmationProps) => {
	const dispatch = useDispatch<AppDispatch>();
	const hundlerOnClick = () => {
		if (hundlerCloseServices) {
			hundlerCloseServices();
		} else if (setOpenSAInfo) {
			setOpenSAInfo?.(null);
		} else if (setOpenRSInfo) {
			setOpenRSInfo?.(null);
		}
	};

	return (
		<div className={s.modal} onClick={hundlerOnClick}>
			<div className={s.modalContent} onClick={(e) => e.stopPropagation()}>
				<div className={s.content}>
					<h3 className={s.title}>Подтвердите удаление следующего элемента:</h3>
					{info?.pl.name && <p className={s.name}>{info?.pl.name}</p>}

					<div className={s.btnWrapper}>
						<button
							className={`${s.modalCloseBtn} ${s.delete}`}
							type="button"
							onClick={() => {
								if (type === "services" && info?._id) {
									dispatch(deleteServices(info._id));
								} else if (type === "articles" && id !== null) {
									dispatch(deleteArticles(String(id)));
								} else if (type === "reviews" && id !== null) {
									dispatch(deleteReviews(String(id)));
								}
								hundlerOnClick();
							}}
						>
							Да, удалить
						</button>
						<button
							className={s.modalCloseBtn}
							type="button"
							onClick={hundlerOnClick}
						>
							Нет, оставить
						</button>
					</div>
				</div>
			</div>
		</div>
	);
};

export default ModalConfirmation;

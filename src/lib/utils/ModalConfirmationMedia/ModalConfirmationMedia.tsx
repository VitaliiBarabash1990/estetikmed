import React from "react";
import s from "./ModalConfirmationMedia.module.css";

type ModalConfirmationMediaProps = {
	onConfirm: () => void;
	onCancel: () => void;
	title?: string;
};

const ModalConfirmationMedia = ({
	onConfirm,
	onCancel,
	title = "Подтвердите удаление файла",
}: ModalConfirmationMediaProps) => {
	return (
		<div className={s.modal} onClick={onCancel}>
			<div className={s.modalContent} onClick={(e) => e.stopPropagation()}>
				<div className={s.content}>
					<h3 className={s.title}>{title}</h3>

					<div className={s.btnWrapper}>
						<button
							type="button"
							className={`${s.modalCloseBtn} ${s.delete}`}
							onClick={onConfirm}
						>
							Да, удалить
						</button>

						<button
							type="button"
							className={s.modalCloseBtn}
							onClick={onCancel}
						>
							Нет, оставить
						</button>
					</div>
				</div>
			</div>
		</div>
	);
};

export default ModalConfirmationMedia;

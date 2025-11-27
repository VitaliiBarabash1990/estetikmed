import React, { ReactNode, SetStateAction, useEffect } from "react";
import s from "./PoppupVideo.module.css";

type ModalProps = {
	children: ReactNode;
	setModalVideo: React.Dispatch<SetStateAction<string | null>>;
};

const PoppupVideo = ({ children, setModalVideo }: ModalProps) => {
	// Закриття по ESC
	useEffect(() => {
		const handleEsc = (e: KeyboardEvent) => {
			if (e.key === "Escape") setModalVideo(null);
		};
		window.addEventListener("keydown", handleEsc);

		return () => window.removeEventListener("keydown", handleEsc);
	}, [setModalVideo]);

	// Закриття по кліку на фон
	const closeOnBackdrop = (e: React.MouseEvent<HTMLDivElement>) => {
		if (e.target === e.currentTarget) setModalVideo(null);
	};

	return (
		<div className={s.wrapper} onClick={closeOnBackdrop}>
			<div className={s.content}>
				<h5 className={s.modalTitle}>Video Shorts</h5>
				<button
					type="button"
					className={s.closeBtn}
					onClick={() => setModalVideo(null)}
				>
					<svg className={s.closeBtnIcon}>
						<use href="/sprite.svg#icon-burger-menu-close"></use>
					</svg>
				</button>

				{children}
			</div>
		</div>
	);
};

export default PoppupVideo;

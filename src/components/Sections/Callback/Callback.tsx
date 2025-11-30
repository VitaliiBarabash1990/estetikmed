import React from "react";
import PaddingCallback from "./PaddingCallback/PaddingCallback";
import s from "./Callback.module.css";
import Image from "next/image";
import FormCallback from "./FormCallback/FormCallback";

const Callback = () => {
	return (
		<PaddingCallback>
			<div className={s.callbackWrapper}>
				<div className={s.formWrapper}>
					<FormCallback />
				</div>
				<div className={s.imageWraper}>
					<Image
						src="/img/Callback/image.webp"
						width={576}
						height={520}
						alt="imageCallback"
						className={s.image}
					/>
				</div>
			</div>
		</PaddingCallback>
	);
};

export default Callback;

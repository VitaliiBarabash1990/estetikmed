import React from "react";
import Image from "next/image";
import s from "./Logo.module.css";

const Logo = () => {
	return (
		<div className={s.menuLogo}>
			<Image
				src="/img/Hero/logo.svg"
				alt={`logo`}
				fill // замість width/height
				style={{ objectFit: "cover", objectPosition: "center" }} // замощення
				sizes="100vw" // опційно для адаптивності
			/>
		</div>
	);
};

export default Logo;

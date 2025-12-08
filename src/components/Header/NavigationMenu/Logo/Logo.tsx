import React from "react";
import Image from "next/image";
import s from "./Logo.module.css";
import { Link } from "@/i18n/routing";

const Logo = () => {
	return (
		<Link href="/" className={s.menuLogo}>
			<div className={s.menuLogo}>
				<Image
					src="/img/Hero/logo.svg"
					alt={`logo`}
					fill // замість width/height
					style={{ objectFit: "cover", objectPosition: "center" }} // замощення
					sizes="100vw" // опційно для адаптивності
				/>
			</div>
		</Link>
	);
};

export default Logo;

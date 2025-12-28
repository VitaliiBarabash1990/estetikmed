"use client";
import React from "react";
import { Link } from "@/i18n/routing";

interface Props extends React.ComponentProps<typeof Link> {
	scrollId?: string;
}

export const LocalizedScrollLink = ({
	scrollId,
	href,
	onClick,
	...props
}: Props) => {
	const handleClick = (e: React.MouseEvent<HTMLAnchorElement>) => {
		if (!scrollId) {
			onClick?.(e);
			return;
		}

		e.preventDefault();

		// 1️⃣ спочатку закриваємо меню
		onClick?.(e);

		// 2️⃣ даємо DOM стабілізуватись (особливо mobile)
		setTimeout(() => {
			const el = document.getElementById(scrollId);
			if (el) {
				el.scrollIntoView({ behavior: "smooth", block: "start" });
			}
		}, 300);
	};

	return <Link href={href} onClick={handleClick} {...props} />;
};

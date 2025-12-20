// app/[locale]/ScrollHandler.tsx
"use client";

import { useEffect } from "react";
import { useSearchParams } from "next/navigation";

export default function ScrollHandler() {
	const searchParams = useSearchParams();

	useEffect(() => {
		const scrollId = searchParams.get("scroll");
		if (!scrollId) return;

		const el = document.getElementById(scrollId);
		if (!el) return;

		// ❗️даємо сторінці стабілізуватись
		setTimeout(() => {
			el.scrollIntoView({ behavior: "smooth", block: "start" });
		}, 600);
	}, [searchParams]);

	return null;
}

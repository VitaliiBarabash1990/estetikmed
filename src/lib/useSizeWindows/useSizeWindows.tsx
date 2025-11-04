"use client";
import { useEffect, useState } from "react";

const useSizeWindows = () => {
	const [padding, setPadding] = useState({
		top: 40,
		bottom: 40,
		left: 12,
		right: 12,
	});

	useEffect(() => {
		const updatePadding = () => {
			const width = window.innerWidth;
			if (width < 768) {
				setPadding({ top: 40, bottom: 40, left: 12, right: 12 });
			} else if (width < 1280) {
				setPadding({ top: 80, bottom: 80, left: 32, right: 32 });
			} else {
				setPadding({ top: 120, bottom: 120, left: 64, right: 64 });
			}
		};

		updatePadding();
		window.addEventListener("resize", updatePadding);
		return () => window.removeEventListener("resize", updatePadding);
	}, []);
	return padding;
};

export default useSizeWindows;

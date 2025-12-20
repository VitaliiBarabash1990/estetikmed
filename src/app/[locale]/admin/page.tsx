"use client";

import React, { useEffect, useState } from "react";
import WrapperForComponentsAllSides from "@/lib/utils/WrapperForComponentsAllSides/WrapperForComponentsAllSides";
import useIsMobile from "@/lib/isMobile/isMobile";
import LeftSide from "@/components/Sections/Admin/LeftSide/LeftSide";
import RightSide from "@/components/Sections/Admin/RightSide/RightSide";
import s from "./admin.module.css";
import { selectIsToken, selectUserRole } from "@/redux/auth/selectors";
import { useSelector } from "react-redux";
import { useRouter } from "@/i18n/routing";

const Page = () => {
	const [activeItem, setActiveItem] = useState<number>(0);
	const isMobile = useIsMobile();
	const isToken = useSelector(selectIsToken);
	const isRole = useSelector(selectUserRole);
	const router = useRouter();

	/* ✅ REDIRECT — ТІЛЬКИ В useEffect */
	useEffect(() => {
		if (!isToken || isRole !== "admin") {
			router.replace("/");
		}
	}, [isToken, isRole, router]);

	/* ✅ ПОКИ ЙДЕ REDIRECT — НІЧОГО НЕ РЕНДЕРИМО */
	if (!isToken || isRole !== "admin") {
		return null;
	}

	return (
		<WrapperForComponentsAllSides
			paddingTop={32}
			paddingBottom={32}
			paddingLeft={isMobile ? 0 : 64}
			paddingRight={isMobile ? 0 : 64}
		>
			<div className={s.admin}>
				<LeftSide activeItem={activeItem} setActiveItem={setActiveItem} />
				<RightSide activeItem={activeItem} />
			</div>
		</WrapperForComponentsAllSides>
	);
};

export default Page;

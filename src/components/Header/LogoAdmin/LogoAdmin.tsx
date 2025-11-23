import React from "react";
import s from "./LogoAdmin.module.css";
import { usePathname } from "@/i18n/routing";
import useIsMobile from "@/lib/isMobile/isMobile";
import Logo from "../NavigationMenu/Logo/Logo";

const LogoAdmin = () => {
	const path = usePathname().split("/")[1];
	const isMobile = useIsMobile();
	return (
		<>
			{isMobile ? (
				<Logo />
			) : (
				<div
					className={
						path === "admin" || path === "blog"
							? s.logoAdminWrapper
							: s.displayNone
					}
				>
					<h4 className={s.logoTitle}>EstetikMed</h4>
				</div>
			)}
		</>
	);
};

export default LogoAdmin;

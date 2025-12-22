import React from "react";
import s from "./LogoAdmin.module.css";
import { Link, usePathname } from "@/i18n/routing";
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
				<Link
					href="/"
					className={
						path === "admin" || path === "blog"
							? s.logoAdminWrapper
							: s.displayNone
					}
				>
					<h4 className={s.logoTitle}>EstetikMed</h4>
				</Link>
			)}
		</>
	);
};

export default LogoAdmin;

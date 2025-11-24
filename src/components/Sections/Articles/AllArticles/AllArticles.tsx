import React from "react";
import s from "./AllArticles.module.css";
import { Link } from "@/i18n/routing";

const AllArticles = ({ text }: { text: string }) => {
	return (
		<Link href="/blog" className={s.btnAllArticles}>
			{text}
		</Link>
	);
};

export default AllArticles;

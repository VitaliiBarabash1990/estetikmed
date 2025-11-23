import Features from "@/components/Sections/Features/Features";
import About from "@/components/Sections/About/About";
import Hero from "@/components/Sections/Hero/Hero";
import Services from "@/components/Sections/Services/Services";
import { Locale } from "@/i18n/routing";
import { setRequestLocale } from "next-intl/server";
import Specialist from "@/components/Sections/Specialist/Specialist";
import Articles from "@/components/Sections/Articles/Articles";

type Props = {
	params: Promise<{ locale: Locale }>;
};

export default async function IndexPage({ params }: Props) {
	const { locale } = await params;
	// Enable static rendering
	setRequestLocale(locale);
	// console.log("LOCKALE", locale);

	return (
		<>
			<Hero />
			<About />
			<Services />
			<Features />
			<Specialist />
			<Articles />
		</>
	);
}

import { NextIntlClientProvider } from "next-intl";
import { getMessages } from "next-intl/server";
import { ReactNode } from "react";
import Header from "../Header/Header";
import Footer from "../Footer/Footer";
import ReduxProvider from "@/ReduxProvider/ReduxProvider";

type Props = {
	children: ReactNode;
	locale: string;
};

export default async function BaseLayout({ children, locale }: Props) {
	// Providing all messages to the client
	// side is the easiest way to get started
	const messages = await getMessages();

	return (
		<html lang={locale}>
			<body>
				<ReduxProvider>
					<NextIntlClientProvider locale={locale} messages={messages}>
						<Header />
						<main>{children}</main>
						<Footer />
					</NextIntlClientProvider>
				</ReduxProvider>
			</body>
		</html>
	);
}

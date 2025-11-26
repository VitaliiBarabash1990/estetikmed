import { useLocale } from "next-intl";

export function BlogLink({
	id,
	className,
	children,
}: {
	id: string;
	className?: string;
	children?: React.ReactNode;
}) {
	const locale = useLocale();

	return (
		<a
			href={`/${locale}/blog/${id}`} // ✅ передаємо повний шлях як string
			className={className}
		>
			{children}
		</a>
	);
}

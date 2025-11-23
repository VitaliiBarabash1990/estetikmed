export function BlogLink({
	id,
	className,
	children,
}: {
	id: string;
	className?: string;
	children?: React.ReactNode;
}) {
	return (
		<a
			href={`/blog/${id}`} // ✅ передаємо повний шлях як string
			className={className}
		>
			{children}
		</a>
	);
}

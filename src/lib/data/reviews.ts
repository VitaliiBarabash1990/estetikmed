export type ReviewItemRaw = {
	id: number;
	img: string;
	nameKey: string;
	servicesKey: string;
	reviewsKey: string;
	answersKey: string;
};

export const reviews: ReviewItemRaw[] = [
	{
		id: 0,
		img: "/img/Reviews/testimonial.webp",
		nameKey: "name",
		servicesKey: "services",
		reviewsKey: "reviews",
		answersKey: "answers",
	},
	{
		id: 1,
		img: "/img/Reviews/testimonial.webp",
		nameKey: "name",
		servicesKey: "services",
		reviewsKey: "reviews",
		answersKey: "answers",
	},
	{
		id: 2,
		img: "/img/Reviews/testimonial.webp",
		nameKey: "name",
		servicesKey: "services",
		reviewsKey: "reviews",
		answersKey: "answers",
	},
	{
		id: 3,
		img: "/img/Reviews/testimonial.webp",
		nameKey: "name",
		servicesKey: "services",
		reviewsKey: "reviews",
		answersKey: "answers",
	},
	{
		id: 4,
		img: "/img/Reviews/testimonial.webp",
		nameKey: "name",
		servicesKey: "services",
		reviewsKey: "reviews",
		answersKey: "answers",
	},
];

// const reviewsList: ReviewsItemProps[] = reviews.map(
// 	(item: ReviewItemRaw) => ({
// 		id: item.id,
// 		img: item.img,
// 		name: t(item.nameKey),
// 		services: t(item.servicesKey),
// 		reviews: t(item.reviewsKey),
// 		answers: t(item.answersKey),
// 	})
// );

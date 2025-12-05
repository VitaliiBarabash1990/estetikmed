"use client";
import React from "react";
import s from "./ServicesVariant.module.css";
import SwiperPhoto from "./SwiperPhoto/SwiperPhoto";
import { ServicesPayload } from "@/lib/types/types";
import { useLocale } from "next-intl";
import { Locale } from "@/i18n/routing";
import Image from "next/image";
import { useDispatch } from "react-redux";
import { AppDispatch } from "@/redux/store";
import { deleteServices } from "@/redux/services/operations";

type ServicesVariantProps = {
	openSCInfo: ServicesPayload | null;
	page?: string;
	hundlerCloseServices: () => void;
	hundlerEdit?: () => void;
};

const ServicesVariant: React.FC<ServicesVariantProps> = ({
	openSCInfo,
	page,
	hundlerCloseServices,
	hundlerEdit,
}) => {
	const dispatch = useDispatch<AppDispatch>();
	const local = useLocale() as Locale;
	const countImages = openSCInfo?.imgs.length;
	console.log("Lengs", countImages);

	return (
		<div className={s.ServicesVariantWrapper}>
			<div className={s.serviceHead}>
				<h5 className={s.servicesVariantTitle}>{openSCInfo?.[local].name}</h5>
				<div className={s.servicesBtnBlock}>
					{page === "admin" && (
						<>
							<button
								type="button"
								className={s.btnWraper}
								onClick={() => {
									if (openSCInfo?._id) {
										dispatch(deleteServices(openSCInfo._id));
									}
									hundlerCloseServices();
								}}
							>
								<svg className={s.iconClose}>
									<use href="/sprite.svg#icon-delete"></use>
								</svg>
							</button>
							<button
								type="button"
								className={s.btnWraper}
								onClick={() => {
									if (hundlerEdit) hundlerEdit();
								}}
							>
								<svg className={`${s.iconClose} ${s.iconEdit}`}>
									<use href="/sprite.svg#icon-edit"></use>
								</svg>
							</button>
						</>
					)}

					<button
						type="button"
						className={s.btnWraper}
						onClick={() => hundlerCloseServices()}
					>
						<svg className={s.iconClose}>
							<use href="/sprite.svg#icon-material-close-rounded"></use>
						</svg>
					</button>
				</div>
			</div>
			<div className={s.price}>{openSCInfo?.price} PLN</div>
			<div className={s.description}>{openSCInfo?.[local].description}</div>

			{countImages === 1 && openSCInfo?.imgs[0] ? (
				<div className={s.imageWrapper}>
					<Image
						src={openSCInfo.imgs[0]}
						width={100}
						height={100}
						sizes="100vw"
						className={s.image}
						alt="image"
					/>
				</div>
			) : (
				<SwiperPhoto cardLists={openSCInfo?.imgs ?? []} />
			)}
		</div>
	);
};

export default ServicesVariant;

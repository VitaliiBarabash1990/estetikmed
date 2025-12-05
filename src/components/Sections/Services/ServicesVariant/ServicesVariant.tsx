"use client";
import React from "react";
import s from "./ServicesVariant.module.css";
import { ServicesItemProps } from "../ServicesCategory/ServicesSection/ServicesSection";
import SwiperPhoto from "./SwiperPhoto/SwiperPhoto";

type ServicesVariantProps = {
	openSCInfo: ServicesItemProps | null;
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
	const cardLists = [
		"/img/Services/service_dep_laz_dla_wooman.webp",
		"/img/Services/service_depilation_laz_dla_man.webp",
		"/img/Services/service_med_est_reg.webp",
	];

	return (
		<div className={s.ServicesVariantWrapper}>
			<div className={s.serviceHead}>
				<h5 className={s.servicesVariantTitle}>{openSCInfo?.name}</h5>
				<div className={s.servicesBtnBlock}>
					{page === "admin" && (
						<>
							<button type="button" className={s.btnWraper}>
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
			<div className={s.price}>
				{openSCInfo?.price} {openSCInfo?.currency}
			</div>
			<div className={s.description}>{openSCInfo?.description}</div>

			<SwiperPhoto cardLists={cardLists} />
		</div>
	);
};

export default ServicesVariant;

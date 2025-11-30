"use client";
import React from "react";
import PaddingContacts from "./PaddingContacts/PaddingContacts";
import s from "./Contacts.module.css";
import Image from "next/image";
import LanguageSwitcher from "@/components/Header/LanguageSwitcher/LanguageSwitcher";

const Contacts = () => {
	const contactsList = [
		{ id: 0, icon: "/sprite.svg#icon-phone", text: "730294631" },
		{ id: 1, icon: "/img/Contacts/booksy.png", text: "booksy" },
		{ id: 2, icon: "/sprite.svg#icon-email", text: "janinah130@gmail.com" },
		{ id: 3, icon: "", text: "" },
		{
			id: 4,
			icon: "/sprite.svg#icon-location",
			text: "Świnoujście ul Armii Krajowej 12/1b",
		},
		{ id: 5, icon: "/sprite.svg#icon-facebook", text: "" },
	];
	const scheduleList = [
		{ id: 0, day: "PN–CZ", time: "8:00–20:00" },
		{ id: 1, day: "PT", time: "7:00–14:00" },
		{ id: 2, day: "SB", time: "9:00–19:00" },
	];
	const menuList = [
		{ id: 0, link: "#About", name: "O studiu" },
		{ id: 1, link: "#Services", name: "usługi" },
		{ id: 2, link: "#Blogu", name: "blogu" },
		{ id: 3, link: "#FAQ", name: "FAQ" },
		{ id: 4, link: "#Comunication", name: "ŁĄCZNOŚĆ" },
	];
	return (
		<PaddingContacts>
			<div className={s.contactWrapper}>
				<div className={s.contactListWrapper}>
					<ul className={s.contactsList}>
						{contactsList.map((item) => (
							<li
								key={item.id}
								className={`${s.contactsItem} ${s[`contactItem_${item.id}`]}`}
							>
								{item.text === "booksy" ? (
									<Image src={item.icon} width={123} height={28} alt="booksy" />
								) : item.icon === "" && item.text === "" ? (
									<LanguageSwitcher section="contacts" />
								) : item.id === 5 ? (
									<div className={s.facebookWrapper}>
										<div className={s.facebookBlock}>
											<div className={s.iconBlockFacebook}>
												<svg className={s.iconItemFacebook}>
													<use href={item.icon}></use>
												</svg>
											</div>
										</div>
										<div className={s.arrowBlock}>
											<div className={s.arrowBlockTop}>
												<svg className={s.arrowIcon}>
													<use href="/sprite.svg#icon-arrow-in-top"></use>
												</svg>
											</div>
										</div>
									</div>
								) : (
									<>
										<div className={s.iconBlock}>
											<svg className={s.iconItem}>
												<use href={item.icon}></use>
											</svg>
										</div>
										<p className={s.textItem}>{item.text}</p>
									</>
								)}
							</li>
						))}
					</ul>
					<ul className={s.scheduleList}>
						{scheduleList.map((item) => (
							<li key={item.id} className={s.scheduleItem}>
								<h4 className={s.scheduleItemText}>{item.day}</h4>
								<h4 className={s.scheduleItemText}>{item.time}</h4>
							</li>
						))}
					</ul>
					<ul className={s.menuList}>
						{menuList.map((item) => (
							<li key={item.id} className={s.menuItem}>
								<a href={item.link}>{item.name}</a>
							</li>
						))}
					</ul>
				</div>

				<div className={s.contactMap}>
					<iframe
						src="https://www.google.com/maps/embed?pb=!1m21!1m12!1m3!1d146.89495175327048!2d14.251207152262818!3d53.9083030333265!2m3!1f0!2f0!3f0!3m2!1i1024!2i768!4f13.1!4m6!3e2!4m3!3m2!1d53.9083368!2d14.2512581!4m0!5e0!3m2!1sru!2spl!4v1764535308737!5m2!1sru!2spl"
						width="600"
						height="450"
						style={{ border: "0" }}
						allowFullScreen
						loading="lazy"
						referrerPolicy="no-referrer-when-downgrade"
						className={s.googleMap}
					></iframe>
				</div>
			</div>
		</PaddingContacts>
	);
};

export default Contacts;

{
	/* <div>
	<div>
		<div className={s.iconBlock}>
			<svg className={s.iconItem}>
				<use href={item.icon}></use>
			</svg>
		</div>
	</div>
	<div>
		<div>
			<svg>
				<use href="sprite.svg#icon-arrow-in-top"></use>
			</svg>
		</div>
	</div>
</div>; */
}

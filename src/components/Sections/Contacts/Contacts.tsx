"use client";
import React from "react";
import PaddingContacts from "./PaddingContacts/PaddingContacts";
import s from "./Contacts.module.css";
import Image from "next/image";
import LanguageSwitcher from "@/components/Header/LanguageSwitcher/LanguageSwitcher";

const isEmail = (value: string) => value.includes("@");
const isPhone = (value: string) => /^\d+$/.test(value);

const getContactHref = (link: string) => {
	if (isEmail(link)) return `mailto:${link}`;
	if (isPhone(link)) return `tel:${link}`;
	return null;
};

const Contacts = () => {
	const contactsList = [
		{
			id: 0,
			icon: "/sprite.svg#icon-phone",
			text: "730294641",
			link: "730294641",
		},
		{
			id: 1,
			icon: "/img/Contacts/booksy.png",
			text: "booksy",
			link: "https://booksy.com/pl-pl/202886_medycyna-estetyczna-laser-diodowy_medycyna-estetyczna_19380_swinoujscie?do=invite&_branch_match_id=1529221794714245955&utm_medium=profile_share_from_profile&_branch_referrer=H4sIAAAAAAAAA8soKSkottLXT07J0UvKz88urtRLzs%2FVDymIKAjLtTTxjkiyrytKTUstKsrMS49PKsovL04tsnXLBIrlVwAAnvjsTz0AAAA%3D",
		},
		{
			id: 2,
			icon: "/sprite.svg#icon-email",
			text: "janinah130@gmail.com",
			link: "janinah130@gmail.com",
		},
		{ id: 3, icon: "", text: "", link: "" },
		{
			id: 4,
			icon: "/sprite.svg#icon-location",
			text: "Świnoujście ul Armii Krajowej 12/1b",
			link: "",
		},
		{
			id: 5,
			icon: "/sprite.svg#icon-facebook",
			text: "",
			link: "https://www.facebook.com/profile.php?id=100032952622081&mibextid=wwXIfr&rdid=ExHeChsTlYOXq3Ha&share_url=https%3A%2F%2Fwww.facebook.com%2Fshare%2F18fHTMDJTW%2F%3Fmibextid%3DwwXIfr",
		},
	];
	const scheduleList = [
		{ id: 0, day: "PN–CZ", time: "8:00–20:00" },
		{ id: 1, day: "PT", time: "7:00–14:00" },
		{ id: 2, day: "SB", time: "9:00–19:00" },
	];
	const menuList = [
		{ id: 0, link: "#About", name: "O studiu" },
		{ id: 1, link: "#Services", name: "usługi" },
		{ id: 2, link: "#Articles", name: "blogu" },
		{ id: 3, link: "#Faq", name: "FAQ" },
		{ id: 4, link: "#CallbackForm", name: "ŁĄCZNOŚĆ" },
	];

	return (
		<PaddingContacts>
			<div id="Contacts" className={s.contactWrapper}>
				<div className={s.contactListWrapper}>
					<ul className={s.contactsList}>
						{contactsList.map((item) => (
							<li
								key={item.id}
								className={`${s.contactsItem} ${s[`contactItem_${item.id}`]}`}
							>
								{item.text === "booksy" ? (
									<a
										href={item.link}
										target="_blank"
										rel="noopener noreferrer"
										className={s.booksyLink}
									>
										<Image
											src={item.icon}
											width={123}
											height={28}
											alt="booksy"
										/>
									</a>
								) : item.icon === "" && item.text === "" ? (
									<LanguageSwitcher section="contacts" />
								) : item.id === 5 ? (
									<div className={s.facebookWrapper}>
										<a
											href={item.link}
											target="_blank"
											rel="noopener noreferrer"
											className={s.facebookBlock}
										>
											<div className={s.iconBlockFacebook}>
												<svg className={s.iconItemFacebook}>
													<use href={item.icon}></use>
												</svg>
											</div>
										</a>

										<a href="#Hero" className={s.arrowBlock}>
											<div className={s.arrowBlockTop}>
												<svg className={s.arrowIcon}>
													<use href="/sprite.svg#icon-arrow-in-top"></use>
												</svg>
											</div>
										</a>
									</div>
								) : (
									<>
										<div className={s.iconBlock}>
											<svg className={s.iconItem}>
												<use href={item.icon}></use>
											</svg>
										</div>
										{getContactHref(item.link) ? (
											<a
												href={getContactHref(item.link)!}
												className={s.textItem}
											>
												{item.text}
											</a>
										) : (
											<span className={s.textItem}>{item.text}</span>
										)}
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
						src="https://www.google.com/maps/embed?pb=!1m18!1m12!1m3!1d207.7404502335692!2d14.251173297698177!3d53.90838085733247!2m3!1f0!2f0!3f0!3m2!1i1024!2i768!4f13.1!3m3!1m2!1s0x47aa5f3390e52611%3A0x3314a55feea52fc7!2sArmii%20Krajowej%2012%2F1B%2C%2072-600%20%C5%9Awinouj%C5%9Bcie!5e0!3m2!1sru!2spl!4v1766010325270!5m2!1sru!2spl"
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

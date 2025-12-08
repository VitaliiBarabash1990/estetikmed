"use client";
import React, { useEffect } from "react";
import SliderGallery from "./SliderGallery/SliderGallery";
import PaddingMedia from "./PaddingMedia/PaddingMedia";
import SliderReels from "./SliderReels/SliderReels";
import s from "./Media.module.css";
import { useDispatch, useSelector } from "react-redux";
import { AppDispatch } from "@/redux/store";
import { getAllMedia } from "@/redux/media/operations";
import { selectMedia } from "@/redux/media/selectors";

function Media() {
	const dispatch = useDispatch<AppDispatch>();
	useEffect(() => {
		dispatch(getAllMedia());
	}, [dispatch]);

	const video = useSelector(selectMedia).find(
		(item) => item.type === "video"
	)?.videos;

	const images = useSelector(selectMedia).find(
		(item) => item.type === "images"
	)?.imgs;

	return (
		<PaddingMedia>
			<div className={s.mediaWrapper}>
				{video?.length ? <SliderReels media={video || []} /> : null}

				{images?.length ? <SliderGallery media={images || []} /> : null}
			</div>
		</PaddingMedia>
	);
}

export default Media;

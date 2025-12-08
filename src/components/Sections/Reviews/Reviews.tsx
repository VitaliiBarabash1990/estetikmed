"use client";
import React, { useEffect } from "react";
import PaddingRevies from "./PaddingRevies/PaddingRevies";
import SliderReviews from "./SliderReviews/SliderReviews";
import { useDispatch, useSelector } from "react-redux";
import { AppDispatch } from "@/redux/store";
import { getAllReviews } from "@/redux/reviews/operations";
import { selectReviews } from "@/redux/reviews/selectors";

function Reviews() {
	const dispatch = useDispatch<AppDispatch>();
	useEffect(() => {
		dispatch(getAllReviews());
	}, [dispatch]);

	const reviewsList = useSelector(selectReviews);

	if (!reviewsList || reviewsList.length === 0) return null;

	return (
		<PaddingRevies>
			<SliderReviews page="main" />
		</PaddingRevies>
	);
}

export default Reviews;

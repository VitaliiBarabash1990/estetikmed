import React from "react";
import PaddingRevies from "./PaddingRevies/PaddingRevies";
import SliderReviews from "./SliderReviews/SliderReviews";

function Reviews() {
	return (
		<PaddingRevies>
			<SliderReviews page="main" />
		</PaddingRevies>
	);
}

export default Reviews;

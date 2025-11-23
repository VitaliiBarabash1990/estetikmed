"use client";
import React, { useState } from "react";
import WrapperForComponentsAllSides from "@/lib/utils/WrapperForComponentsAllSides/WrapperForComponentsAllSides";
import useIsMobile from "@/lib/isMobile/isMobile";
import LeftSide from "@/components/Sections/Admin/LeftSide/LeftSide";
import RightSide from "@/components/Sections/Admin/RightSide/RightSide";

const Page = () => {
	const [activeItem, setActiveItem] = useState<number | 0>(0);
	const isMobile = useIsMobile();
	return (
		<WrapperForComponentsAllSides
			paddingTop={32}
			paddingBottom={32}
			paddingLeft={isMobile ? 0 : 64}
			paddingRight={isMobile ? 0 : 64}
		>
			<div
				style={
					isMobile
						? {
								display: "flex",
								flexDirection: "column",
								gap: 24,
						  }
						: {
								display: "flex",
								flexDirection: "row",
								justifyContent: "space-between",
								gap: 40,
								maxWidth: 1440,
								margin: "0 auto",
						  }
				}
			>
				<LeftSide activeItem={activeItem} setActiveItem={setActiveItem} />
				<RightSide activeItem={activeItem} />
			</div>
		</WrapperForComponentsAllSides>
	);
};

export default Page;

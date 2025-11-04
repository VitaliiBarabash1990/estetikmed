import React, { ReactNode } from "react";

type WrapperProps = {
	children: ReactNode;
	paddingTop?: string | number;
	paddingBottom?: string | number;
	paddingLeft?: string | number;
	paddingRight?: string | number;
};

const WrapperForComponentsAllSides = ({
	children,
	paddingTop = 0,
	paddingBottom = 0,
	paddingLeft = 0,
	paddingRight = 0,
}: WrapperProps) => {
	return (
		<section style={{ paddingTop, paddingBottom }}>
			<div style={{ paddingLeft, paddingRight }}>{children}</div>
		</section>
	);
};

export default WrapperForComponentsAllSides;

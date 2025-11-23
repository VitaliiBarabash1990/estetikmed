"use client";
import React, { ReactNode } from "react";
import s from "./Container.module.css";

type ContainerProp = {
	children: ReactNode;
};

const Container = ({ children }: ContainerProp) => {
	return <div className={s.container}>{children}</div>;
};

export default Container;

"use client";

import { useEffect, useRef } from "react";
import { useDispatch } from "react-redux";
import { AppDispatch } from "@/redux/store";
import { refreshSession } from "@/redux/auth/operations";

export default function IndexClient() {
	const dispatch = useDispatch<AppDispatch>();
	const ran = useRef(false);

	useEffect(() => {
		if (ran.current) return;

		ran.current = true;
		dispatch(refreshSession());
	}, [dispatch]);

	return null;
}

"use client";

import { useEffect, useRef } from "react";
import { useDispatch, useSelector } from "react-redux";
import { AppDispatch } from "@/redux/store";
import { refreshSession } from "@/redux/auth/operations";
import { selectIsToken } from "@/redux/auth/selectors";

export default function IndexClient() {
	const dispatch = useDispatch<AppDispatch>();
	const isToken = useSelector(selectIsToken);
	const ran = useRef(false);

	useEffect(() => {
		if (isToken && !ran.current) {
			dispatch(refreshSession());
			ran.current = true;
		}
	}, [dispatch, isToken]);

	return null;
}

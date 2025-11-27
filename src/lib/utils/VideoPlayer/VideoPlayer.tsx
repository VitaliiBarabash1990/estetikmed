"use client";
import React, { useEffect, useRef, useState } from "react";

type Props = {
	src: string;
};

const VideoPlayer = ({ src }: Props) => {
	const videoRef = useRef<HTMLVideoElement | null>(null);
	const [isPlaying, setIsPlaying] = useState(true);
	const [progress, setProgress] = useState(0);
	const [volume, setVolume] = useState(1);

	// Перезапуск відео при кожному відкритті модалки
	useEffect(() => {
		if (videoRef.current) {
			videoRef.current.currentTime = 0;
			videoRef.current.play();
			setIsPlaying(true);
		}
	}, [src]);

	const togglePlay = () => {
		if (!videoRef.current) return;

		if (videoRef.current.paused) {
			videoRef.current.play();
			setIsPlaying(true);
		} else {
			videoRef.current.pause();
			setIsPlaying(false);
		}
	};

	const onTimeUpdate = () => {
		if (!videoRef.current) return;
		setProgress(
			(videoRef.current.currentTime / videoRef.current.duration) * 100
		);
	};

	const handleSeek = (e: React.ChangeEvent<HTMLInputElement>) => {
		if (!videoRef.current) return;
		const value = Number(e.target.value);
		videoRef.current.currentTime = (value / 100) * videoRef.current.duration;
		setProgress(value);
	};

	const handleVolume = (e: React.ChangeEvent<HTMLInputElement>) => {
		const value = Number(e.target.value);
		setVolume(value);
		if (videoRef.current) videoRef.current.volume = value;
	};

	return (
		<div style={{ width: "100%" }}>
			<video
				ref={videoRef}
				src={src}
				autoPlay
				onTimeUpdate={onTimeUpdate}
				style={{
					width: "100%",
					borderRadius: "16px",
					maxHeight: "70vh",
				}}
			/>

			{/* Панель керування */}
			<div
				style={{
					display: "flex",
					flexDirection: "column",
					gap: "10px",
					marginTop: "10px",
				}}
			>
				{/* Кнопка play/pause */}
				<button
					onClick={togglePlay}
					style={{
						padding: "8px 14px",
						background: "#F25EDA",
						borderRadius: "10px",
						color: "#fff",
						border: "none",
						cursor: "pointer",
					}}
				>
					{isPlaying ? "Pause" : "Play"}
				</button>

				{/* Прогресбар */}
				<input
					type="range"
					min={0}
					max={100}
					value={progress}
					onChange={handleSeek}
				/>

				{/* Гучність */}
				<input
					type="range"
					min={0}
					max={1}
					step={0.05}
					value={volume}
					onChange={handleVolume}
				/>
			</div>
		</div>
	);
};

export default VideoPlayer;

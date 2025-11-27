"use client";
import React, { useEffect, useRef, useState } from "react";
import s from "./VideoPlayer.module.css";

type Props = {
	src: string;
};

const VideoPlayer = ({ src }: Props) => {
	const videoRef = useRef<HTMLVideoElement | null>(null);
	const [isPlaying, setIsPlaying] = useState(true);
	const [progress, setProgress] = useState(0);
	const [volume, setVolume] = useState(1);

	// Перезапуск відео при відкритті модалки
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
		<div className={s.videoWrapper}>
			<video
				ref={videoRef}
				src={src}
				autoPlay
				onTimeUpdate={onTimeUpdate}
				className={s.videoElement}
			/>

			<div className={s.controls}>
				<button onClick={togglePlay} className={s.playButton}>
					{isPlaying ? "Pause" : "Play"}
				</button>

				<input
					type="range"
					min={0}
					max={100}
					value={progress}
					onChange={handleSeek}
					className={s.rangeInput}
				/>

				<input
					type="range"
					min={0}
					max={1}
					step={0.05}
					value={volume}
					onChange={handleVolume}
					className={s.rangeInput}
				/>
			</div>
		</div>
	);
};

export default VideoPlayer;

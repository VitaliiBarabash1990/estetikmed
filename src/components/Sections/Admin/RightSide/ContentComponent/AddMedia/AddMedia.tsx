"use client";
import React, { useEffect, useMemo, useState } from "react";
import { Formik, Form, ErrorMessage, FormikHelpers } from "formik";
import Image from "next/image";
import s from "./AddMedia.module.css";
import { useDispatch, useSelector } from "react-redux";
import { AppDispatch } from "@/redux/store";
import { selectIsSuccess, selectMedia } from "@/redux/media/selectors";
import {
	getAllMedia,
	uploadMedia,
	deleteMedia,
} from "@/redux/media/operations";
import ModalConfirmationMedia from "@/lib/utils/ModalConfirmationMedia/ModalConfirmationMedia";
import ModalSuccessfull from "@/lib/utils/ModalSuccessfull/ModalSuccessfull";

// ------------ TYPE GUARDS ------------
const isFile = (item: unknown): item is File => item instanceof File;

const isBlob = (item: unknown): item is Blob => item instanceof Blob;

// ------------ TYPES ------------
interface MediaFormCategory {
	type: string;
	imgs: (string | File)[];
	videos: (string | File)[];
}

interface MediaFormProps {
	categories: MediaFormCategory[];
}

type AddMediaProps = {
	type: number; // 0 = images, 1 = videos
};

const AddMedia = ({ type }: AddMediaProps) => {
	const dispatch = useDispatch<AppDispatch>();
	const [confirmation, setConfirmation] = useState(false);
	const isSuccess = useSelector(selectIsSuccess);

	const [deleteTarget, setDeleteTarget] = useState<{
		type: "images" | "video";
		index: number;
	} | null>(null);

	useEffect(() => {
		dispatch(getAllMedia());
	}, [dispatch]);

	const media = useSelector(selectMedia);

	// ===========================
	// INITIAL VALUES
	// ===========================
	const initialValues = useMemo(
		() => ({
			categories: [
				{
					type: "images",
					imgs: media.find((c) => c.type === "images")?.imgs || [],
					videos: [],
				},
				{
					type: "video",
					imgs: [],
					videos: media.find((c) => c.type === "video")?.videos || [],
				},
			],
		}),
		[media]
	);

	// ===========================
	// ADD IMAGES
	// ===========================
	const handleImageChange = (
		e: React.ChangeEvent<HTMLInputElement>,
		setFieldValue: FormikHelpers<MediaFormProps>["setFieldValue"],
		values: MediaFormProps
	) => {
		const files = e.target.files;
		if (!files) return;

		const updated = [...values.categories];
		updated[0].imgs = [...updated[0].imgs, ...Array.from(files)];

		setFieldValue("categories", updated);
	};

	// ===========================
	// ADD VIDEOS
	// ===========================
	const handleVideoChange = (
		e: React.ChangeEvent<HTMLInputElement>,
		setFieldValue: FormikHelpers<MediaFormProps>["setFieldValue"],
		values: MediaFormProps
	) => {
		const files = e.target.files;
		if (!files) return;

		const updated = [...values.categories];
		updated[1].videos = [...updated[1].videos, ...Array.from(files)];

		setFieldValue("categories", updated);
	};

	// ===========================
	// DELETE IMAGE
	// ===========================
	// const handleImageDelete = async (
	// 	setFieldValue: FormikHelpers<MediaFormProps>["setFieldValue"],
	// 	index: number,
	// 	values: MediaFormProps
	// ) => {
	// 	const updated = structuredClone(values.categories);
	// 	const target = updated[0].imgs[index];

	// 	if (typeof target === "string") {
	// 		await dispatch(
	// 			deleteMedia({
	// 				type: "images",
	// 				imageUrl: target,
	// 			})
	// 		);
	// 	}

	// 	updated[0].imgs.splice(index, 1);
	// 	setFieldValue("categories", updated);
	// };

	// ===========================
	// DELETE VIDEO
	// ===========================
	// const handleVideoDelete = async (
	// 	setFieldValue: FormikHelpers<MediaFormProps>["setFieldValue"],
	// 	index: number,
	// 	values: MediaFormProps
	// ) => {
	// 	const updated = structuredClone(values.categories);
	// 	const target = updated[1].videos[index];

	// 	if (typeof target === "string") {
	// 		await dispatch(
	// 			deleteMedia({
	// 				type: "video",
	// 				imageUrl: target,
	// 			})
	// 		);
	// 	}

	// 	updated[1].videos.splice(index, 1);
	// 	setFieldValue("categories", updated);
	// };

	const handleConfirmDelete = async (
		setFieldValue: FormikHelpers<MediaFormProps>["setFieldValue"],
		values: MediaFormProps
	) => {
		if (!deleteTarget) return;

		const updated = structuredClone(values.categories);

		if (deleteTarget.type === "images") {
			const target = updated[0].imgs[deleteTarget.index];

			if (typeof target === "string") {
				await dispatch(
					deleteMedia({
						type: "images",
						imageUrl: target,
					})
				);
			}

			updated[0].imgs.splice(deleteTarget.index, 1);
		}

		if (deleteTarget.type === "video") {
			const target = updated[1].videos[deleteTarget.index];

			if (typeof target === "string") {
				await dispatch(
					deleteMedia({
						type: "video",
						imageUrl: target,
					})
				);
			}

			updated[1].videos.splice(deleteTarget.index, 1);
		}

		setFieldValue("categories", updated);
		setDeleteTarget(null);
		setConfirmation(false);
	};

	// ===========================
	// SUBMIT
	// ===========================
	const handleSubmit = async (values: MediaFormProps) => {
		// IMAGES
		const newImages = values.categories[0].imgs.filter(isFile);

		if (newImages.length > 0) {
			await dispatch(
				uploadMedia({
					type: "images",
					files: newImages,
				})
			);
		}

		// VIDEOS
		const newVideos = values.categories[1].videos.filter(isFile);

		if (newVideos.length > 0) {
			await dispatch(
				uploadMedia({
					type: "video",
					files: newVideos,
				})
			);
		}

		dispatch(getAllMedia());
	};

	return (
		<>
			{" "}
			<div className={s.addServicesWrapper}>
				<Formik
					initialValues={initialValues}
					onSubmit={handleSubmit}
					enableReinitialize
				>
					{({ values, setFieldValue, resetForm }) => (
						<>
							<Form className={s.form}>
								{/* ====================== IMAGES ====================== */}
								{type === 0 && (
									<>
										<ul className={s.imageList}>
											<li className={`${s.imgItem} ${s.imgItemUpload}`}>
												<label className={s.uploadBox}>
													<input
														type="file"
														accept="image/*"
														multiple
														style={{ display: "none" }}
														onChange={(e) =>
															handleImageChange(e, setFieldValue, values)
														}
													/>
													<svg className={s.uploadIcon}>
														<use href="/sprite.svg#icon-upload"></use>
													</svg>
												</label>
											</li>

											{values.categories[0].imgs.map((img, i) => {
												let src: string;

												if (typeof img === "string") {
													src = img;
												} else if (isFile(img) || isBlob(img)) {
													src = URL.createObjectURL(img);
												} else {
													return null;
												}

												return (
													<li key={i} className={s.imgItem}>
														<Image
															src={src}
															alt={`img-${i}`}
															width={150}
															height={100}
															className={s.imgPreview}
														/>

														<button
															type="button"
															className={s.deleteBtn}
															onClick={() => {
																setDeleteTarget({ type: "images", index: i });
																setConfirmation(true);
															}}
															// onClick={() =>
															// 	handleImageDelete(setFieldValue, i, values)
															// }
														>
															<svg className={s.deleteIcon}>
																<use href="/sprite.svg#icon-delete"></use>
															</svg>
														</button>
													</li>
												);
											})}
										</ul>

										<ErrorMessage
											name="categories[0].imgs"
											component="p"
											className={s.error}
										/>
									</>
								)}

								{/* ====================== VIDEOS ====================== */}
								{type === 1 && (
									<>
										<ul className={s.videoList}>
											<li className={`${s.videoItem} ${s.videoItemUpload}`}>
												<label className={s.uploadBox}>
													<input
														type="file"
														accept="video/*"
														multiple
														style={{ display: "none" }}
														onChange={(e) =>
															handleVideoChange(e, setFieldValue, values)
														}
													/>
													<svg className={s.uploadIcon}>
														<use href="/sprite.svg#icon-upload"></use>
													</svg>
												</label>
											</li>

											{values.categories[1].videos.map((video, i) => {
												let src: string;

												if (typeof video === "string") {
													src = video;
												} else if (isFile(video) || isBlob(video)) {
													src = URL.createObjectURL(video);
												} else {
													return null;
												}

												return (
													<li key={i} className={s.videoItem}>
														<video
															src={src}
															controls
															className={s.videoPreview}
														/>

														<button
															type="button"
															className={s.deleteBtn}
															onClick={() => {
																setDeleteTarget({ type: "video", index: i });
																setConfirmation(true);
															}}

															// onClick={() =>
															// 	handleVideoDelete(setFieldValue, i, values)
															// }
														>
															<svg className={s.deleteIcon}>
																<use href="/sprite.svg#icon-delete"></use>
															</svg>
														</button>
													</li>
												);
											})}
										</ul>

										<ErrorMessage
											name="categories[1].videos"
											component="p"
											className={s.error}
										/>
									</>
								)}

								<div className={s.btnGroup}>
									<button type="submit" className={s.saveBtn}>
										Сохранить
									</button>

									<button
										type="button"
										className={s.cancelBtn}
										onClick={() => resetForm()}
									>
										Отменить
									</button>
								</div>
							</Form>
							{confirmation && (
								<ModalConfirmationMedia
									onConfirm={() => handleConfirmDelete(setFieldValue, values)}
									onCancel={() => {
										setConfirmation(false);
										setDeleteTarget(null);
									}}
								/>
							)}
						</>
					)}
				</Formik>
			</div>
			{isSuccess && <ModalSuccessfull />}
		</>
	);
};

export default AddMedia;

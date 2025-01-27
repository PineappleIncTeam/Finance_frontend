"use client";

import React, { useState } from "react";

import Image from "next/image";

import { IVideoElement } from "../../../types/components/ComponentsTypes";

import fallback from "../../../assets/components/videoElement/fallback.webp";

import styles from "./videoElement.module.scss";

const VideoElement = ({ videoId, close }: IVideoElement) => {
	const [hasError, setHasError] = useState<boolean>(false);

	return (
		<div className={styles.backgroundVideo}>
			<div className={styles.videoWrap}>
				<div className={styles.closeActionWrapper}>
					<button onClick={close} className={styles.closeActionElement} />
				</div>
				<div className={styles.videoResponsive}>
					{hasError ? (
						<div className={styles.fallbackImageWrapper}>
							<Image className={styles.fallbackImage} src={fallback} alt="no video" />
							<h1 className={styles.fallbackImage__text}>Приносим извинения. Данное видео отсутствует.</h1>
						</div>
					) : (
						<iframe
							width="854"
							height="480"
							src={`https://www.youtube.com/embed/${videoId}`}
							allow="accelerometer; autoplay; clipboard-write; encrypted-media; gyroscope; picture-in-picture"
							allowFullScreen
							title="video element"
							onError={() => setHasError(true)}
						/>
					)}
				</div>
			</div>
		</div>
	);
};

export default VideoElement;

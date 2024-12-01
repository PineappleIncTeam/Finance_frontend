"use client";

import React, { useState } from "react";

import Image from "next/image";

import { IVideoElement } from "../../../types/components/ComponentsTypes";

import fallback from "../../../assets/components/videoElement/fallback.png";

import style from "./videoElement.module.scss";

const VideoElement = ({ videoId, close }: IVideoElement) => {
	const [hasError, setHasError] = useState<boolean>(false);

	return (
		<div className={style.backgroundVideo}>
			<div className={style.videoWrap}>
				<div className={style.closeActionWrapper}>
					<button onClick={close} className={style.closeActionElement} />
				</div>
				<div className={style.videoResponsive}>
					{hasError ? (
						<div className={style.fallbackImageWrapper}>
							<Image className={style.fallbackImage} src={fallback} alt="no video" />
							<h1 className={style.fallbackImage__Text}>Приносим извинения. Данное видео отсутствует.</h1>
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

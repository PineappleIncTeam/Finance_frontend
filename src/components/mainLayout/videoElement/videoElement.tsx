"use client";

import React, { useState } from "react";

import Image from "next/image";

import { IVideoElement } from "../../../types/components/ComponentsTypes";

import fallback from "../../../assets/components/youtubeEmbed/fallback.png";

import crossIcon from "../../../assets/components/youtubeEmbed/crossIcon.png";

import style from "./videoElement.module.scss";

const VideoElement = ({ videoId, open }: IVideoElement) => {
	const [hasError, setHasError] = useState(false);

	return (
		<details open={open}>
			<div className={style.videoWrap}>
				<Image className={style.crossIconClose} src={crossIcon} alt="закрыть" />
				<div className={style.videoResponsive}>
					{hasError ? (
						<div className={style.fallbackImageWrapper}>
							<Image className={style.fallbackImage} src={fallback} alt="видео отсутствует" />
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
		</details>
	);
};

export default VideoElement;

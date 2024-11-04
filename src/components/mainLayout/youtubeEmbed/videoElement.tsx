"use client";

import { useState } from "react";

import Image from "next/image";

import { IVideoElement } from "../../../types/components/ComponentsTypes";

import fallback from "../../../assets/components/youtubeEmbed/fallback.png";

import style from "./videoElement.module.scss";

const VideoElement = ({ videoId }: IVideoElement) => {
	const [hasError, setHasError] = useState(false);

	return (
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
					title="Embedded youtube"
					onError={() => setHasError(true)}
				/>
			)}
		</div>
	);
};

export default VideoElement;

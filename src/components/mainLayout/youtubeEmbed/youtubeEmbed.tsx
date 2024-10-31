import { useState } from "react";

import Image from "next/image";

import { IYoutubeEmbed } from "../../../types/components/ComponentsTypes";

import fallback from "../../../assets/components/youtubeEmbed/fallback.png";

import style from "./youtubeEmbed.module.scss";

const YoutubeEmbed = ({ embedId }: IYoutubeEmbed) => {
	const [hasError, setHasError] = useState(true);

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
					src={`https://www.youtube.com/embed/${embedId}`}
					allow="accelerometer; autoplay; clipboard-write; encrypted-media; gyroscope; picture-in-picture"
					allowFullScreen
					title="Embedded youtube"
					onError={() => setHasError(true)}
				/>
			)}
		</div>
	);
};

export default YoutubeEmbed;

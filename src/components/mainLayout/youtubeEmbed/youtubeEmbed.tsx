import { IYoutubeEmbed } from "../../../types/components/ComponentsTypes";

import style from "./youtubeEmbed.module.scss";

const YoutubeEmbed = ({ embedId }: IYoutubeEmbed) => (
	<div className={style.videoResponsive}>
		<iframe
			width="853"
			height="480"
			src={`https://www.yuotube.com/embed/${embedId}`}
			allow="accelerometer; autoplay; clipboard-write; encrypted-media; gyroscope; picture-in-picture"
			allowFullScreen
			title="Embedded youtube"
		/>
	</div>
);

export default YoutubeEmbed;

import { ITooltip } from "../../../types/common/ComponentsProps";

import style from "./blogArticleShareTooltip.module.scss";

export const BlogArticleShareTooltip = ({ open }: ITooltip) => {
	return (
		<dialog open={open} className={style.blogArticleShareTooltipContainer}>
			<div onClick={(e) => e.stopPropagation()} role="textbox">
				<p className={style.blogArticleShareTooltipContent}>Ссылка успешно скопирована!</p>
			</div>
		</dialog>
	);
};

import { ITooltip } from "../../../types/common/ComponentsProps";

import style from "./blogArticleShareTooltip.module.scss";

export const BlogArticleShareTooltip = ({ open }: ITooltip) => {
	return (
		<dialog open={open} className={style.BlogArticleShareTooltipContainer}>
			<div onClick={(e) => e.stopPropagation()} role="textbox">
				<p className={style.BlogArticleShareTooltipContent}>Ссылка успешно скопирована!</p>
			</div>
		</dialog>
	);
};

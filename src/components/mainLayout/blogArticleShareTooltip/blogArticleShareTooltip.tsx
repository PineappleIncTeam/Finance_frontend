import { ITooltip } from "../../../types/common/ComponentsProps";

import styles from "./blogArticleShareTooltip.module.scss";

export const BlogArticleShareTooltip = ({ open }: ITooltip) => {
	return (
		<dialog open={open} className={styles.blogArticleShareTooltipContainer}>
			<div onClick={(e) => e.stopPropagation()} role="textbox">
				<p className={styles.blogArticleShareTooltipContent}>Ссылка успешно скопирована!</p>
			</div>
		</dialog>
	);
};

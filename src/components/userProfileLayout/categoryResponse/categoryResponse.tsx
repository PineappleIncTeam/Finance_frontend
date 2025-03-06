import cn from "classnames";

import { ICategoryResponse } from "../../../types/common/ComponentsProps";

import style from "./categoryResponse.module.scss";

export const CategoryResponse = ({ title, className, open, ...props }: ICategoryResponse) => {
	return (
		<dialog open={open} role="textbox" className={style.backgroundModal}>
			<div
				onClick={(e) => e.stopPropagation()}
				role="textbox"
				className={cn(style.categoryResponseContainer, className)}
				{...props}>
				<p className={style.categoryResponseTitle}>{title}</p>
			</div>
		</dialog>
	);
};

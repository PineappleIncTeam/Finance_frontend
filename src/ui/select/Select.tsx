import { Key } from "react";

import { ISelectProps } from "../../types/common/UiKitProps";

import style from "./Select.module.scss";

export const Select = ({ options, label }: ISelectProps) => {
	return (
		<div className={style.selectContainer}>
			<label className={style.selectContainer__description}>{label}</label>
			<select className={style.selectContainer__item}>
				{options &&
					options.map((value, index: Key) => (
						<option key={index} className={style.selectContainer__optionValue}>
							{value}
						</option>
					))}
			</select>
		</div>
	);
};

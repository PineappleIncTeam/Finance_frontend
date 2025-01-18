import { Key } from "react";

import { FieldValues, useController } from "react-hook-form";

import { INewSelect } from "../../types/common/UiKitProps";

import style from "./newSelect.module.scss";

export const NewSelect = <T extends FieldValues>({ label, options, control, name }: INewSelect<T>) => {
	const {
		field: { onChange, value },
	} = useController({
		name,
		control,
	});
	return (
		<div className={style.selectContainer}>
			<label className={style.selectContainer__description}>{label}</label>
			<select className={style.selectContainer__item} onChange={onChange} value={value}>
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

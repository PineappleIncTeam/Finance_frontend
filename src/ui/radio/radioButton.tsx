import { useController } from "react-hook-form";

import { InputTypeList } from "../../helpers/Input";
import { IRadioButton } from "../../types/common/UiKitProps";

import style from "./radioButton.module.scss";

export const RadioButton = ({ control, name, value, label }: IRadioButton) => {
	const {
		field: { onChange, value: checkedValue, ref },
	} = useController({
		name,
		control,
		defaultValue: "",
	});

	return (
		<div className={style.wrapper} key={`name ${value}`}>
			<input
				type={InputTypeList.Radio}
				className={style.radio}
				id={value}
				name={name}
				value={value}
				onChange={onChange}
				ref={ref}
				checked={checkedValue === value}
			/>
			<label className={style.label} htmlFor={value}>
				{label}
			</label>
		</div>
	);
};

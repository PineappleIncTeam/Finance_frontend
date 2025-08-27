import { FieldValues, useController } from "react-hook-form";

import { IRadioButton } from "../../types/common/UiKitProps";
import { InputTypeList } from "../../helpers/Input";

import styles from "./radioButton.module.scss";

export const RadioButton = <T extends FieldValues>({ control, name, value, label }: IRadioButton<T>) => {
	const {
		field: { onChange, value: checkedValue, ref },
	} = useController({
		name,
		control,
		defaultValue: value,
	});

	return (
		<div className={styles.wrapper} key={`name ${value}`}>
			<input
				type={InputTypeList.Radio}
				className={styles.radio}
				id={value}
				name={name}
				value={value}
				onChange={onChange}
				ref={ref}
				checked={checkedValue === value}
			/>
			<label className={styles.label} htmlFor={value}>
				{label}
			</label>
		</div>
	);
};

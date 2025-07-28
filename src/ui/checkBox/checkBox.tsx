import React from "react";
import { FieldValues, Path, PathValue, useController } from "react-hook-form";

import { ICustomCheckbox } from "../../types/common/UiKitProps";
import { InputTypeList } from "../../helpers/Input";

import styles from "./checkBox.module.scss";

const CustomCheckbox = <T extends FieldValues>({ control, name, rules }: ICustomCheckbox<T>) => {
	const {
		field: { onChange, value, ref },
	} = useController({
		name,
		control,
		defaultValue: false as PathValue<T, Path<T>>,
		rules,
	});

	return (
		<>
			<input
				type={InputTypeList.Checkbox}
				className={styles.hiddenCheckbox}
				onChange={onChange}
				checked={value}
				ref={ref}
				id={`checkbox ${name}`}
			/>
			<label className={styles.checkbox} htmlFor={`checkbox ${name}`} />
		</>
	);
};

export default CustomCheckbox;

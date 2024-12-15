import React from "react";

import { useController } from "react-hook-form";

import { ICustomCheckbox } from "../../types/common/UiKitProps";
import { InputTypeList } from "../../helpers/Input";

import styles from "./checkBox.module.scss";

const CustomCheckbox = ({ control, name, rules }: ICustomCheckbox) => {
	const {
		field: { onChange, value, ref },
	} = useController({
		name,
		control,
		defaultValue: false,
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

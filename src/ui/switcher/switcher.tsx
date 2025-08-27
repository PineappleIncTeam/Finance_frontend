import React from "react";
import { FieldValues, useController } from "react-hook-form";

import { ISwitcher } from "../../types/common/UiKitProps";
import { InputTypeList } from "../../helpers/Input";

import styles from "./switcher.module.scss";

const Switcher = <T extends FieldValues>({ control, name, label }: ISwitcher<T>) => {
	const {
		field: { onChange, value, ref },
	} = useController({
		name,
		control,
	});

	return (
		<label className={styles.switcher} htmlFor={`checkbox-${name}`}>
			<input
				type={InputTypeList.Checkbox}
				className={styles.input}
				onChange={onChange}
				checked={value}
				ref={ref}
				id={`checkbox-${name}`}
			/>
			<div className={styles.slider} />
			<div className={styles.title}>{label}</div>
		</label>
	);
};

export default Switcher;

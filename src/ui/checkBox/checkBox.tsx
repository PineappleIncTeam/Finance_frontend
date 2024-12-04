import React from "react";
import Image from "next/image";

import { useController } from "react-hook-form";

import { ICustomCheckbox } from "../../types/common/UiKitProps";
import { InputType } from "../../helpers/Input";

import checkBoxIcon from "../../assets/pages/signIn/checkBox.svg";

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
		<label className={styles.customCheckbox}>
			<input
				type={InputType.Checkbox}
				className={styles.hiddenCheckbox}
				onChange={onChange}
				checked={value}
				ref={ref}
			/>
			<span className={`${styles.checkbox} ${value ? styles.checked : ""}`}>
				{value && (
					<Image src={checkBoxIcon.src} width={22} height={22} alt="Checkbox icon" className={styles.checkboxIcon} />
				)}
			</span>
		</label>
	);
};

export default CustomCheckbox;

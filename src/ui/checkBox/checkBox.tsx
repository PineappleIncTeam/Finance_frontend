import React from "react";
import Image from "next/image";

import { ICustomCheckbox } from "../../types/common/UiKitProps";
import { InputType } from "../../helpers/Input";

import checkBoxIcon from "../../assets/pages/signIn/checkBox.svg";

import styles from "./checkBox.module.scss";

const CustomCheckbox = ({ isChecked, setIsChecked }: ICustomCheckbox) => {
	const handleCheckboxChange = () => {
		setIsChecked(!isChecked);
	};

	return (
		<label className={styles.customCheckbox}>
			<input
				type={InputType.Checkbox}
				className={styles.hiddenCheckbox}
				checked={isChecked}
				onChange={handleCheckboxChange}
			/>
			<span className={`${styles.checkbox} ${isChecked ? styles.checked : ""}`}>
				{isChecked && (
					<Image src={checkBoxIcon.src} width={22} height={22} alt="Checkbox icon" className={styles.checkboxIcon} />
				)}
			</span>
		</label>
	);
};

export default CustomCheckbox;

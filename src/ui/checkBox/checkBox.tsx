import React, { FC, useState } from "react";
import styles from "./checkBox.module.scss";
import checkBoxIcon from "../../assets/pages/signIn/checkBox.svg";

const CustomCheckbox: FC = () => {
	const [isChecked, setIsChecked] = useState(false);

	const handleCheckboxChange = () => {
		setIsChecked(!isChecked);
	};

	return (
		<label className={styles.customCheckbox}>
			<input type="checkbox" className={styles.hiddenCheckbox} checked={isChecked} onChange={handleCheckboxChange} />
			<span className={`${styles.checkbox} ${isChecked ? styles.checked : ""}`}>
				{isChecked && <img src={checkBoxIcon.src} alt="Checkbox icon" className={styles.checkboxIcon} />}
			</span>
		</label>
	);
};

export default CustomCheckbox;

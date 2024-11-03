import React, { useState } from "react";

import Image from "next/image";

import checkBoxIcon from "../../assets/pages/signIn/checkBox.svg";

import styles from "./checkBox.module.scss";

const CustomCheckbox = () => {
	const [isChecked, setIsChecked] = useState<boolean>(false);

	const handleCheckboxChange = () => {
		setIsChecked(!isChecked);
	};

	return (
		<label className={styles.customCheckbox}>
			<input type="checkbox" className={styles.hiddenCheckbox} checked={isChecked} onChange={handleCheckboxChange} />
			<span className={`${styles.checkbox} ${isChecked ? styles.checked : ""}`}>
				{isChecked && <Image src={checkBoxIcon.src} alt="Checkbox icon" className={styles.checkboxIcon} />}
			</span>
		</label>
	);
};

export default CustomCheckbox;

import React from "react";

import Image from "next/image";

import checkBoxIcon from "../../assets/pages/signIn/checkBox.svg";

import styles from "./checkBox.module.scss";

interface ICustomCheckbox {
	isChecked: boolean;
	setIsChecked: React.Dispatch<React.SetStateAction<boolean>>;
}

const CustomCheckbox = ({ isChecked, setIsChecked }: ICustomCheckbox) => {
	const handleCheckboxChange = () => {
		setIsChecked(!isChecked);
	};

	return (
		<label className={styles.customCheckbox}>
			<input type="checkbox" className={styles.hiddenCheckbox} checked={isChecked} onChange={handleCheckboxChange} />
			<span className={`${styles.checkbox} ${isChecked ? styles.checked : ""}`}>
				{isChecked && (
					<Image src={checkBoxIcon.src} width={22} height={22} alt="Checkbox icon" className={styles.checkboxIcon} />
				)}
			</span>
		</label>
	);
};

export default CustomCheckbox;

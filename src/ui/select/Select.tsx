import { Key } from "react";

import { ISelect } from "../../types/common/UiKitProps";

import styles from "./Select.module.scss";

export const Select = ({ options, label }: ISelect) => {
	return (
		<div className={styles.selectContainer}>
			<label className={styles.selectContainer__description}>{label}</label>
			<select className={styles.selectContainer__item}>
				{options &&
					options.map((value, index: Key) => (
						<option key={index} className={styles.selectContainer__optionValue}>
							{value}
						</option>
					))}
			</select>
		</div>
	);
};

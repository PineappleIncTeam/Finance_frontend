import { ChangeEvent } from "react";
import { useController } from "react-hook-form";

import { ICalculatorForm } from "../../../types/pages/Calculator";
import { ICalcRageInput } from "../../../types/common/ComponentsProps";
import { InputTypeList } from "../../../helpers/Input";
import { constPercentValue, factorValue } from "../../../helpers/calculatorConsts";
import { formatCalculateNumber } from "../../../utils/formatCalculateNumber";

import styles from "./calcRageInput.module.scss";

function CalcRageInput({
	label,
	maxValue,
	changeFieldValue,
	isPercentValue,
	isAdditionalControl,
	isAdditionalControlPercents,
	additionalControlValues = [],
	loanAmountValue,
	...props
}: ICalcRageInput) {
	const { field } = useController<ICalculatorForm>(props);

	const value = typeof field.value === "boolean" ? String(field.value) : field.value;

	function handleNumRangeChange(event: ChangeEvent<HTMLInputElement>) {
		const newValue = (event.target as HTMLInputElement).value;

		changeFieldValue(newValue);
	}

	function handleAdditionalControlClick(value: string) {
		if (isAdditionalControlPercents) {
			changeFieldValue(String(Math.ceil(Number(loanAmountValue) * (Number(value) / factorValue))));
		} else {
			changeFieldValue(value);
		}
	}

	function renderAdditionalControl() {
		return additionalControlValues.map(({ id, title, value }) => (
			<div className={styles.additionalControlContainer} key={id}>
				<input
					type={InputTypeList.Radio}
					onClick={() => handleAdditionalControlClick(value)}
					name={label}
					id={id}
					className={styles.additionalControlContainer__input}
				/>
				<label htmlFor={id} className={styles.additionalControlContainer__label}>
					<p className={styles.additionalControlContainer__title}>{title}</p>
				</label>
			</div>
		));
	}

	return (
		<div className={styles.calcRageInputWrap}>
			<p className={styles.calcRageInputWrap__title}>{label}</p>
			<div className={styles.inputRangeFieldContainer}>
				<input
					{...field}
					type={InputTypeList.Text}
					inputMode="numeric"
					name={props.name}
					className={styles.inputRangeFieldContainer__input}
					value={isPercentValue ? value : formatCalculateNumber(value)}
					step={isPercentValue ? constPercentValue : 1}
					min={0}
					max={maxValue}
				/>
				<input
					type={InputTypeList.Range}
					value={value}
					onChange={handleNumRangeChange}
					className={styles.inputRangeFieldContainer__range}
					step={isPercentValue ? constPercentValue : 1}
					min={0}
					max={maxValue}
				/>
			</div>
			{isAdditionalControl && <div className={styles.additionalControlWrap}>{renderAdditionalControl()}</div>}
		</div>
	);
}

export default CalcRageInput;

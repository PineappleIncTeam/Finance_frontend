import { useState, useRef, useEffect, Key, useLayoutEffect } from "react";

import { IInputDateSelector } from "../../../types/common/UiKitProps";

import styles from "./inputDateSelector.module.scss";

const InputDateSelector = ({ options, changeDate, value, isMonth = false }: IInputDateSelector) => {
	const [isInputDateSelectorOpen, setIsInputDateSelectorOpen] = useState<boolean>(false);
	const [selectedValue, setSelectedValue] = useState<number>(value);
	const selectRef = useRef<HTMLDivElement>(null);
	const optionsContainerRef = useRef<HTMLDivElement>(null);
	const selectedOptionRef = useRef<HTMLDivElement>(null);

	useEffect(() => {
		const handleClickOutside = (event: MouseEvent) => {
			if (selectRef.current && !selectRef.current.contains(event.target as Node)) {
				setIsInputDateSelectorOpen(false);
			}
		};

		document.addEventListener("mousedown", handleClickOutside);

		return () => {
			document.removeEventListener("mousedown", handleClickOutside);
		};
	}, []);

	useEffect(() => {
		setSelectedValue(value);
	}, [value]);

	useLayoutEffect(() => {
		if (isInputDateSelectorOpen && optionsContainerRef.current && selectedOptionRef.current) {
			const container = optionsContainerRef.current;
			const selected = selectedOptionRef.current;
			const containerHeight = container.clientHeight;
			const selectedHeight = selected.offsetHeight;
			const selectedOffset = selected.offsetTop - container.offsetTop;
			const scrollPosition = selectedOffset - (containerHeight - selectedHeight) / 2;

			container.scrollTo({
				top: scrollPosition,
				behavior: "auto",
			});
		}
	}, [isInputDateSelectorOpen]);

	const handleOptionClick = (optionValue: number) => {
		setSelectedValue(optionValue);
		changeDate(optionValue);
		setIsInputDateSelectorOpen(false);
	};

	const toggleDropdown = () => {
		setIsInputDateSelectorOpen(!isInputDateSelectorOpen);
	};

	function renderSelectorOptions() {
		return (
			isInputDateSelectorOpen && (
				<div className={styles.selectContainer__options} ref={optionsContainerRef}>
					{options?.map((option, index: Key) => {
						const optionValue = isMonth ? index : option;
						const isSelected = optionValue === selectedValue;

						return (
							<div
								key={index}
								ref={isSelected ? selectedOptionRef : null}
								className={`${styles.selectContainer__option} ${
									isSelected ? styles.selectContainer__optionSelected : ""
								}`}
								role="listitem"
								onClick={() => handleOptionClick(optionValue as number)}>
								<p className={styles.selectContainer__optionValue}>{option}</p>
							</div>
						);
					})}
				</div>
			)
		);
	}
	return (
		<div className={styles.selectContainer} ref={selectRef}>
			<div onClick={toggleDropdown} className={styles.selectContainer__field} role="listbox">
				{isMonth ? options && options[selectedValue] : selectedValue}
			</div>
			{renderSelectorOptions()}
		</div>
	);
};

export default InputDateSelector;

import { Key, useEffect, useRef, useState } from "react";
import { FieldValues, useController } from "react-hook-form";
import cn from "classnames";

import { ICategorySelect } from "../../../types/common/ComponentsProps";
import { CloseIcon } from "../../../assets/components/categorySelect/CloseIcon";
import { Arrow } from "../../../assets/components/categorySelect/Arrow";

import styles from "./CategorySelect.module.scss";

export const CategorySelect = <T extends FieldValues>({
	label,
	options,
	control,
	name,
	placeholder,
	onRemoveCategory,
}: ICategorySelect<T>) => {
	const {
		field: { onChange, value },
	} = useController({
		name,
		control,
	});

	const [isOpen, setIsOpen] = useState<boolean>(false);
	const [selectedValue, setSelectedValue] = useState<string | null>(value);
	const selectRef = useRef<HTMLDivElement>(null);

	useEffect(() => {
		const handleClickOutside = (event: MouseEvent) => {
			if (selectRef.current && !selectRef.current.contains(event.target as Node)) {
				setIsOpen(false);
			}
		};

		document.addEventListener("mousedown", handleClickOutside);

		return () => {
			document.removeEventListener("mousedown", handleClickOutside);
		};
	}, []);

	const handleOptionClick = (optionValue: string) => {
		setSelectedValue(optionValue);
		onChange(optionValue);
		setIsOpen(false);
	};

	const toggleDropdown = () => {
		setIsOpen(!isOpen);
	};

	const handleRemoveCategory = (categoryId: string) => {
		if (onRemoveCategory) {
			onRemoveCategory(categoryId);
		}
	};

	const handleRemoveSelection = () => {
		setSelectedValue(null);
	};

	function renderSelectorOptions() {
		return (
			isOpen && (
				<div className={styles.selectContainer__options} onChange={onChange}>
					<p className={styles.selectContainer__title}>Добавить категорию</p>
					{options &&
						options.map((option, index: Key) => (
							<div
								key={index}
								className={styles.selectContainer__option}
								onClick={() => handleOptionClick(option.id)}
								role="button">
								<p className={styles.selectContainer__optionValue}>{option.name}</p>
								<button
									className={styles.selectContainer__removeButton}
									onClick={(event) => {
										event.stopPropagation();
										handleRemoveCategory(option.id);
									}}>
									<CloseIcon classNames={styles.selectContainer__selectIcon} />
								</button>
							</div>
						))}
				</div>
			)
		);
	}

	const renderSelectedValue = () => {
		const selectedOption = options.find((option) => option.id === selectedValue);
		return selectedOption ? (
			<span className={cn(styles.selectContainer__selectedValue)}>
				<span className={styles.selectContainer__selectedText}>{selectedOption.name} </span>
				<div className={styles.closeIcon} onClick={handleRemoveSelection} role="button">
					<CloseIcon classNames={styles.selectContainer__selectIcon} />
				</div>
			</span>
		) : (
			<span className={styles.selectContainer__placeholder}>{placeholder}</span>
		);
	};

	return (
		<div className={styles.selectContainer} ref={selectRef}>
			<label className={styles.selectContainer__description}>{label}</label>
			<div onClick={toggleDropdown} className={styles.selectContainer__field} role="listbox">
				{renderSelectedValue()}

				<Arrow
					classNames={cn(styles.selectContainer__selectIcon, isOpen && styles.selectContainer__selectIcon__active)}
				/>
			</div>
			{renderSelectorOptions()}
		</div>
	);
};

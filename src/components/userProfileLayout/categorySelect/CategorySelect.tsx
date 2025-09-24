import { Key, useEffect, useRef, useState } from "react";
import { FieldValues, useController } from "react-hook-form";
import cn from "classnames";

import { ICategorySelect } from "../../../types/common/ComponentsProps";
import { InputTypeList } from "../../../helpers/Input";

import { CloseIcon } from "../../../assets/components/categorySelect/CloseIcon";
import { Arrow } from "../../../assets/components/categorySelect/Arrow";

import styles from "./CategorySelect.module.scss";

export const CategorySelect = <T extends FieldValues>({
	label,
	options,
	control,
	name,
	placeholder,
	onAddCategory,
	onRemoveCategory,
}: ICategorySelect<T>) => {
	const {
		field: { onChange, value },
	} = useController({
		name,
		control,
	});

	const [isOpen, setIsOpen] = useState<boolean>(false);
	const [selectedValue, setSelectedValue] = useState<number | null>(value);
	const [selectedName, setSelectedName] = useState<number | string>();
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

	const handleOptionClick = (optionValue: number, optionName: string) => {
		setSelectedValue(optionValue);
		setSelectedName(optionName);
		onChange(optionValue);
		onChange(optionName);
		setIsOpen(false);
	};

	const toggleDropdown = () => {
		setIsOpen(!isOpen);
	};

	const handleRemoveCategory = (categoryId: number, categoryName: string) => {
		if (onRemoveCategory) {
			onRemoveCategory(categoryId, categoryName);
		}
	};

	const handleRemoveSelection = () => {
		setSelectedValue(null);
		onChange(null);
	};

	function renderSelectorOptions() {
		return (
			isOpen && (
				<div className={styles.selectContainer__options} onChange={onChange}>
					<button onClick={onAddCategory} type={InputTypeList.Button} className={styles.selectContainer__title}>
						Добавить категорию
					</button>
					{options &&
						options.map((option, index: Key) => (
							<div
								key={index}
								className={styles.selectContainer__option}
								onClick={() => [handleOptionClick(option.id, option.name)]}
								role="button">
								<p className={styles.selectContainer__optionValue}>{option.name}</p>
								<button
									type={InputTypeList.Button}
									className={styles.selectContainer__removeButton}
									onClick={(event) => {
										event.stopPropagation();
										handleRemoveCategory(option.id, option.name);
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
		const selectedOption = options.find((option) => option.id === selectedValue && option.name === selectedName);
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

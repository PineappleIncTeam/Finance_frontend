import { Key, useEffect, useRef, useState } from "react";
import { FieldValues, useController } from "react-hook-form";
import cn from "classnames";
import Image from "next/image";

import { ICategorySelect } from "../../../types/common/UiKitProps";
import CloseIcon from "../../../assets/components/categorySelect/close.svg";
import Arrow from "../../../assets/components/categorySelect/arrow.svg";

import styles from "./CategorySelect.module.scss";

export const CategorySelect = <T extends FieldValues>({
	label,
	options,
	control,
	name,
	placeholder,
	onRemoveCategory, // callback для удаления категории
}: ICategorySelect<T>) => {
	const {
		field: { onChange, value },
	} = useController({
		name,
		control,
	});

	const [isOpen, setIsOpen] = useState<boolean>(false);
	const [selectedValue, setSelectedValue] = useState<string>(value);
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

	const handleRemoveCategory = (category: string) => {
		if (onRemoveCategory) {
			onRemoveCategory(category); // вызов callback при удалении
		}
	};

	function renderSelectorOptions() {
		return (
			isOpen && (
				<div className={styles.selectContainer__options} onChange={onChange}>
					<p className={styles.selectContainer__title}>Добавить категорию</p>
					{options &&
						options.map((option, index: Key) => (
							<div key={index} className={styles.selectContainer__option} onClick={() => handleOptionClick(option)} role="button">
								<p className={styles.selectContainer__optionValue} >
									{option}
								</p>
								<button
									className={styles.selectContainer__removeButton}
									onClick={() => handleRemoveCategory(option)} 
								>
									<Image src={CloseIcon} alt={"close"}  />
								</button>
							</div>
						))}
				</div>
			)
		);
	}

	return (
<div className={styles.selectContainer}>
    <label className={styles.selectContainer__description}>{label}</label>
    <div onClick={toggleDropdown} className={styles.selectContainer__field} role="listbox">
        {selectedValue ? selectedValue : <span className={styles.selectContainer__placeholder}>{placeholder}</span>}
            <Image
                src={Arrow}
                alt="arrow"
                className={cn(styles.selectContainer__selectIcon, isOpen && styles.selectContainer__selectIcon__active)}
            />
    </div>
    {renderSelectorOptions()}
</div>
	);
};

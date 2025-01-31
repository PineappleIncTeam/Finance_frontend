import { Key, useEffect, useRef, useState } from "react";
import { FieldValues, useController } from "react-hook-form";
import cn from "classnames";

import { ISelector } from "../../types/common/UiKitProps";

import style from "./Selector.module.scss";

export const Selector = <T extends FieldValues>({ label, options, control, name, placeholder }: ISelector<T>) => {
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

	function renderSelectorOptions() {
		return (
			isOpen && (
				<div className={style.selectContainer__options} onChange={onChange}>
					{options &&
						options.map((option, index: Key) => (
							<div key={index} className={style.selectContainer__option}>
								<p className={style.selectContainer__optionValue} onClick={() => handleOptionClick(option)}>
									{option}
								</p>
							</div>
						))}
				</div>
			)
		);
	}

	return (
		<div className={style.selectContainer} ref={selectRef}>
			<label className={style.selectContainer__description}>{label}</label>
			<div onClick={toggleDropdown} className={style.selectContainer__field} role="listbox">
				{selectedValue ? selectedValue : <span className={style.selectContainer__placeholder}>{placeholder}</span>}
				<div className={cn(style.selectContainer__selectIcon, isOpen && style.selectContainer__selectIcon__active)} />
			</div>
			{renderSelectorOptions()}
		</div>
	);
};

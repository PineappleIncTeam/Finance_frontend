import { BaseSyntheticEvent, useEffect, useRef, useState } from "react";

import { IArchiveCategoryData, IDropdownCategoryData } from "../../types/api/Dropdown";
import Modal from "../../ui/modalWindow/Modal";
import {
	addDropdownCategory,
	deleteDropdownCategory,
	sendCategoryToArchive,
} from "../../services/api/mainFieldApi/Dropdown";

import closeIcon from "../../assets/closeIcon.svg";
import style from "../../ui/modalWindow/Modal.module.css";

import CloseIcon from "../../assets/script/CloseIcon";

import "./Dropdown.css";

const Icon = () => {
	return (
		<svg height="20" width="20" viewBox="0 0 20 20">
			<path d="M4.516 7.548c0.436-0.446 1.043-0.481 1.576 0l3.908 3.747 3.908-3.747c0.533-0.481 1.141-0.446 1.574 0 0.436 0.445 0.408 1.197 0 1.615-0.406 0.418-4.695 4.502-4.695 4.502-0.217 0.223-0.502 0.335-0.787 0.335s-0.57-0.112-0.789-0.335c0 0-4.287-4.084-4.695-4.502s-0.436-1.17 0-1.615z"></path>
		</svg>
	);
};

function Dropdown({
	isSearchable,
	category_type,
	income_outcome,
	categories,
	title,
	changeSelectElement,
	selectElement,
	token,
	getBalanceData,
	getInputData,
	sumCash,
	getCategories,
	typeOfCategories,
	disInput,
	addActive,
	setEnterSum,
	setTarget,
	getOperationList,
	endpoint,
	symbol,
}: any) {
	const [newCategory, setNewCategory] = useState("");
	// const [newTarget, setNewTarget] = useState("");
	const [showMenu, setShowMenu] = useState(false);
	const [selectedValue, setSelectedValue] = useState(null);
	const [searchValue, setSearchValue] = useState("");

	const [modalMessageActive, setModalMessageActive] = useState(false);
	//
	const [modalActive, setModalActive] = useState(false);
	const [error, setError] = useState(false);
	const [errorMessage, setErrorMessage] = useState("");
	const [modalDelete, setModalDelete] = useState(false);
	const [selectedCategory, setSelectedCategory] = useState({});
	const [modalMessage, setModalMessage] = useState("");

	const searchRef = useRef();
	const inputRef = useRef();
	const handleModalInputRef = useRef(null);

	const newTarget = "";

	function closeModal() {
		setNewCategory("");
		setModalActive(false);
		setErrorMessage("");
		setError(false);
	}
	function handleInput(e: BaseSyntheticEvent) {
		e.preventDefault();
		setError(false);
		setErrorMessage("");
		if (e.target.value.length > 14) {
			setError(true);
			setErrorMessage("Не более 14 символов");
		}
		if (e.target.value === " ") setNewCategory((prev) => prev);
		else setNewCategory(e.target.value.replace(/[/#$%^&*!()<>@]+/, ""));
	}

	function createModal(categoryId: any, categoryName: any) {
		if (categoryName === "Из Накоплений") {
			// eslint-disable-next-line quotes
			setModalMessage('В эту категорию можно только переносить данные из раздела "Накопления"');
		} else {
			setModalMessage(`Вы хотите удалить категорию "${categoryName}" или отправить её в архив?`);
			setSelectedCategory({ id: categoryId, name: categoryName });
			setModalDelete(true);
		}
	}

	const userCategoriesName =
		categories &&
		categories.map((item: any) => {
			if (item.category_type === category_type) {
				return item.categoryName.toLowerCase();
			}
			return null;
		});

	useEffect(() => {
		setSearchValue("");
		if (showMenu && searchRef.current) {
			searchRef.current.focus();
		}
	}, [showMenu]);

	const onSearch = (event: any) => {
		setSearchValue(event.target.value);
	};

	useEffect(() => {
		const handler = (event: any) => {
			if (inputRef.current && !inputRef.current.contains(event.target)) {
				setShowMenu(false);
			}
		};

		window.addEventListener("click", handler);

		return () => {
			window.removeEventListener("click", handler);
		};
	});
	const handleInputClick = () => {
		setShowMenu(!showMenu);
	};
	function getDisplay() {
		if (selectedValue && selectElement) {
			return selectedValue.categoryName;
		}

		return title;
	}

	const onItemClick = (option: any) => {
		if (option.categoryName === "Из Накоплений") {
			setModalMessageActive(true);
			getDisplay();
		} else {
			setSelectedValue(option);
			changeSelectElement(option);
			disInput(true);
		}
	};

	const isSelected = (option: any) => {
		if (!selectedValue) {
			return false;
		}
		return selectedValue.categoryName === option.categoryName;
	};

	function chooseAndAddCategory(e: BaseSyntheticEvent) {
		e.preventDefault();

		for (let i = 0; i < userCategoriesName.length; i++) {
			if (userCategoriesName[i] === newCategory.toLowerCase()) {
				setErrorMessage("Категория с таким именем уже существует");
				return;
			}
		}

		const dropdownCategoryData: IDropdownCategoryData = {
			categoryName: newCategory,
			category_type,
			income_outcome,
			target: newTarget,
		};

		addDropdownCategory(dropdownCategoryData, token ?? "").then((result) => {
			result.json();
			setSelectedValue("");
			getCategories(typeOfCategories);
			getDisplay();
			setNewCategory("");
			setModalActive(false);
		});
	}

	function deleteCategory(e: BaseSyntheticEvent, category: any) {
		e.preventDefault();

		deleteDropdownCategory(category.id, token ?? "")
			.then(() => {
				setSelectedValue("");
				getDisplay();
				getCategories(typeOfCategories);
				setModalMessage(`Категория "${selectedCategory.name}" была удалена`);
				disInput(false);
				setEnterSum("");
				setTarget("");
			})
			.then(() => {
				setTimeout(() => {
					getInputData(sumCash);
					getBalanceData();
					getOperationList(endpoint, symbol);
					setModalDelete(false);
					setSelectedCategory({});
					setModalMessage("");
				}, 1000);
			});
	}

	function sendToArchive(e: BaseSyntheticEvent, category: any) {
		e.preventDefault();

		const archiveCategoryData: IArchiveCategoryData = {
			category_id: category.id,
			is_hidden: true,
		};

		sendCategoryToArchive(archiveCategoryData, category.id, token ?? "")
			.then(() => {
				setModalMessage(`Категория "${selectedCategory.name}" была переведена в архив`);
				setSelectedValue("");
				getDisplay();
				getCategories(typeOfCategories);
			})
			.then(() => {
				setTimeout(() => {
					setModalDelete(false);
					setSelectedCategory({});
					setModalMessage("");
				}, 1000);
			});
	}

	function cancel(e) {
		e.preventDefault();

		setSelectedCategory({});
		setModalDelete(false);
	}
	function getModalActive() {
		handleModalInputRef.current.focus();
		setModalActive(true);
	}

	return (
		<>
			<div className="dropdown-container">
				<div className="dropdown-input" ref={inputRef} onClick={handleInputClick}>
					<div className="dropdown-selected-value">{getDisplay()}</div>
					<div className="dropdown-tools">
						<div className="dropdown-tool">
							<Icon />
						</div>
					</div>
				</div>
				{showMenu && (
					<div className="dropdown-menu">
						{isSearchable && (
							<div className="search-box">
								<input onChange={onSearch} value={searchValue} ref={searchRef} placeholder="Добавить категорию" />
							</div>
						)}
						<div
							className={addActive ? "option_list_add" : "disabled"}
							data-value="Добавить категорию"
							onClick={() => getModalActive()}>
							Добавить категорию
						</div>
						{categories &&
							categories.map((jsonObject, index) => {
								if (jsonObject.category_type === category_type && jsonObject.is_hidden === false) {
									return (
										<div
											className={`dropdown-item ${isSelected(jsonObject) && "selected"}`}
											key={jsonObject.category_id}
											index={index}
											onClick={() => onItemClick(jsonObject)}>
											{jsonObject.categoryName}
											<span
												className={style.delete_icon}
												title="Удаление категории"
												onClick={() => createModal(jsonObject.category_id, jsonObject.categoryName)}>
												<CloseIcon />
											</span>
										</div>
									);
								}
								return null;
							})}
					</div>
				)}
			</div>
			<Modal active={modalActive} setActive={setModalActive} setInput={() => setNewCategory("")}>
				<form className={style.modal_form} onSubmit={(e) => chooseAndAddCategory(e)}>
					<div className={style.delete_icon} onClick={closeModal}>
						<img src={closeIcon} alt="cross" />
					</div>
					<div className={style.content_box}>
						<p className={style.modal_text}>Введите название категории (не более 14 символов)</p>
						<div>
							<input
								ref={handleModalInputRef}
								className={error ? `${style.modal_input} ${style.error}` : style.modal_input}
								type="text"
								value={newCategory}
								onChange={(e) => handleInput(e)}
								onKeyDown={(event) => (event.key === "Enter" ? chooseAndAddCategory(event) : "")}
								placeholder="Название категории"
							/>

							<button
								className={style.button}
								onClick={(e) => chooseAndAddCategory(e)}
								type="submit"
								disabled={error || !newCategory}>
								Добавить
							</button>
						</div>
						<div className={style.errorMessage}>{errorMessage}</div>
					</div>
				</form>
			</Modal>
			<Modal active={modalDelete} setActive={setModalDelete}>
				<form className={style.modal_form}>
					<div className={style.delete_icon} onClick={() => setModalDelete(false)}>
						<img src={closeIcon} alt="cross" />
					</div>
					<div className={style.modal_text}>{modalMessage}</div>
					<div>
						<button className={style.button} onClick={(e) => deleteCategory(e, selectedCategory)}>
							Удалить
						</button>
						{selectedCategory.name !== "Из Накоплений" && (
							<button
								className={style.button_archive}
								onClick={(e) => sendToArchive(e, selectedCategory)}
								type="submit">
								В архив
							</button>
						)}
						<button className={style.button_cancel} onClick={(e) => cancel(e)}>
							Отмена
						</button>
					</div>
				</form>
			</Modal>
			<Modal active={modalMessageActive} setActive={setModalMessageActive} setInput={() => setModalActive(false)}>
				<div className={style.delete_icon} onClick={() => setModalMessageActive(false)}>
					<img src={closeIcon} alt="cross" />
				</div>
				<div className={style.content_box}>
					<div className={style.modal_text}>В эту категорию можно только переносить данные из раздела "Накопления"</div>
				</div>
			</Modal>
		</>
	);
}
export default Dropdown;
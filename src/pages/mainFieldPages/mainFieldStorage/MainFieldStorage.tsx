import { BaseSyntheticEvent, useEffect, useState } from "react";

import useAppSelector from "../../../hooks/useAppSelector";

import { SendingIncomeToSum } from "../../../types/api/StorageActions";
import Modal from "../../../ui/modalWindow/Modal";
import MainFieldString from "../../../components/mainFieldString/MainFieldString";
import userDataSelector from "../../../services/redux/features/userData/UserDataSelector";
import { createNewCategory, removeCategory, sendIncomeToSum } from "../../../services/api/mainFieldApi/StorageActions";
import { URLS, dateOnline } from "../../../helpers/urlsAndDates";
import { numberFormatRub } from "../../../helpers/calculator";
import { getStorageSum } from "../../../utils/storageFunctions";

import closeIcon from "../../../assets/closeIcon.svg";
import statusImage from "../../../assets/statusImage.svg";
import statusCheckBox from "../../../assets/checkBox.svg";

import modalStyle from "../../../ui/modalWindow/Modal.module.css";

import style from "./MainFieldStorage.module.css";

// Компонент "Накопления"
function MainFieldStorage({
	categories,
	getCategories,
	storageCategories,
	sum,
	getStorageCategories,
	setCheckMainField,
	setCheckCalculator,
	getOperationList,
	getInputData,
	getBalanceData,
}: any) {
	const token = useAppSelector(userDataSelector).token;
	const [modalActive, setModalActive] = useState(false);
	const [modalMessage, setModalMessage] = useState("");
	const [selectedCategory, setSelectedCategory] = useState({});

	let categoryFromStorage = {};

	for (let i = 0; i < categories.length; i++) {
		if (categories[i].categoryName === "Из Накоплений") categoryFromStorage = categories[i];
	}

	function createModal(category: any) {
		setModalMessage(`Вы уверены, что хотите перевести накопление ${category.categoryName} в доходы?`);
		setModalActive(true);
		setSelectedCategory(category);
	}

	function addSumToIncome(e: BaseSyntheticEvent, category: any, incomeCategory: any) {
		e.preventDefault();

		const incomeData: SendingIncomeToSum = {
			sum: category.sum,
			category_id: incomeCategory.category_id,
			date: dateOnline,
		};

		sendIncomeToSum(incomeData, token ?? "").then(() => {
			setModalMessage(`Накопление ${category.categoryName} было переведено в доход в категорию "Из Накоплений"`);
			getCategories(URLS.getIncomeCategories);
			deleteCategory(e, category);
			setTimeout(() => {
				setModalActive(false);
				setSelectedCategory({});
				setModalMessage("");
			}, 2000);
		});
		getStorageSum(storageCategories);
	}

	function addCategory(e: BaseSyntheticEvent, category: any) {
		e.preventDefault();

		createNewCategory(token ?? "")
			.then((response) => response.json())
			.then((data) => {
				addSumToIncome(e, category, data);
				getBalanceData();
			});
	}

	function deleteCategory(e: BaseSyntheticEvent, category: any) {
		e.preventDefault();

		removeCategory(`${URLS.deleteCategory}${category.category_id}`, token ?? "")
			.then(() => {
				getStorageCategories(URLS.getMoneyBoxCategories);
			})
			.then(() => {
				setTimeout(() => {
					getBalanceData();
					getOperationList(URLS.last5MoneyBoxOperation, " ");
					setSelectedCategory({});
				}, 2000);
			});

		getStorageSum(storageCategories);
	}

	function sendStorageToIncome(e: BaseSyntheticEvent, category: any, categories: any) {
		e.preventDefault();
		let count = 0;

		for (let i = 0; i < categories.length; i++) {
			if (categories[i].categoryName === "Из Накоплений") {
				count += 1;
			}
		}
		if (count > 0) addSumToIncome(e, category, categoryFromStorage);
		else addCategory(e, category);

		count = 0;
	}

	useEffect(() => {
		setCheckMainField(true);
		setCheckCalculator(false);
		getOperationList(URLS.last5MoneyBoxOperation, " ");
		getStorageCategories(URLS.getMoneyBoxCategories);
		getCategories(URLS.getIncomeCategories);
		getBalanceData();
		getStorageSum(storageCategories);
	}, []);

	return (
		<>
			<div className={style.main_field}>
				<h2 className={`${style.main_field_title}`}>Накопления</h2>
				<div className={style.main_field_input}>
					<input className={style.input_rub} value={sum ? numberFormatRub.format(sum) : ""} readOnly></input>
				</div>
				<div className={style.main_field_title_label}>Общая сумма накоплений</div>
				<div className={style.main_field_storage}>
					<MainFieldString
						title="Накопления"
						type="accumulate"
						income_outcome="money_box"
						symbol=" "
						endpoint={URLS.last5MoneyBoxOperation}
						getOperationList={getOperationList}
						getBalanceData={getBalanceData}
						getInputData={getInputData}
						sumCash={URLS.sumOutcomeCash}
						typeOfSum={URLS.POSTmoneyBox}
						categories={storageCategories}
						getCategories={getStorageCategories}
						typeOfCategories={URLS.getMoneyBoxCategories}
						addActive={true}
						storageType={true}
						placeholder={"Введите цель"}
					/>
				</div>
				<div className={style.storage_categories}>
					{storageCategories.length > 0 && (
						<div className={`${style.categories_storage_title} ${style.fat}`}>
							<div className={`${style.category_name_storage} ${style.fat}`}>Категория</div>
							<div className={`${style.grand_total_storage} ${style.fat}`}>Цель, руб</div>
							<div className={`${style.sum_storage} ${style.fat}`}>Сумма, руб</div>
						</div>
					)}
					<div className={style.storage_categories_list}>
						{storageCategories &&
							storageCategories.map((category: any, index: number) => {
								const doneStorage = category.target - category.sum;
								if (!category.is_hidden)
									return (
										<div className={style.storage_category_row} key={category.category_id} index={index}>
											<div className={style.categories_storage_title}>
												<div className={style.category_name_storage}>{category.categoryName}</div>
												<div className={style.grand_total_storage}>{numberFormatRub.format(category.target)}</div>
												{(Boolean(category.sum) || category.sum === 0) && (
													<div className={style.sum_storage}>
														<div className={style.sum_storage_content}>{numberFormatRub.format(category.sum)}</div>
													</div>
												)}
											</div>
											{category.target && !doneStorage && (
												<>
													<img
														className={style.image}
														src={statusImage}
														alt="status ok"
														onClick={() => createModal(category)}
													/>
													<img
														className={style.image_checkBox}
														src={statusCheckBox}
														alt="status ok"
														onClick={() => createModal(category)}
													/>
												</>
											)}
										</div>
									);
							})}
					</div>
				</div>
				<div className={style.mobileSum}>
					<div className={style.mobileSum_input}>
						<div className={style.mainTextSumm}>Общая сумма накоплений</div>
						<input className={style.input_rubMobile} value={sum ? numberFormatRub.format(sum) : ""} readOnly></input>
						{/* <span className={style.ruble_iconMobile}>₽</span> */}
					</div>
				</div>
			</div>
			<Modal active={modalActive} setActive={setModalActive} setInput={setModalActive}>
				<div className={modalStyle.delete_icon} onClick={() => setModalActive(false)}>
					<img src={closeIcon} alt="cross" />
				</div>
				<div className={modalStyle.modal_text}>{modalMessage}</div>
				<div>
					<button className={modalStyle.button} onClick={(e) => sendStorageToIncome(e, selectedCategory, categories)}>
						Да
					</button>
					<button className={modalStyle.button_cancel} onClick={() => setModalActive(false)}>
						Нет
					</button>
				</div>
			</Modal>
		</>
	);
}
export default MainFieldStorage;

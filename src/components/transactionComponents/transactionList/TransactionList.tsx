/* eslint-disable quotes */
import { BaseSyntheticEvent, useState } from "react";

import useAppSelector from "../../../hooks/useAppSelector";

import Modal from "../../../ui/modalWindow/Modal";
import { numberFormatRub } from "../../../helpers/calculator";
import userDataSelector from "../../../services/redux/features/userData/UserDataSelector";
import { URLS } from "../../../helpers/urlsAndDates";

import closeIcon from "../../../assets/closeIcon.svg";

import style from "../../../ui/modalWindow/Modal.module.css";

import {
	deleteIncomeCash,
	deleteMoneyBoxCash,
	deleteOutcomeCash,
	updateIncomeCash,
	updateMoneyBoxCash,
	updateOutcomeCash,
} from "../../../services/api/TransactionListActions";
import { ICashData } from "../../../types/api/TransactionListActions";

import s from "./TransactionList.module.css";

function TransactionList({
	getBalanceData,
	getOperationList,
	operationList,
	symbol,
	getInputData,
	getStorageCategories,
	typeOfCategories,
}: any) {
	const token = useAppSelector(userDataSelector).token;

	const [modalDeleteActive, setModalDeleteActive] = useState(false);
	const [modalChangeSum, setModalChangeSum] = useState(false);
	const [modalMessageActive, setModalMessageActive] = useState(false);
	const [modalMessageText, setModalMessageText] = useState(false);

	const [selectedOperation, setSelectedOperation] = useState({});
	const [newSum, setNewSum] = useState("");
	const [message, setMessage] = useState("");

	function createModalChangeSum(categoryName: any, id: any, category_id: any, sum: any, symbol: any) {
		if (categoryName === "Из Накоплений") {
			setModalMessageText('В эту категорию можно только переносить данные из раздела "Накопления"');
			setModalMessageActive(true);
		} else {
			setMessage("Введите новое числовое \n значение");
			setModalChangeSum(true);
			setSelectedOperation({ categoryName, id, category_id, sum, symbol });
			setNewSum(sum);
		}
	}

	function closeModalChangeSum() {
		setModalChangeSum(false);
	}

	function handleInput(e: any) {
		e.preventDefault();

		setNewSum(e.target.value.replace(/[^0-9.,]+/, "").replace(/,/, "."));
	}

	function createDeleteModal(categoryName: any, operationId: any, symbol: any) {
		if (categoryName === "Из Накоплений") {
			setModalMessageText('В эту категорию можно только переносить данные из раздела "Накопления"');
			setModalMessageActive(true);
		} else {
			setMessage("Вы действительно хотите удалить эту запись? \n Действие не может быть отменено");
			setModalDeleteActive(true);
			setSelectedOperation({ id: operationId, symbol: symbol });
		}
	}

	function cancel(e: BaseSyntheticEvent) {
		e.preventDefault();

		setSelectedOperation({});
		setModalDeleteActive(false);
	}

	function deleteCash(id: any, symbol: any) {
		if (symbol === "+") {
			deleteIncomeCash(id, token ?? "");
			setTimeout(() => {
				getOperationList(URLS.last5IncomeCash, symbol);
				getInputData(URLS.sumIncomeCash);
				getBalanceData();
			}, 500);
		}
		if (symbol === "-") {
			deleteOutcomeCash(id, token ?? "");
			setTimeout(() => {
				getOperationList(URLS.last5OutcomeCash, symbol);
				getInputData(URLS.sumOutcomeCash);
				getBalanceData();
			}, 500);
		}
		if (symbol === " ") {
			deleteMoneyBoxCash(id, token ?? "");
			setTimeout(() => {
				getOperationList(URLS.last5MoneyBoxOperation, symbol);
				getInputData(URLS.sumOutcomeCash);
				getBalanceData();
				getStorageCategories(typeOfCategories);
			}, 400);
		}
		setMessage("Запись была удалена");
		setTimeout(() => setModalDeleteActive(false), 1000);
	}

	function updateCash(event: BaseSyntheticEvent, id: any, category: any, name: any, symbol: any) {
		event.preventDefault();

		const cashData: ICashData = {
			category_id: category,
			categoryName: name,
			sum: newSum,
		};

		if (symbol === "+") {
			updateIncomeCash(cashData, id, token ?? "");
			setTimeout(() => {
				getOperationList(URLS.last5IncomeCash, symbol);
				getInputData(URLS.sumIncomeCash);
				getBalanceData();
			}, 400);
		}
		if (symbol === "-") {
			updateOutcomeCash(cashData, id, token ?? "");
			setTimeout(() => {
				getOperationList(URLS.last5OutcomeCash, symbol);
				getInputData(URLS.sumOutcomeCash);
				getBalanceData();
			}, 400);
		}
		if (symbol === " ") {
			updateMoneyBoxCash(cashData, id, token ?? "").then((response) => {
				if (response.status === 400) {
					setModalChangeSum(false);
					setModalMessageText("Сумма операции не должна превышать цель накопления");
					setModalMessageActive(true);
				} else
					setTimeout(() => {
						getOperationList(URLS.last5MoneyBoxOperation, symbol);
						getInputData(URLS.sumOutcomeCash);
						getBalanceData();
						getStorageCategories(typeOfCategories);
						setMessage("Запись была изменена");
					}, 400);
			});
		}

		setTimeout(() => setModalChangeSum(false), 1000);
	}

	return (
		<>
			<div className={s.transactions}>
				{operationList &&
					operationList.map((operation: any, index: number) => {
						return (
							<div className={s.operation} key={index} id={operation.id}>
								<div className={s.operation_list_item1}>{operation.date}</div>
								<div className={s.operation_list_item}>{operation.categoryName}</div>
								<div className={s.operation_list_item}>
									{symbol}
									{numberFormatRub.format(operation.sum)}
									{/* <span className="ruble_icon ruble_icon_transactions">₽</span> */}
								</div>
								<div className={s.icons}>
									<button
										className={s.icon_button}
										type="submit"
										title="Удалить запись"
										onClick={() => {
											createDeleteModal(operation.categoryName, operation.id, symbol);
										}}>
										<div className={s.operation_list_icon1}></div>
									</button>
									<button
										className={s.icon_button}
										type="submit"
										title="Редактировать"
										onClick={() => {
											createModalChangeSum(
												operation.categoryName,
												operation.id,
												operation.category_id,
												operation.sum,
												symbol,
											);
										}}>
										<div className={s.operation_list_icon2}></div>
									</button>
								</div>
							</div>
						);
					})}
			</div>
			<Modal active={modalDeleteActive} setActive={setModalDeleteActive} setInput={setModalDeleteActive}>
				<div className={style.delete_icon} onClick={() => setModalDeleteActive(false)}>
					<img src={closeIcon} alt="cross" />
				</div>
				<div className={style.content_box}>
					<p className={style.modal_text}>{message}</p>
					<div>
						<button className={style.button} onClick={() => deleteCash(selectedOperation.id, selectedOperation.symbol)}>
							Удалить
						</button>
						<button className={style.button_cancel} onClick={(e) => cancel(e)}>
							Отмена
						</button>
					</div>
				</div>
			</Modal>
			<Modal active={modalChangeSum} setActive={setModalChangeSum}>
				<form
					className={style.modal_form}
					onSubmit={(event) =>
						updateCash(
							event,
							selectedOperation.id,
							selectedOperation.category_id,
							selectedOperation.categoryName,
							selectedOperation.symbol,
						)
					}>
					<div className={style.delete_icon} onClick={closeModalChangeSum}>
						<img src={closeIcon} alt="cross" />
					</div>
					<div className={style.content_box}>
						<p className={style.modal_text}>{message}</p>
						<div>
							<input
								className={style.modal_input}
								type="text"
								value={newSum}
								onKeyDown={(e: any) =>
									e.key == "Enter"
										? () =>
												updateCash(
													selectedOperation.id,
													selectedOperation.category_id,
													selectedOperation.categoryName,
													selectedOperation.symbol,
												)
										: ""
								}
								onChange={(e) => handleInput(e)}
							/>
							<button type="submit" className={style.button} disabled={Boolean(newSum <= 0)}>
								Добавить
							</button>
						</div>
					</div>
				</form>
			</Modal>
			<Modal
				active={modalMessageActive}
				setActive={setModalMessageActive}
				setInput={() => setModalMessageActive(false)}>
				<div className={style.delete_icon} onClick={() => setModalMessageActive(false)}>
					<img src={closeIcon} alt="cross" />
				</div>
				<div className={style.content_box}>
					<div className={style.modal_text}>{modalMessageText}</div>
				</div>
			</Modal>
		</>
	);
}
export default TransactionList;

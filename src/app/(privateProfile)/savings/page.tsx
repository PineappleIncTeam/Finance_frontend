/* eslint-disable camelcase */
"use client";

import { useEffect, useState } from "react";
import { useForm } from "react-hook-form";

import useLogoutTimer from "../../../hooks/useLogoutTimer";

import {
	IEditActionProps,
	ISavingsTransaction,
	SavingsFieldValues,
	SortOrderStateValue,
	TIndexState,
	TSavingsFieldState,
} from "../../../types/components/ComponentsTypes";
import { ISavingsInputForm, ISavingsSelectForm } from "../../../types/pages/Savings";
import SavingsTransaction from "../../../components/userProfileLayout/savingsTransaction/savingsTransaction";
import AppInput from "../../../ui/appInput/AppInput";
import { CategorySelect } from "../../../components/userProfileLayout/categorySelect/CategorySelect";
import AddButton from "../../../components/userProfileLayout/addButton/addButton";
import { savingsTransactions } from "../../../mocks/SavingsTransaction";
import { InputTypeList } from "../../../helpers/Input";
import { getCorrectBaseUrl } from "../../../utils/baseUrlConverter";
import handleLogout from "../../../helpers/logout";

import { EditIcon } from "../../../assets/script/expenses/EditIcon";
import { CheckIcon } from "../../../assets/script/savings/CheckIcon";
import { MoreIcon } from "../../../assets/script/savings/MoreIcon";
import { SortIcon } from "../../../assets/script/savings/SortIcon";

import styles from "./savings.module.scss";

function Savings() {
	const { control } = useForm<ISavingsInputForm & ISavingsSelectForm>({
		defaultValues: {
			sum: "",
		},
		mode: "all",
		delayError: 200,
	});
	const [hoveredIndex, setHoveredIndex] = useState<TIndexState>(null);

	const [editField, setEditField] = useState<TSavingsFieldState>(null);
	const [editIndex, setEditIndex] = useState<TIndexState>(null);
	const [editValue, setEditValue] = useState<string>("");

	const [openMoreIndex, setOpenMoreIndex] = useState<TIndexState>(null);

	const [sortOrder, setSortOrder] = useState<SortOrderStateValue>(SortOrderStateValue.asc);
	const [sortTargetOrder, setSortTargetOrder] = useState<SortOrderStateValue>(SortOrderStateValue.asc);
	const [baseUrl, setBaseUrl] = useState<string>();
	const { request } = handleLogout(baseUrl);
	const { resetTimer } = useLogoutTimer(request);

	const initialItems = [
		{ category: "Обучение ребенка", target: "210 000.00", sum: "200 000.00", status: "В процессе" },
		{ category: "Машина", target: "4 000 000.00", sum: "4 000 000.00", status: "Достигнута" },
		{ category: "Квартира", target: "10 000 000.00", sum: "100 000.00", status: "В процессе" },
		{ category: "Дом у моря", target: "1 000 000 000.00", sum: "1 000 000.00", status: "В процессе" },
		{ category: "Дача", target: "5 000 000.00", sum: "115 000.00", status: "В процессе" },
	];

	const [items, setItems] = useState(initialItems);
	const handleEditClick = ({ index, field, value }: IEditActionProps) => {
		setEditIndex(index);
		setEditField(field);
		setEditValue(value);
	};

	const handleSaveClick = () => {
		setEditIndex(null);
		setEditField(null);
	};

	const handleMoreClick = (index: number) => {
		setOpenMoreIndex(openMoreIndex === index ? null : index);
	};

	const handleSortBySum = () => {
		const sortedItems = [...items].sort((a, b) => {
			const sumA = parseFloat(a.sum.replace(/[^0-9.-]+/g, ""));
			const sumB = parseFloat(b.sum.replace(/[^0-9.-]+/g, ""));
			return sortOrder === SortOrderStateValue.asc ? sumA - sumB : sumB - sumA;
		});
		setItems(sortedItems);
		setSortOrder(sortOrder === SortOrderStateValue.asc ? SortOrderStateValue.desc : SortOrderStateValue.asc);
	};

	const handleSortByTarget = () => {
		const sortedItems = [...items].sort((a, b) => {
			const targetA = parseFloat(a.target.replace(/[^0-9.-]+/g, ""));
			const targetB = parseFloat(b.target.replace(/[^0-9.-]+/g, ""));
			return sortTargetOrder === SortOrderStateValue.asc ? targetA - targetB : targetB - targetA;
		});
		setItems(sortedItems);
		setSortTargetOrder(
			sortTargetOrder === SortOrderStateValue.asc ? SortOrderStateValue.desc : SortOrderStateValue.asc,
		);
	};

	useEffect(() => {
		setBaseUrl(getCorrectBaseUrl());
	}, []);

	useEffect(() => {
		resetTimer();
	}, [request, resetTimer]);

	function renderSavingsItemList() {
		return items.map((item, index) => {
			return (
				<li
					key={index}
					onMouseEnter={() => setHoveredIndex(index)}
					onMouseLeave={() => setHoveredIndex(null)}
					className={editIndex === index ? styles.activeEditItem : ""}>
					<div className={styles.wrapperListContentBlock__category}>
						<div className={styles.inputEditWrapper}>
							{editIndex === index && editField === SavingsFieldValues.category ? (
								<input
									className={styles.inputEdit}
									type={InputTypeList.Text}
									value={editValue}
									onChange={(e) => setEditValue(e.target.value)}
								/>
							) : (
								<p className={styles.inputEditWrapper__textCategory}>{item.category}</p>
							)}
							<div
								className={styles.editIcon}
								style={{
									display: hoveredIndex === index || editIndex === index ? "flex" : "none",
								}}
								onClick={() =>
									editIndex === index && editField === SavingsFieldValues.category
										? handleSaveClick()
										: handleEditClick({ index, field: SavingsFieldValues.category, value: item.category })
								}
								role="button">
								{editIndex === index && editField === SavingsFieldValues.category ? <CheckIcon /> : <EditIcon />}
							</div>
						</div>
					</div>

					<div className={styles.wrapperListContentBlock__target}>
						<div className={styles.inputEditWrapper}>
							<div
								className={styles.editIcon}
								style={{
									display: hoveredIndex === index || editIndex === index ? "flex" : "none",
								}}
								onClick={() =>
									editIndex === index && editField === SavingsFieldValues.target
										? handleSaveClick()
										: handleEditClick({ index, field: SavingsFieldValues.target, value: item.target })
								}
								role="button">
								{editIndex === index && editField === SavingsFieldValues.target ? <CheckIcon /> : <EditIcon />}
							</div>
							{editIndex === index && editField === SavingsFieldValues.target ? (
								<input
									className={`${styles.inputEdit} ${styles.inputEdit__target}`}
									type={InputTypeList.Text}
									value={editValue}
									onChange={(e) => setEditValue(e.target.value)}
								/>
							) : (
								<p className={styles.inputEditWrapper__textTarget}>{item.target}</p>
							)}
						</div>
					</div>

					<div className={styles.wrapperListContentBlock__sum}>
						<p>{item.sum}</p>
					</div>
					<div className={styles.wrapperListContentBlock__status}>
						<p>{item.status}</p>
					</div>
					<div
						className={styles.wrapperListContentBlock__actionElement}
						onClick={() => handleMoreClick(index)}
						role="button">
						<MoreIcon />
						{openMoreIndex === index && (
							<div className={styles.wrapperListContentMore}>
								<p className={styles.wrapperListContentMore__close}>Закрыть цель</p>
								<p>Вернуть средства на счет</p>
							</div>
						)}
					</div>
				</li>
			);
		});
	}

	const renderSavingsTransactions = (transactions: ISavingsTransaction[]) => {
		return transactions.map((savingsData, index) => (
			<li key={index}>
				<SavingsTransaction
					firstDate={savingsData.firstDate}
					secondDate={savingsData.secondDate}
					purpose={savingsData.purpose}
					sum={savingsData.sum}
				/>
			</li>
		));
	};

	return (
		<div className={styles.savingsPageWrap}>
			<div className={styles.savingsPageContainer}>
				<form className={styles.savingsFormContentWrapper}>
					<h1 className={styles.headerTitle}>Накопления</h1>
					<div className={styles.savingsFormContentWrapperChoice}>
						<div className={styles.savingsByDateContainer}>
							<div className={styles.totalAmountWrapper}>
								<p className={styles.totalAmountWrapper__savings}>Общая сумма накоплений </p>
								<p className={styles.totalAmountWrapper__sum}>4 112 500 ₽</p>
							</div>
							<div className={styles.dateSelectionWrapper}>
								<p className={styles.dateSelectionWrapper__description}>Выбор даты</p>
								<AppInput control={control} label={"Выбор даты"} type={InputTypeList.Date} name={"date"} />
							</div>
						</div>
						<div className={styles.savingsDetailsContainer}>
							<div className={styles.savingsDetailsContainer__category}>
								<CategorySelect
									name={"savings"}
									label={"Накопления"}
									options={[
										{ id: 1, name: "Обучение ребенка", is_income: false, is_outcome: true, is_deleted: false },
										{ id: 2, name: "Машина", is_income: false, is_outcome: true, is_deleted: false },
										{ id: 3, name: "Квартира", is_income: false, is_outcome: true, is_deleted: false },
										{ id: 4, name: "Отпуск 2024", is_income: false, is_outcome: true, is_deleted: false },
									]}
									placeholder="Выберите категорию"
									control={control}
									onAddCategory={() => undefined}
								/>
							</div>
							<div className={styles.savingsDetailsContainer__sum}>
								<AppInput
									control={control}
									label={"Сумма"}
									type={InputTypeList.Number}
									name={"number"}
									placeholder={"0.00 ₽"}
								/>
							</div>

							<AddButton onClick={() => resetTimer()} type={InputTypeList.Submit} />
						</div>
					</div>
					<div className={styles.savingsFormContentWrapperList}>
						<div className={styles.wrapperList__header}>
							<ul className={styles.wrapperListHeaderBlock}>
								<li className={styles.wrapperListHeaderBlock__category}>Категория</li>
								<li className={styles.wrapperListHeaderBlock__target}>
									<div className={styles.wrapperListHeaderBlock__targetPosition}>
										<p>Цель, ₽</p>
										<div onClick={handleSortByTarget} role="button">
											<SortIcon classNames={styles.sortIcon} />
										</div>
									</div>
								</li>
								<li className={styles.wrapperListHeaderBlock__sum}>
									<div className={styles.wrapperListHeaderBlock__sumPosition}>
										<p>Сумма, ₽</p>
										<div className={styles.sortIcon} onClick={handleSortBySum} role="button">
											<SortIcon />
										</div>
									</div>
								</li>
								<li className={styles.wrapperListHeaderBlock__status}>Статус</li>
							</ul>
						</div>
						<div className={styles.wrapperList__content}>
							<ul className={styles.wrapperListContentBlock}>{renderSavingsItemList()}</ul>
						</div>
					</div>
				</form>
				<div className={styles.savingsTransactionWrapper}>
					<h2 className={styles.savingsTransactionHeader}>Последние операции по накоплениям</h2>
					<ul className={styles.savingsTransaction}>
						{savingsTransactions && renderSavingsTransactions(savingsTransactions)}
					</ul>
				</div>
			</div>
		</div>
	);
}

export default Savings;

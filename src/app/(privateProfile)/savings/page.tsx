"use client";

import { Key, useState } from "react";
import { useForm } from "react-hook-form";

import { PlusIcon } from "../../../assets/script/expenses/PlusIcon";
import { EditIcon } from "../../../assets/script/expenses/EditIcon";
import { CheckIcon } from "../../../assets/script/savings/CheckIcon";
import { MoreIcon } from "../../../assets/script/savings/MoreIcon";
import { SortIcon } from "../../../assets/script/savings/SortIcon";

import SavingsTransaction from "../../../components/userProfileLayout/savingsTransaction/savingsTransaction";
import { savingsTransactions } from "../../../mocks/SavingsTransaction";

import AppInput from "../../../ui/appInput/AppInput";
import { InputTypeList } from "../../../helpers/Input";
import { ISavingsInputForm } from "../../../types/pages/Savings";
import { Select } from "../../../ui/select/Select";
import Button from "../../../ui/button/button";

import style from "./savings.module.scss";

function Savings() {
	const { control } = useForm<ISavingsInputForm>({
		defaultValues: {
			sum: "",
		},
		mode: "all",
		delayError: 200,
	});
	const [hoveredIndex, setHoveredIndex] = useState<number | null>(null);

	const [editField, setEditField] = useState<"category" | "target" | null>(null);
	const [editIndex, setEditIndex] = useState<number | null>(null);
	const [editValue, setEditValue] = useState<string>("");

	const [openMoreIndex, setOpenMoreIndex] = useState<number | null>(null);

	const [sortOrder, setSortOrder] = useState<"asc" | "desc">("asc");
	const [sortTargetOrder, setSortTargetOrder] = useState<"asc" | "desc">("asc");

	const initialItems = [
		{ category: "Обучение ребенка", target: "210 000.00", sum: "200 000.00", status: "В процессe" },
		{ category: "Машина", target: "4 000 000.00", sum: "4 000 000.00", status: "Достигнута" },
		{ category: "Квартира", target: "10 000 000.00", sum: "100 000.00", status: "В процессe" },
		{ category: "Дом у моря", target: "1 000 000 000.00", sum: "1 000 000.00", status: "В процессе" },
		{ category: "Дача", target: "5 000 000.00", sum: "115 000.00", status: "В процессе" },
	];

	const [items, setItems] = useState(initialItems);

	type TSavingsField = "category" | "target";

	interface IEditActionProps {
		index: number;
		field: TSavingsField;
		value: string;
	}

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
			return sortOrder === "asc" ? sumA - sumB : sumB - sumA;
		});
		setItems(sortedItems);
		setSortOrder(sortOrder === "asc" ? "desc" : "asc");
	};

	const handleSortByTarget = () => {
		const sortedItems = [...items].sort((a, b) => {
			const targetA = a.target.replace(/[^0-9.-]+/g, "");
			const targetB = b.target.replace(/[^0-9.-]+/g, "");
			return sortTargetOrder === "asc"
				? parseFloat(targetA) - parseFloat(targetB)
				: parseFloat(targetB) - parseFloat(targetA);
		});
		setItems(sortedItems);
		setSortTargetOrder(sortTargetOrder === "asc" ? "desc" : "asc");
	};

	return (
		<div className={style.savingsPageWrap}>
			<div className={style.savingsPageContainer}>
				<form className={style.savingsFormContentWrapper}>
					<h1 className={style.headerTitle}>Накопления</h1>
					<div className={style.savingsFormContentWrapperChoice}>
						<div className={style.savingsByDateConteiner}>
							<div className={style.totalAmountWrapper}>
								<p className={style.totalAmountWrapper__savings}>Общая сумма накоплений </p>
								<p className={style.totalAmountWrapper__sum}>4 112 500 ₽</p>
							</div>
							<div className={style.dateSelectionWrapper}>
								<p className={style.dateSelectionWrapper__description}>Выбор даты</p>
								<AppInput control={control} label={"Выбор даты"} type={InputTypeList.Date} name={"date"} />
							</div>
						</div>
						<div className={style.savingsDetailsContainer}>
							<div className={style.savingsDetailsContainer__category}>
								<Select
									name={"expenses"}
									label={"Накопления"}
									options={["Обучение ребенка", "Машина", "Квартира", "Отпуск 2024"]}
								/>
							</div>
							<div className={style.savingsDetailsContainer__sum}>
								<AppInput
									control={control}
									label={"Сумма"}
									type={InputTypeList.Number}
									name={"number"}
									placeholder={"0.00 ₽"}
								/>
							</div>

							<Button content={"Добавить"} styleName={"buttonForSavings__disabled"}>
								<PlusIcon classNames={style.addButtonIcon} />
							</Button>
						</div>
					</div>
					<div className={style.savingsFormContentWrapperList}>
						<div className={style.wrapperList__header}>
							<ul className={style.wrapperListHeaderBlock}>
								<li className={style.wrapperListHeaderBlock__category}>Категория</li>
								<li className={style.wrapperListHeaderBlock__target}>
									<div className={style.wrapperListHeaderBlock__targetPosition}>
										<p>Цель, ₽</p>
										<div onClick={handleSortByTarget} role="button">
											<SortIcon classNames={style.sortIcon} />
										</div>
									</div>
								</li>
								<li className={style.wrapperListHeaderBlock__sum}>
									<div className={style.wrapperListHeaderBlock__sumPosition}>
										<p>Сумма, ₽</p>
										<div className={style.sortIcon} onClick={handleSortBySum} role="button">
											<SortIcon />
										</div>
									</div>
								</li>
								<li className={style.wrapperListHeaderBlock__status}>Статус</li>
							</ul>
						</div>
						<div className={style.wrapperList__content}>
							<ul className={style.wrapperListContentBlock}>
								{items.map((item, index) => (
									<li
										key={index}
										onMouseEnter={() => setHoveredIndex(index)}
										onMouseLeave={() => setHoveredIndex(null)}
										className={editIndex === index ? style.activeEditItem : ""}>
										<div className={style.wrapperListContentBlock__category}>
											<div className={style.inputEditWrapper}>
												{editIndex === index && editField === "category" ? (
													<input
														className={style.inputEdit}
														type="text"
														value={editValue}
														onChange={(e) => setEditValue(e.target.value)}
													/>
												) : (
													<p className={style.inputEditWrapper__textCategory}>{item.category}</p>
												)}
												<div
													className={style.editIcon}
													style={{
														display: hoveredIndex === index || editIndex === index ? "flex" : "none",
													}}
													onClick={() =>
														editIndex === index && editField === "category"
															? handleSaveClick()
															: handleEditClick({ index, field: "category", value: item.category })
													}
													role="button">
													{editIndex === index && editField === "category" ? <CheckIcon /> : <EditIcon />}
												</div>
											</div>
										</div>

										<div className={style.wrapperListContentBlock__target}>
											<div className={style.inputEditWrapper}>
												<div
													className={style.editIcon}
													style={{
														display: hoveredIndex === index || editIndex === index ? "flex" : "none",
													}}
													onClick={() =>
														editIndex === index && editField === "target"
															? handleSaveClick()
															: handleEditClick({ index, field: "target", value: item.target })
													}
													role="button">
													{editIndex === index && editField === "target" ? <CheckIcon /> : <EditIcon />}
												</div>
												{editIndex === index && editField === "target" ? (
													<input
														className={`${style.inputEdit} ${style.inputEdit__target}`}
														type="text"
														value={editValue}
														onChange={(e) => setEditValue(e.target.value)}
													/>
												) : (
													<p className={style.inputEditWrapper__textTarget}>{item.target}</p>
												)}
											</div>
										</div>

										<div className={style.wrapperListContentBlock__sum}>
											<p>{item.sum}</p>
										</div>
										<div className={style.wrapperListContentBlock__status}>
											<p>{item.status}</p>
										</div>
										<div
											className={style.wrapperListContentBlock__actionElement}
											onClick={() => handleMoreClick(index)}
											role="button">
											<MoreIcon />
											{openMoreIndex === index && (
												<div className={style.wrapperListContentMore}>
													<p className={style.wrapperListContentMore__close}>Закрыть цель</p>
													<p>Вернуть средства на счет</p>
												</div>
											)}
										</div>
									</li>
								))}
							</ul>
						</div>
					</div>
				</form>
				<div className={style.savingsTransactionWrapper}>
					<h2 className={style.savingsTransactionHeader}>Последние операции по накоплениям</h2>
					<ul className={style.savingsTransaction}>
						{savingsTransactions &&
							savingsTransactions.map((savingsData, index: Key) => (
								<li key={index}>
									<SavingsTransaction
										firstDate={savingsData.firstDate}
										secondDate={savingsData.secondDate}
										purpose={savingsData.purpose}
										sum={savingsData.sum}
									/>
								</li>
							))}
					</ul>
				</div>
			</div>
		</div>
	);
}

export default Savings;

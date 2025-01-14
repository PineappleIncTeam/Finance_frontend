"use client";

import { Key, useState } from "react";
import { useForm } from "react-hook-form";

import { PlusIcon } from "../../../assets/script/expenses/PlusIcon";
import { EditIcon } from "../../../assets/script/expenses/EditIcon";

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
	const [editIndex, setEditIndex] = useState<number | null>(null);
	const [editValue, setEditValue] = useState<string>("");

	const items = [
		{ category: "Обучение ребенка", target: "210 000.00", sum: "200 000.00", status: "В процессe" },
		{ category: "Машина", target: "4 000 000.00", sum: "4 000 000.00", status: "Достигнута" },
		{ category: "Квартира", target: "10 000 000.00", sum: "100 000.00", status: "В процессе" },
		{ category: "Отпуск 2024", target: "300 000.00", sum: "10 000.00", status: "В процессе" },
	];

	const handleEditClick = (index: number, target: string) => {
		setEditIndex(index);
		setEditValue(target);
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

							{/* styleName у Btn заменить?! */}

							<Button content={"Добавить"} styleName={"buttonForIncome__disabled"}>
								<PlusIcon classNames={style.addButtonIcon} />
							</Button>
						</div>
					</div>
					<div className={style.savingsFormContentWrapperList}>
						<div className={style.wrapperList__header}>
							<ul className={style.wrapperListHeaderBlock}>
								<li className={style.wrapperListHeaderBlock__category}>Категория</li>
								<li className={style.wrapperListHeaderBlock__target}>Цель, ₽</li>
								<li className={style.wrapperListHeaderBlock__sum}>Сумма, ₽</li>
								<li className={style.wrapperListHeaderBlock__status}>Статус</li>
							</ul>
						</div>
						<div className={style.wrapperList__content}>
							<ul className={style.wrapperListContentBlock}>
								{items.map((item, index) => (
									<li
										key={index}
										onMouseEnter={() => setHoveredIndex(index)}
										onMouseLeave={() => setHoveredIndex(null)}>
										<div className={style.wrapperListContentBlock__category}>
											<p>{item.category}</p>
										</div>
										<div className={style.wrapperListContentBlock__target}>
											<div className={style.editIcon} style={{ display: hoveredIndex === index ? "block" : "none" }} onClick={() => handleEditClick(index, item.target)}>
												<EditIcon  />
											</div>
											{editIndex === index ? (
												<input className={style.inputEdit}
													type="text"
													value={editValue}
													onChange={(e) => setEditValue(e.target.value)}
													
												/>
											) : (
												<p>{item.target}</p>
											)}
										</div>
										<div className={style.wrapperListContentBlock__sum}>
											<p>{item.sum}</p>
										</div>
										<div className={style.wrapperListContentBlock__status}>
											<p>{item.status}</p>
										</div>
										<div className={style.wrapperListContentBlock__btn}>3</div>
									</li>
								))}
							</ul>
						</div>
					</div>
				</form>
				<div className={style.savingsTransactionWrapper}>
					<h1 className={style.savingsTransactionHeader}>Последние операции по накоплениям</h1>
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

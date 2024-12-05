"use client";

import { Key } from "react";
import { useForm } from "react-hook-form";

import { PlusIcon } from "../../../assets/script/expenses/PlusIcon";

import ExpensesTransaction from "../../../components/userProfileLayout/expensesTransaction/expensesTransaction";
import { expensesTransactions } from "../../../mocks/ExpensesTransaction";

import Input from "../../../ui/input/Input";
import { InputType } from "../../../helpers/Input";
import { IExpensesInputForm } from "../../../types/pages/Expenses";
import { Select } from "../../../ui/select/Select";
import Button from "../../../ui/button/button";

import style from "./expenses.module.scss";

export default function Expenses() {
	const { control } = useForm<IExpensesInputForm | any>({
		defaultValues: {
			sum: "",
		},
		mode: "all",
		delayError: 200,
	});

	return (
		<div className={style.expensesPageWrap}>
			<div className={style.expensesPageContainer}>
				<form className={style.expensesFormContentWrapper}>
					<h1 className={style.headerTitle}>Расходы</h1>
					<div className={style.expensesByDateContainer}>
						<div className={style.totalMonthlyWrapper}>
							<p className={style.totalMonthlyWrapper__month}>Общий расход за Январь</p>
							<p className={style.totalMonthlyWrapper__sum}>283 000 ₽</p>
						</div>
						<div className={style.dateSelectionWrapper}>
							<p className={style.dateSelectionWrapper__description}>Выбор даты</p>
							<Input control={control} label={"Выбор даты"} type={InputType.Date} name={"date"} />
						</div>
					</div>
					<div className={style.expensesDetailsContainer}>
						<div className={style.expensesDetailsContainer__category}>
							<Select name={"expenses"} label={"Постоянные"} options={["Продукты", "Зарплата"]} />
						</div>
						<div className={style.expensesDetailsContainer__sum}>
							<Input control={control} label={"Сумма"} type={InputType.Number} name={"number"} placeholder={"0.00 ₽"} />
						</div>
						<Button content={"Добавить"} styleName={"buttonForExpenses"}>
							<PlusIcon classNames={style.addButtonIcon} />
						</Button>
					</div>
					<div className={style.expensesDetailsContainer}>
						<div className={style.expensesDetailsContainer__category}>
							<Select name={"expenses"} label={"Временные"} options={[""]} />
						</div>
						<div className={style.expensesDetailsContainer__sum}>
							<Input control={control} label={"Сумма"} type={InputType.Number} name={"number"} placeholder="0.00 ₽" />
						</div>
						<Button content={"Добавить"} styleName={"buttonForExpenses__disabled"}>
							<PlusIcon classNames={style.addButtonIcon} />
						</Button>
					</div>
				</form>
				<div className={style.expensesTransactionsWrapper}>
					<h1 className={style.expensesTransactionHeader}>Последние операции по расходам</h1>
					{expensesTransactions &&
						expensesTransactions.map((expensesData, index: Key) => (
							<li key={index}>
								<ExpensesTransaction
									firstDate={expensesData.firstDate}
									secondDate={expensesData.secondDate}
									purpose={expensesData.purpose}
									sum={expensesData.sum}
								/>
							</li>
						))}
				</div>
			</div>
		</div>
	);
}

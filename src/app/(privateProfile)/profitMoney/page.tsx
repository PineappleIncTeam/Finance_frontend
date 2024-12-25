"use client";

import { Key } from "react";
import { useForm } from "react-hook-form";

import { IExpensesInputForm } from "../../../types/pages/Expenses";
import { Select } from "../../../ui/select/Select";
import AppInput from "../../../ui/appInput/AppInput";
import Button from "../../../ui/button/button";

import IncomeTransaction from "../../../components/userProfileLayout/incomeTranstaction/incomeTransaction";
import { formatMoney } from "../../../utils/formatData";
import { incomeTransactions } from "../../../mocks/IncomeTransaction";

import { PlusIcon } from "../../../assets/script/expenses/PlusIcon";

import style from "./profitMoney.module.scss";

function ProfitMoney() {
	const { control } = useForm<IExpensesInputForm>({
		defaultValues: {
			sum: "",
		},
		mode: "all",
		delayError: 200,
	});

	const incomeMoney = 200000;
	return (
		<div className={style.pageWrap}>
			<div className={style.pageContainer}>
				<form className={style.formContentWrapper}>
					<div className={style.container}>
						<h1 className={style.headerTitle}>Доходы</h1>
						<div className={style.byDateContainer}>
							<div className={style.totalMonthlyWrapper}>
								<p className={style.totalMonthlyWrapper__month}>Общий доход за Январь</p>
								<p className={style.totalMonthlyWrapper__sum}>{formatMoney(incomeMoney, 0)}</p>
							</div>
							<div className={style.dateSelectionWrapper}>
								<p className={style.dateSelectionWrapper__description}>Выбор даты</p>
								<AppInput control={control} label={"Выбор даты"} type="date" name={"date"} />
							</div>
						</div>
						<div className={style.detailsContainers}>
							<div className={style.detailsContainer}>
								<div className={style.detailsContainer__category}>
									<Select name={"expenses"} label={"Категория"} options={["Продукты", "Зарплата"]} />
								</div>
								<div className={style.detailsContainer__rightSide}>
									<div className={style.detailsContainer__sum}>
										<AppInput control={control} label={"Сумма"} type="number" name={"number"} placeholder="0.00 ₽" />
									</div>
									<Button content={"Добавить"} styleName={"buttonForIncome__disabled"}>
										<PlusIcon classNames={style.addButtonIcon} />
									</Button>
								</div>
							</div>
							<div className={style.detailsContainer}>
								<div className={style.detailsContainer__category}>
									<Select name={"expenses"} label={"Временные"} options={[""]} />
								</div>
								<div className={style.detailsContainer__rightSide}>
									<div className={style.detailsContainer__sum}>
										<AppInput control={control} label={"Сумма"} type="number" name={"number"} placeholder="0.00 ₽" />
									</div>
									<Button content={"Добавить"} styleName={"buttonForIncome__disabled"}>
										<PlusIcon classNames={style.addButtonIcon} />
									</Button>
								</div>
							</div>
						</div>
					</div>
				</form>
				<div className={style.transactionsWrapper}>
					<h1 className={style.transactionHeader}>Последние операции по расходам</h1>
					<div className={style.transactions}>
						{incomeTransactions &&
							incomeTransactions.map((incomeDate, index: Key) => (
								<li key={index}>
									<IncomeTransaction date={incomeDate.date} purpose={incomeDate.purpose} sum={incomeDate.sum} />
								</li>
							))}
					</div>
				</div>
			</div>
		</div>
	);
}

export default ProfitMoney;

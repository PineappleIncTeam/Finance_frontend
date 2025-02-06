"use client";

import { Key, useEffect, useState } from "react";
import { useForm } from "react-hook-form";

import useLogoutTimer from "../../../hooks/useLogoutTimer";

import { IExpensesInputForm } from "../../../types/pages/Expenses";
import { Select } from "../../../ui/select/Select";
import AppInput from "../../../ui/appInput/AppInput";
import Button from "../../../ui/button/button";
import IncomeTransaction from "../../../components/userProfileLayout/incomeTransaction/incomeTransaction";
import { InputTypeList } from "../../../helpers/Input";
import handleLogout from "../../../helpers/logout";
import { formatMoney } from "../../../utils/formatData";
import { getCorrectBaseUrl } from "../../../utils/baseUrlConverter";
import { incomeTransactions } from "../../../mocks/IncomeTransaction";
import {CategorySelect} from "../../../components/userProfileLayout/categorySelect/CategorySelect"

import { PlusIcon } from "../../../assets/script/expenses/PlusIcon";

import styles from "./profitMoney.module.scss";

function ProfitMoney() {
	const [baseUrl, setBaseUrl] = useState<string>();
	const { request } = handleLogout(baseUrl);
	const { resetTimer } = useLogoutTimer(request);
	const { control } = useForm<IExpensesInputForm>({
		defaultValues: {
			sum: "",
		},
		mode: "all",
		delayError: 200,
	});

	const incomeMoney = 200000;

	useEffect(() => {
		setBaseUrl(getCorrectBaseUrl());
	}, []);

	useEffect(() => {
		resetTimer();
	}, [request, resetTimer]);

	return (
		<div className={styles.profitMoneyPageWrap}>
			<div className={styles.profitMoneyPageContainer}>
				<form className={styles.formContentWrapper}>
					<div className={styles.formContentContainer}>
						<h1 className={styles.headerTitle}>Доходы</h1>
						<div className={styles.byDateContainer}>
							<div className={styles.totalMonthlyWrapper}>
								<p className={styles.totalMonthlyWrapper__month}>Общий доход за Январь</p>
								<p className={styles.totalMonthlyWrapper__sum}>{formatMoney(incomeMoney, 0)}</p>
							</div>
							<div className={styles.dateSelectionWrapper}>
								<p className={styles.dateSelectionWrapper__description}>Выбор даты</p>
								<AppInput control={control} label={"Выбор даты"} type={InputTypeList.Date} name={"date"} />
							</div>
						</div>
						<div className={styles.detailsContainers}>
							<div className={styles.detailsContainer}>
								<div className={styles.detailsContainer__category}>
									<Select name={"expenses"} label={"Категория"} options={["Продукты", "Зарплата"]} />
								</div>
								<div className={styles.detailsContainer__rightSide}>
									<div className={styles.detailsContainer__sum}>
										<AppInput
											control={control}
											label={"Сумма"}
											type={InputTypeList.Number}
											name={"number"}
											placeholder="0.00 ₽"
										/>
									</div>
									<Button content={"Добавить"} styleName={"buttonForIncome__disabled"}>
										<PlusIcon classNames={styles.addButtonIcon} />
									</Button>
								</div>
							</div>
							<div className={styles.detailsContainer}>
								<div className={styles.detailsContainer__category}>
									<CategorySelect name={"expenses"} label={"Временные"} options={[""]} />
								</div>
								<div className={styles.detailsContainer__rightSide}>
									<div className={styles.detailsContainer__sum}>
										<AppInput
											control={control}
											label={"Сумма"}
											type={InputTypeList.Number}
											name={"number"}
											placeholder="0.00 ₽"
										/>
									</div>
									<Button content={"Добавить"} styleName={"buttonForIncome__disabled"}>
										<PlusIcon classNames={styles.addButtonIcon} />
									</Button>
								</div>
							</div>
						</div>
					</div>
				</form>
				<div className={styles.transactionsWrapper}>
					<h1 className={styles.transactionHeader}>Последние операции по расходам</h1>
					<div className={styles.transactions}>
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

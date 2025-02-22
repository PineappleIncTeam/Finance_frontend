"use client";

import { Key, useEffect, useState } from "react";
import { useForm } from "react-hook-form";

import { PlusIcon } from "../../../assets/script/expenses/PlusIcon";

import ExpensesTransaction from "../../../components/userProfileLayout/expensesTransaction/expensesTransaction";
import { expensesTransactions } from "../../../mocks/ExpensesTransaction";

import AppInput from "../../../ui/appInput/AppInput";
import { InputTypeList } from "../../../helpers/Input";
import { IExpensesInputForm } from "../../../types/pages/Expenses";
import { Select } from "../../../ui/select/Select";
import Button from "../../../ui/button/button";
import InputDate from "../../../ui/inputDate/inputDate";
import handleLogout from "../../../helpers/logout";
import { getCorrectBaseUrl } from "../../../utils/baseUrlConverter";
import useLogoutTimer from "../../../hooks/useLogoutTimer";

import styles from "./expenses.module.scss";

export default function Expenses() {
	const [baseUrl, setBaseUrl] = useState<string>();
	const { control } = useForm<IExpensesInputForm>({
		defaultValues: {
			sum: "",
		},
		mode: "all",
		delayError: 200,
	});

	useEffect(() => {
		setBaseUrl(getCorrectBaseUrl());
	}, []);

	const { request } = handleLogout(baseUrl);
	const { resetTimer } = useLogoutTimer(request);

	useEffect(() => {
		resetTimer();
	}, [request, resetTimer]);

	return (
		<div className={styles.expensesPageWrap}>
			<div className={styles.expensesPageContainer}>
				<form className={styles.expensesFormContentWrapper}>
					<h1 className={styles.headerTitle}>Расходы</h1>
					<div className={styles.expensesByDateContainer}>
						<div className={styles.totalMonthlyWrapper}>
							<p className={styles.totalMonthlyWrapper__month}>Общий расход за Январь</p>
							<p className={styles.totalMonthlyWrapper__sum}>283 000 ₽</p>
						</div>
						<div className={styles.dateSelectionWrapper}>
							<p className={styles.dateSelectionWrapper__description}>Выбор даты</p>
							<InputDate control={control} name={"date"} />
						</div>
					</div>
					<div className={styles.expensesDetailsContainer}>
						<div className={styles.expensesDetailsContainer__category}>
							<Select name={"expenses"} label={"Постоянные"} options={["Продукты", "Зарплата"]} />
						</div>
						<div className={styles.expensesDetailsContainer__sum}>
							<AppInput
								control={control}
								label={"Сумма"}
								type={InputTypeList.Number}
								name={"number"}
								placeholder={"0.00 ₽"}
							/>
						</div>
						<Button onClick={() => resetTimer()} content={"Добавить"} styleName={"buttonForExpenses"}>
							<PlusIcon classNames={styles.addButtonIcon} />
						</Button>
					</div>
					<div className={styles.expensesDetailsContainer}>
						<div className={styles.expensesDetailsContainer__category}>
							<Select name={"expenses"} label={"Временные"} options={[""]} />
						</div>
						<div className={styles.expensesDetailsContainer__sum}>
							<AppInput
								control={control}
								label={"Сумма"}
								type={InputTypeList.Number}
								name={"number"}
								placeholder="0.00 ₽"
							/>
						</div>
						<Button content={"Добавить"} styleName={"buttonForExpenses__disabled"}>
							<PlusIcon classNames={styles.addButtonIcon} />
						</Button>
					</div>
				</form>
				<div className={styles.expensesTransactionsWrapper}>
					<h1 className={styles.expensesTransactionHeader}>Последние операции по расходам</h1>
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

/* eslint-disable camelcase */
"use client";

import { Key, useEffect, useState } from "react";
import { useForm } from "react-hook-form";

import ExpensesTransaction from "../../../components/userProfileLayout/expensesTransaction/expensesTransaction";
import { expensesTransactions } from "../../../mocks/ExpensesTransaction";

import AppInput from "../../../ui/appInput/AppInput";
import { InputTypeList } from "../../../helpers/Input";
import { IExpensesInputForm, IExpensesSelectForm } from "../../../types/pages/Expenses";
import { Select } from "../../../ui/select/Select";

import InputDate from "../../../ui/inputDate/inputDate";
import handleLogout from "../../../helpers/logout";
import { getCorrectBaseUrl } from "../../../utils/baseUrlConverter";
import useLogoutTimer from "../../../hooks/useLogoutTimer";
import { CategorySelect } from "../../../components/userProfileLayout/categorySelect/CategorySelect";

import AddButton from "../../../components/userProfileLayout/addButton/addButton";

import styles from "./expenses.module.scss";

export default function Expenses() {
	const [baseUrl, setBaseUrl] = useState<string>();
	const { control } = useForm<IExpensesInputForm & IExpensesSelectForm>({
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
							<CategorySelect
								name={"expenses"}
								label={"Постоянные"}
								options={[
									{ id: 1, name: "Продукты", is_income: false, is_outcome: true, is_deleted: false },
									{ id: 2, name: "Зарплата", is_income: true, is_outcome: false, is_deleted: false },
								]}
								control={control}
								onAddCategory={() => undefined}
							/>
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
						<AddButton onClick={() => resetTimer()} type={InputTypeList.Submit} />
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
						<AddButton onClick={() => resetTimer()} type={InputTypeList.Submit}>
							Добавить
						</AddButton>
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

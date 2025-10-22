/* eslint-disable camelcase */
"use client";

import { Key, useEffect } from "react";
import { useForm } from "react-hook-form";
import { env } from "next-runtime-env";

import { useLogoutTimer } from "../../../hooks/useLogoutTimer";

import { IExpensesInputForm, IExpensesSelectForm } from "../../../types/pages/Expenses";
import { Select } from "../../../ui/select/Select";
import AppInput from "../../../ui/appInput/AppInput";
import IncomeTransaction from "../../../components/userProfileLayout/incomeTransaction/incomeTransaction";
import { InputTypeList } from "../../../helpers/Input";
import { useHandleLogout } from "../../../hooks/useHandleLogout";
import { formatMoney } from "../../../utils/formatData";

import { incomeTransactions } from "../../../mocks/IncomeTransaction";
import { CategorySelect } from "../../../components/userProfileLayout/categorySelect/CategorySelect";

import InputDate from "../../../ui/inputDate/inputDate";
import AddButton from "../../../components/userProfileLayout/addButton/addButton";
import { TimerInactivityLogoutModal } from "../../../components/userProfileLayout/timerLogout/timerInactivityLogout";

import styles from "./profitMoney.module.scss";

function ProfitMoney() {
	const { control } = useForm<IExpensesInputForm & IExpensesSelectForm>({
		defaultValues: {
			sum: "",
		},
		mode: "all",
		delayError: 200,
	});

	const baseUrl = String(env("NEXT_PUBLIC_BASE_URL") ?? "");

	const { request } = useHandleLogout(baseUrl);
	const { resetTimer } = useLogoutTimer(request);

	const incomeMoney = 200000;

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
								<InputDate control={control} name={"date"} />
							</div>
						</div>
						<div className={styles.detailsContainers}>
							<div className={styles.detailsContainer}>
								<div className={styles.detailsContainer__category}>
									<CategorySelect
										name={"expenses"}
										label={"Категория"}
										options={[
											{ id: 1, name: "Продукты", is_income: false, is_outcome: true, is_deleted: false },
											{ id: 2, name: "Зарплата", is_income: true, is_outcome: false, is_deleted: false },
										]}
										placeholder="Выберите категорию"
										control={control}
										onAddCategory={() => undefined}
									/>
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
									<AddButton onClick={() => resetTimer()} type={InputTypeList.Submit} />
								</div>
							</div>
							<div className={styles.detailsContainer}>
								<div className={styles.detailsContainer__category}>
									<Select name={"expenses"} label={"Временные"} options={[""]} />
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
									<AddButton onClick={() => resetTimer()} type={InputTypeList.Submit} />
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
				<TimerInactivityLogoutModal requestLogout={request} resetTimer={resetTimer} durationInMinutes={14} />
			</div>
		</div>
	);
}

export default ProfitMoney;

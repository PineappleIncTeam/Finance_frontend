/* eslint-disable camelcase */
"use client";

import { Key, useEffect, useState } from "react";
import { useForm } from "react-hook-form";
import axios from "axios";

import handleLogout from "../../../helpers/logout";

import ExpensesTransaction from "../../../components/userProfileLayout/expensesTransaction/expensesTransaction";

import { InputTypeList } from "../../../helpers/Input";

import { IExpensesInputForm, IExpensesSelectForm } from "../../../types/pages/Expenses";

import InputDate from "../../../ui/inputDate/inputDate";
import { Select } from "../../../ui/select/Select";
import { getCorrectBaseUrl } from "../../../utils/baseUrlConverter";

import { ApiResponseCode } from "../../../helpers/apiResponseCode";
import { GetFiveOperations } from "../../../services/api/userProfile/GetFiveOperations";

import useLogoutTimer from "../../../hooks/useLogoutTimer";
import { CategorySelect } from "../../../components/userProfileLayout/categorySelect/CategorySelect";

import AddButton from "../../../components/userProfileLayout/addButton/addButton";

import AppInput from "../../../ui/appInput/AppInput";

import { CategoryAddModal } from "../../../components/userProfileLayout/categoryAdd/categoryAddModal";

import styles from "./expenses.module.scss";

export default function Expenses() {
	const [baseUrl, setBaseUrl] = useState<string>();
	// const [isOpen, setIsOpen] = useState<boolean>(false);

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

	const expensesTransactions = [];

	const GetOperations = async () => {
		try {
			if (baseUrl) {
				const response = await GetFiveOperations(baseUrl);
				if (response.status === axios.HttpStatusCode.Ok) {
					console.log(response);
					return response;
				}
			}
		} catch (error) {
			if (
				axios.isAxiosError(error) &&
				error.response &&
				error.response.status &&
				error.response.status >= axios.HttpStatusCode.BadRequest &&
				error.response.status <= axios.HttpStatusCode.InternalServerError
			) {
				console.log(error);
				return null;
			}
			if (
				axios.isAxiosError(error) &&
				error.response &&
				error.response.status &&
				error.response.status >= axios.HttpStatusCode.InternalServerError &&
				error.response.status < ApiResponseCode.SERVER_ERROR_STATUS_MAX
			) {
				console.log(error);
				return null;
			}
		}
	};

	useEffect(() => {
		expensesTransactions.push(GetOperations() ?? []);
	}, [GetOperations, expensesTransactions]);

	// const onAddCategoryClick = () => {
	// 	setIsOpen(true);
	// };

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
								placeholder={"0.00"}
							/>
						</div>
						<AddButton onClick={() => resetTimer()} type="submit" />
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
								placeholder="0.00"
							/>
						</div>
						<AddButton onClick={() => resetTimer()} type="submit">
							Добавить
						</AddButton>
					</div>
				</form>
				{/* {isOpen && <CategoryAddModal open={isOpen}/>} */}
				{<CategoryAddModal open={true} />}
				<div className={styles.expensesTransactionsWrapper}>
					<h1 className={styles.expensesTransactionHeader}>Последние операции по расходам</h1>
					{expensesTransactions &&
						expensesTransactions.map((expensesData, index: Key) => (
							<li key={index}>
								<ExpensesTransaction
									firstDate={expensesData.date}
									// secondDate={expensesData.secondDate}
									purpose={expensesData?.target}
									sum={expensesData.amount}
								/>
							</li>
						))}
				</div>
			</div>
		</div>
	);
}

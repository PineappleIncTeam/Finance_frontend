"use client";

import { useRouter } from "next/navigation";
import { Key, useEffect, useState } from "react";
import { useForm } from "react-hook-form";
import axios, { AxiosResponse } from "axios";

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

import { IAddCategoryExpensesForm, IExpenseTransaction } from "../../../types/components/ComponentsTypes";

import { AddExpensesCategory } from "../../../services/api/userProfile/AddExpensesCategory";
import { CategoryAddSuccessModal } from "../../../components/userProfileLayout/categoryAddSuccess/categoryAddSuccess";

import { MainPath } from "../../../services/router/routes";

import { GetCategoryOptions } from "../../../services/api/userProfile/GetCategoryOptions";

import { IOptionsResponse } from "../../../types/api/Expenses";

import styles from "./expenses.module.scss";

export default function Expenses() {
	const [baseUrl, setBaseUrl] = useState<string>();
	const [isResponseSuccess, setIsResponseSuccess] = useState<boolean>(false);
	const [isOpen, setIsOpen] = useState<boolean>(false);
	const [options, setOptions] = useState<string[] | any>([]);

	const { control } = useForm<IExpensesInputForm & IExpensesSelectForm>({
		defaultValues: {
			sum: "",
		},
		mode: "all",
		delayError: 200,
	});

	const router = useRouter();

	useEffect(() => {
		setBaseUrl(getCorrectBaseUrl());
	}, []);

	const { request } = handleLogout(baseUrl);
	const { resetTimer } = useLogoutTimer(request);

	useEffect(() => {
		resetTimer();
	}, [request, resetTimer]);

	const expensesTransactions: string[] | IExpenseTransaction | any = [];

	const getOperations = async () => {
		try {
			if (baseUrl) {
				const response = await GetFiveOperations(baseUrl);
				if (response !== null && response.status === axios.HttpStatusCode.Ok) {
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
				return expensesTransactions;
			}
			if (
				axios.isAxiosError(error) &&
				error.response &&
				error.response.status &&
				error.response.status >= axios.HttpStatusCode.InternalServerError &&
				error.response.status < ApiResponseCode.SERVER_ERROR_STATUS_MAX
			) {
				return expensesTransactions;
			}
		}
	};

	const addCategory = async (data: IAddCategoryExpensesForm) => {
		try {
			if (baseUrl && data !== null) {
				const response = await AddExpensesCategory(baseUrl, data);

				if (response.status === axios.HttpStatusCode.Ok) {
					setIsOpen(false);
					setIsResponseSuccess(true);
				}
			}
		} catch (error) {
			if (
				axios.isAxiosError(error) &&
				error.response &&
				error.response.status &&
				error.response.status === axios.HttpStatusCode.Conflict
			) {
				("Не верные данные");
			}
			if (
				axios.isAxiosError(error) &&
				error.response &&
				error.response.status &&
				error.response.status >= axios.HttpStatusCode.InternalServerError &&
				error.response.status < ApiResponseCode.SERVER_ERROR_STATUS_MAX
			) {
				router.push(MainPath.ServerError);
			}
		}
	};

	useEffect(() => {
		const getCategoryOptions = async () => {
			try {
				if (baseUrl) {
					const response: AxiosResponse<IOptionsResponse> = await GetCategoryOptions(baseUrl);
					if (response !== null && response.status === axios.HttpStatusCode.Ok) {
						setOptions(response);
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
				}
				if (
					axios.isAxiosError(error) &&
					error.response &&
					error.response.status &&
					error.response.status >= axios.HttpStatusCode.InternalServerError &&
					error.response.status < ApiResponseCode.SERVER_ERROR_STATUS_MAX
				) {
					console.log(error);
				}
			}
		};
		getCategoryOptions();
	}, [baseUrl]);

	useEffect(() => {
		if (expensesTransactions !== null) {
			expensesTransactions.push(getOperations());
		}
	}, [getOperations, expensesTransactions]);

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
								options={options ?? []}
								control={control}
								onAddCategory={() => setIsOpen(true)}
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
				{isOpen && <CategoryAddModal open={isOpen} onCancelClick={() => setIsOpen(false)} request={addCategory} />}
				{isResponseSuccess && <CategoryAddSuccessModal open={isResponseSuccess} />}
				<div className={styles.expensesTransactionsWrapper}>
					<h1 className={styles.expensesTransactionHeader}>Последние операции по расходам</h1>
					{expensesTransactions &&
						expensesTransactions.map((expensesData: IExpenseTransaction, index: Key) => (
							<li key={index}>
								<ExpensesTransaction
									date={expensesData?.date}
									// secondDate={expensesData.secondDate}
									target={expensesData?.target}
									amount={expensesData?.amount}
								/>
							</li>
						))}
				</div>
			</div>
		</div>
	);
}

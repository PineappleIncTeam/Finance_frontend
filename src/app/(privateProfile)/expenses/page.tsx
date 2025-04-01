"use client";

import { useRouter } from "next/navigation";
import { Key, useEffect, useState } from "react";
import { useForm } from "react-hook-form";
import axios, { AxiosResponse } from "axios";

import handleLogout from "../../../helpers/logout";

import ExpensesTransaction from "../../../components/userProfileLayout/expensesTransaction/expensesTransaction";

import { InputTypeList } from "../../../helpers/Input";

import { IExpensesAddCategoryTransactionForm, IExpensesCategoryForm } from "../../../types/pages/Expenses";

import InputDate from "../../../ui/inputDate/inputDate";

import { getCorrectBaseUrl } from "../../../utils/baseUrlConverter";

import { ApiResponseCode } from "../../../helpers/apiResponseCode";
import { GetFiveTransactions } from "../../../services/api/userProfile/GetFiveTransactions";

import useLogoutTimer from "../../../hooks/useLogoutTimer";
import { CategorySelect } from "../../../components/userProfileLayout/categorySelect/CategorySelect";

import AddButton from "../../../components/userProfileLayout/addButton/addButton";

import AppInput from "../../../ui/appInput/AppInput";

import { CategoryAddModal } from "../../../components/userProfileLayout/categoryAdd/categoryAddModal";

import { IAddCategoryExpensesForm, IExpenseTransaction } from "../../../types/components/ComponentsTypes";

import { AddExpensesCategory } from "../../../services/api/userProfile/AddExpensesCategory";
import { CategoryAddSuccessModal } from "../../../components/userProfileLayout/categoryAddSuccess/categoryAddSuccess";

import { MainPath } from "../../../services/router/routes";

import { GetCategoriesAll } from "../../../services/api/userProfile/GetCategoriesAll";

import { IOptionsResponse, ITransactionsResponse } from "../../../types/api/Expenses";

import { RemoveExpensesCategory } from "../../../services/api/userProfile/RemoveExpensesCategory";
import { CategoryDeleteSuccessModal } from "../../../components/userProfileLayout/categoryDeleteResponse/categoryDeleteSuccess/categoryDeleteSuccess";

import { AddExpensesCategoryTransaction } from "../../../services/api/userProfile/AddExpensesCategoryTransaction";

import { RemoveExpensesCategoryTransaction } from "../../../services/api/userProfile/RemoveExpensesTransaction";

import { RecordDeleteModal } from "../../../components/userProfileLayout/recordDelete/recordDelete";
import { SuccessDeleteModal } from "../../../components/userProfileLayout/recordDeleteResponse/successDelete/successDelete";

import styles from "./expenses.module.scss";

export default function Expenses() {
	const [baseUrl, setBaseUrl] = useState<string>();
	const [isAddSuccess, setIsAddSuccess] = useState<boolean>(false);
	const [isOpen, setIsOpen] = useState<boolean>(false);
	const [fiveOperations, setFiveOperations] = useState<string[] | any>([]);
	const [fiveOperationsNames, setFiveOperationsNames] = useState<string[] | any>([]);
	const [options, setOptions] = useState<string[] | any>([]);
	const [isDeleteSuccessCategory, setIsDeleteSuccessCategory] = useState<boolean>(false);
	const [isDeleteOperationApprove, setIsDeleteOperationApprove] = useState<boolean>(false);
	const [isDeleteOperationSuccess, setIsDeleteOperationSuccess] = useState<boolean>(false);
	const [isId, setIsId] = useState<string>("");

	const { control, handleSubmit } = useForm<IExpensesAddCategoryTransactionForm & IExpensesCategoryForm>({
		defaultValues: {
			amount: "",
			type: "outcome",
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

	useEffect(() => {
		const data = {
			// eslint-disable-next-line camelcase
			is_income: false,
			// eslint-disable-next-line camelcase
			is_outcome: true,
		};
		const getCategoryOptions = async () => {
			try {
				if (baseUrl) {
					const response: AxiosResponse<IOptionsResponse> = await GetCategoriesAll(baseUrl, data);
					if (response !== null && response.status === axios.HttpStatusCode.Ok) {
						setOptions(response.data);
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
					setOptions([]);
				}
				if (
					axios.isAxiosError(error) &&
					error.response &&
					error.response.status &&
					error.response.status >= axios.HttpStatusCode.InternalServerError &&
					error.response.status < ApiResponseCode.SERVER_ERROR_STATUS_MAX
				) {
					console.log(error);
					setOptions([]);
				}
			}
		};
		getCategoryOptions();
	}, [baseUrl]);

	useEffect(() => {
		const getFiveOperations = async () => {
			const data = {
				type: "outcome",
			};
			try {
				if (baseUrl) {
					const response: AxiosResponse<ITransactionsResponse> = await GetFiveTransactions(baseUrl, data);
					if (response !== null && response.status === axios.HttpStatusCode.Ok) {
						setFiveOperations(response.data);
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
		getFiveOperations();
	}, [baseUrl]);

	useEffect(() => {
		const getFiveOperationsNames = () => {
			const fiveOperationsNames: string[] | any = [];
			fiveOperations.forEach((element: { categories: number; target: string; amount: string }) => {
				options.forEach((option: { id: number; name: string }) => {
					if (element.categories === option.id) {
						element.target = option.name;
						fiveOperationsNames.push(element);
					}
				});
			});
			return fiveOperationsNames;
		};
		setFiveOperationsNames(getFiveOperationsNames);
	}, [fiveOperationsNames, fiveOperations, options]);

	const interval = 2000;

	const addCategory = async (data: IAddCategoryExpensesForm) => {
		try {
			if (baseUrl && data !== null) {
				const response = await AddExpensesCategory(baseUrl, data);
				if (response.status === axios.HttpStatusCode.Created) {
					setIsOpen(false);
					setIsAddSuccess(true);
					setTimeout(() => setIsAddSuccess(false), interval);
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

	const onRemoveClick = async (id: number) => {
		try {
			if (baseUrl && id !== null) {
				const response = await RemoveExpensesCategory(baseUrl, id);
				if (response.status === axios.HttpStatusCode.Ok) {
					setIsDeleteSuccessCategory(true);
					setTimeout(() => setIsDeleteSuccessCategory(false), interval);
				}
			}
		} catch (error) {
			if (
				axios.isAxiosError(error) &&
				error.response &&
				error.response.status &&
				error.response.status === axios.HttpStatusCode.Conflict
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

	const onSubmit = async (data: IExpensesAddCategoryTransactionForm & IExpensesCategoryForm) => {
		const endDate = 10;
		data.date = new Date().toISOString().slice(0, endDate);
		try {
			if (baseUrl && data !== null) {
				const response = await AddExpensesCategoryTransaction(baseUrl, data);
				if (response.status === axios.HttpStatusCode.Ok) {
					console.log("success");
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

	const deleteTransaction = async (id: string) => {
		try {
			if (baseUrl) {
				const response = await RemoveExpensesCategoryTransaction(baseUrl, id);
				if ((response.status = axios.HttpStatusCode.Ok)) {
					setIsDeleteOperationSuccess(true);
					setTimeout(() => setIsDeleteOperationSuccess(false), interval);
				}
			}
		} catch (error) {
			if (
				axios.isAxiosError(error) &&
				error.response &&
				error.response.status &&
				error.response.status === axios.HttpStatusCode.Forbidden
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

	return (
		<div className={styles.expensesPageWrap}>
			<div className={styles.expensesPageContainer}>
				<form className={styles.expensesFormContentWrapper} onSubmit={handleSubmit(onSubmit)}>
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
								name={"categories"}
								label={"Категория"}
								options={options}
								control={control}
								onAddCategory={() => setIsOpen(true)}
								onRemoveCategory={onRemoveClick}
							/>
						</div>
						<div className={styles.expensesDetailsContainer__sum}>
							<AppInput
								control={control}
								label={"Сумма"}
								type={InputTypeList.Number}
								name={"amount"}
								placeholder={"0.00"}
							/>
						</div>
						<AddButton onClick={() => resetTimer()} type="submit" />
					</div>
				</form>
				{isOpen && <CategoryAddModal open={isOpen} onCancelClick={() => setIsOpen(false)} request={addCategory} />}
				{isAddSuccess && <CategoryAddSuccessModal open={isAddSuccess} />}
				{isDeleteSuccessCategory && <CategoryDeleteSuccessModal open={isDeleteSuccessCategory} />}

				<div className={styles.expensesTransactionsWrapper}>
					<h1 className={styles.expensesTransactionHeader}>Последние операции по расходам</h1>
					{fiveOperationsNames &&
						fiveOperationsNames.map((expensesData: IExpenseTransaction, index: Key) => (
							<li key={index}>
								<ExpensesTransaction
									date={expensesData.date}
									target={expensesData.target}
									amount={expensesData.amount}
									type={""}
									categories={0}
									id={expensesData.id}
									onDeleteClick={() => [setIsDeleteOperationApprove(true), setIsId(expensesData.id)]}
								/>
							</li>
						))}
				</div>
				{isDeleteOperationApprove && (
					<RecordDeleteModal
						open={isDeleteOperationApprove}
						remove={() => deleteTransaction(isId)}
						cancelRemove={() => setIsDeleteOperationApprove(false)}
					/>
				)}
				{isDeleteOperationSuccess && <SuccessDeleteModal open={isDeleteOperationSuccess} />}
			</div>
		</div>
	);
}

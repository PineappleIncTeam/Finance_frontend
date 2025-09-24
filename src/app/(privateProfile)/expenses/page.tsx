"use client";

import { useRouter } from "next/navigation";
import { Key, useCallback, useEffect, useState } from "react";
import { useForm } from "react-hook-form";
import axios, { AxiosResponse } from "axios";

import { useLogoutTimer } from "../../../hooks/useLogoutTimer";
import { getCorrectBaseUrl } from "../../../utils/baseUrlConverter";
import { IAddCategoryTransactionForm, IExpensesCategoryForm } from "../../../types/pages/Expenses";
import { IAddCategoryExpensesForm, IEditTransactionForm } from "../../../types/components/ComponentsTypes";
import { ICategoryOption } from "../../../types/common/ComponentsProps";
import { IOperation } from "../../../types/api/Expenses";
import InputDate from "../../../ui/inputDate/inputDate";
import AppInput from "../../../ui/appInput/AppInput";
import ExpensesTransaction from "../../../components/userProfileLayout/expensesTransaction/expensesTransaction";
import { RecordDeleteModal } from "../../../components/userProfileLayout/recordDelete/recordDelete";
import { EditTransactionModal } from "../../../components/userProfileLayout/editTransaction/editTransaction";
import { ResponseApiRequestModal } from "../../../components/userProfileLayout/responseActionExpenses/responseApiRequestModal";
import { CategoryDeleteModal } from "../../../components/userProfileLayout/categoryDelete/categoryDelete";
import { CategorySelect } from "../../../components/userProfileLayout/categorySelect/CategorySelect";
import AddButton from "../../../components/userProfileLayout/addButton/addButton";
import { CategoryAddModal } from "../../../components/userProfileLayout/categoryAdd/categoryAddModal";
import { getFiveExpensesTransactions } from "../../../services/api/userProfile/getFiveExpensesTransactions";
import { addExpensesCategory } from "../../../services/api/userProfile/addExpensesCategory";
import { MainPath } from "../../../services/router/routes";
import { addExpensesCategoryTransaction } from "../../../services/api/userProfile/addExpensesCategoryTransaction";
import { removeExpensesCategory } from "../../../services/api/userProfile/removeExpensesCategory";
import { removeTransaction } from "../../../services/api/userProfile/removeTransaction";
import { editExpensesCategoryTransaction } from "../../../services/api/userProfile/editExpensesTransaction";
import { archiveCategory } from "../../../services/api/userProfile/archiveCategory";
import { getAllExpensesOperations } from "../../../services/api/userProfile/getAllExpensesOperations";
import { getCurrentDate } from "../../../utils/getCurrentDate";
import { CategoryType } from "../../../helpers/categoryTypes";
import { ApiResponseCode } from "../../../helpers/apiResponseCode";
import handleLogout from "../../../helpers/logoutTimeoutHandler";
import { InputTypeList } from "../../../helpers/Input";
import { getAllExpensesCategories } from "../../../services/api/userProfile/getAllExpensesCategories";

import styles from "./expenses.module.scss";

export default function Expenses() {
	const ResponseApiRequestModalInitialState = {
		open: false,
		title: "",
	};

	const [baseUrl, setBaseUrl] = useState<string>();
	const [isAddSuccess, setIsAddSuccess] = useState<boolean>(false);
	const [isOpen, setIsOpen] = useState<boolean>(false);
	const [fiveOperations, setFiveOperations] = useState<IOperation[]>([]);
	const [fiveOperationsNames, setFiveOperationsNames] = useState<IOperation[]>([]);
	const [options, setOptions] = useState<ICategoryOption[]>([]);
	const [isDeleteSuccessCategory, setIsDeleteSuccessCategory] = useState<boolean>(false);
	const [isDeleteOperationApprove, setIsDeleteOperationApprove] = useState<boolean>(false);
	const [isDeleteOperationSuccess, setIsDeleteOperationSuccess] = useState<boolean>(false);
	const [isId, setIsId] = useState<string>("");
	const [isEdit, setIsEdit] = useState<boolean>(false);
	const [isEditSuccess, setIsEditSuccess] = useState<boolean>(false);
	const [isCategoryDeleteModalOpen, setIsCategoryDeleteModalOpen] = useState<boolean>(false);
	const [isCategory, setIsCategory] = useState<string>("");
	const [isIdForDeleteCategory, setIsIdForDeleteCategory] = useState<string>("");
	const [isCategoryArchive, setIsCategoryArchive] = useState<boolean>(false);
	const [allOperations, setAllOperations] = useState<IOperation[]>([]);
	const [responseApiRequestModal, setResponseApiRequestModal] = useState(ResponseApiRequestModalInitialState);

	const { control, handleSubmit } = useForm<IAddCategoryTransactionForm & IExpensesCategoryForm>({
		defaultValues: {
			amount: "",
			categories: "",
			type: "outcome",
		},
		mode: "all",
		delayError: 200,
	});

	const router = useRouter();

	const { request } = handleLogout(baseUrl);
	const { resetTimer } = useLogoutTimer(request);

	const endDate = 10;
	const interval = 2000;

	const getFiveOperations = useCallback(async () => {
		const data = {
			type: "outcome",
		};
		try {
			if (baseUrl) {
				const response: AxiosResponse<IOperation[]> = await getFiveExpensesTransactions(baseUrl, data);
				if (response !== null && response.status === axios.HttpStatusCode.Ok) {
					setFiveOperations(response.data);
				}
			}
		} catch (error) {
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
	}, [baseUrl, router]);

	const getFiveOperationsNames = useCallback(() => {
		const fiveOperationsNames: IOperation[] = [];
		fiveOperations.forEach((element: IOperation) => {
			options.forEach((option: ICategoryOption) => {
				if (element.categories === option.id) {
					element.name = option.name;
					fiveOperationsNames.push(element);
				}
			});
		});
		return fiveOperationsNames;
	}, [fiveOperations, options]);

	const getAllCategoriesOptions = useCallback(async () => {
		const data = {
			// eslint-disable-next-line camelcase
			is_income: false,
			// eslint-disable-next-line camelcase
			is_outcome: true,
		};
		try {
			if (baseUrl) {
				const response: AxiosResponse<ICategoryOption[]> = await getAllExpensesCategories(baseUrl, data);
				if (response !== null && response.status === axios.HttpStatusCode.Ok) {
					setOptions(response.data);
				}
			}
		} catch (error) {
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
	}, [baseUrl, router]);

	useEffect(() => {
		setBaseUrl(getCorrectBaseUrl());
	}, []);

	useEffect(() => {
		resetTimer();
	}, [request, resetTimer]);

	useEffect(() => {
		getAllCategoriesOptions();
		if (isAddSuccess || isDeleteSuccessCategory || isCategoryArchive) {
			getAllCategoriesOptions();
		}
	}, [getAllCategoriesOptions, isAddSuccess, isDeleteSuccessCategory, isCategoryArchive]);

	useEffect(() => {
		getFiveOperations();
		if (isDeleteOperationSuccess || isEditSuccess || isAddSuccess) {
			getFiveOperations();
		}
	}, [isDeleteOperationSuccess, isEditSuccess, isAddSuccess, getFiveOperations]);

	useEffect(() => {
		setFiveOperationsNames(getFiveOperationsNames);
		if (isDeleteOperationSuccess || isEditSuccess || isAddSuccess) {
			setFiveOperationsNames(getFiveOperationsNames);
		}
	}, [isDeleteOperationSuccess, isEditSuccess, isAddSuccess, getFiveOperationsNames]);

	const addCategory = async (data: IAddCategoryExpensesForm) => {
		try {
			if (baseUrl && data !== null) {
				const response = await addExpensesCategory(baseUrl, data);
				if (response.status === axios.HttpStatusCode.Created) {
					setIsOpen(false);
					setIsAddSuccess(true);
					setResponseApiRequestModal({
						open: true,
						title: "Категория успешно добавлена",
					});
					setTimeout(() => {
						setResponseApiRequestModal(ResponseApiRequestModalInitialState);
						setIsAddSuccess(false);
					}, interval);
				}
			}
		} catch (error) {
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

	const handleIdName = (id: number, name: string) => {
		setIsCategory(name);
		setIsIdForDeleteCategory(String(id));
	};

	const removeApiRequest = async (id: string) => {
		try {
			if (baseUrl && id !== null) {
				const response = await removeExpensesCategory(baseUrl, String(id));
				if (response.status === axios.HttpStatusCode.Ok) {
					setIsCategoryDeleteModalOpen(false);
					setIsDeleteSuccessCategory(true);
					setResponseApiRequestModal({
						open: true,
						title: "Категория успешно удалена",
					});
					setTimeout(() => {
						setResponseApiRequestModal(ResponseApiRequestModalInitialState);
					}, interval);
				}
			}
		} catch (error) {
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

	const onSubmit = async (data: IAddCategoryTransactionForm & IExpensesCategoryForm) => {
		resetTimer();
		const transactionData: IAddCategoryTransactionForm = {
			date: getCurrentDate(endDate),
			amount: Number(data.amount),
			categories: data.categories,
			type: "outcome",
		};
		try {
			if (baseUrl && data !== null) {
				const response = await addExpensesCategoryTransaction(baseUrl, transactionData);
				if (response.status === axios.HttpStatusCode.Created) {
					setIsOpen(false);
					setIsAddSuccess(true);
					setResponseApiRequestModal({
						open: true,
						title: "Запись успешно добавлена",
					});
					setTimeout(() => {
						setResponseApiRequestModal(ResponseApiRequestModalInitialState);
						setIsAddSuccess(false);
					}, interval);
				}
			}
		} catch (error) {
			if (
				axios.isAxiosError(error) &&
				error.response &&
				error.response.status &&
				error.response.status >= axios.HttpStatusCode.InternalServerError &&
				error.response.status < ApiResponseCode.SERVER_ERROR_STATUS_MAX
			) {
				router.push(MainPath.ServerError);
			} else {
				setResponseApiRequestModal({
					open: true,
					title: "Запись не была добавлена",
				});
				setTimeout(() => {
					setResponseApiRequestModal(ResponseApiRequestModalInitialState);
				}, interval);
			}
		}
	};

	const deleteTransaction = async (id: string) => {
		try {
			if (baseUrl) {
				const response = await removeTransaction(baseUrl, id);
				if ((response.status = axios.HttpStatusCode.Ok)) {
					setIsDeleteOperationApprove(false);
					setIsDeleteOperationSuccess(true);
					setResponseApiRequestModal({
						open: true,
						title: "Запись успешно удалена",
					});
					setTimeout(() => {
						setResponseApiRequestModal(ResponseApiRequestModalInitialState);
						setIsDeleteOperationSuccess(false);
					}, interval);
				}
			}
		} catch (error) {
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

	const editTransaction = async (id: string, data: IEditTransactionForm) => {
		data.date = getCurrentDate(endDate);
		try {
			if (baseUrl && data !== null) {
				const response = await editExpensesCategoryTransaction(baseUrl, id, data);
				if (response.status === axios.HttpStatusCode.Ok) {
					setIsEdit(false);
					setIsEditSuccess(true);
					setResponseApiRequestModal({
						open: true,
						title: "Сумма успешно изменена",
					});
					setTimeout(() => {
						setResponseApiRequestModal(ResponseApiRequestModalInitialState);
						setIsEditSuccess(false);
					}, interval);
				}
			}
		} catch (error) {
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

	const handleArchiveCategory = async (id: string) => {
		const data = {
			// eslint-disable-next-line camelcase
			is_deleted: true,
		};
		try {
			if (baseUrl && id !== null) {
				const response = await archiveCategory(baseUrl, id, data);
				if (response.status === axios.HttpStatusCode.Ok) {
					setIsCategoryDeleteModalOpen(false);
					setIsCategoryArchive(true);
					setResponseApiRequestModal({
						open: true,
						title: "Категория успешно перенесена в «Архив»",
					});
					setTimeout(() => {
						setResponseApiRequestModal(ResponseApiRequestModalInitialState);
						setIsDeleteSuccessCategory(false);
						setIsCategoryArchive(false);
					}, interval);
				}
			}
		} catch (error) {
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

	const getAllOperations = async () => {
		try {
			if (baseUrl) {
				const response: AxiosResponse<IOperation[]> = await getAllExpensesOperations(baseUrl);
				if (response !== null && response.status === axios.HttpStatusCode.Ok) {
					setAllOperations(response.data);
				}
			}
		} catch (error) {
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
								name={"categories"}
								label={"Категория"}
								options={options}
								control={control}
								onAddCategory={() => setIsOpen(true)}
								onRemoveCategory={(id, name) => [
									setIsCategoryDeleteModalOpen(true),
									handleIdName(id, name),
									getAllOperations(),
								]}
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
						<AddButton onClick={handleSubmit(onSubmit)} type={InputTypeList.Button} />
					</div>
				</form>
				{isCategoryDeleteModalOpen && (
					<CategoryDeleteModal
						open={isCategoryDeleteModalOpen}
						category={isCategory}
						id={isIdForDeleteCategory}
						requestDeleteApi={removeApiRequest}
						requestArchiveApi={handleArchiveCategory}
						onCancelClick={() => setIsCategoryDeleteModalOpen(false)}
						operations={allOperations}
					/>
				)}
				<ResponseApiRequestModal open={responseApiRequestModal.open} title={responseApiRequestModal.title} />
				{isOpen && (
					<CategoryAddModal
						open={isOpen}
						onCancelClick={() => setIsOpen(false)}
						request={addCategory}
						type={CategoryType.Outcome}
					/>
				)}
				<ResponseApiRequestModal open={responseApiRequestModal.open} title={responseApiRequestModal.title} />
				<ResponseApiRequestModal open={responseApiRequestModal.open} title={responseApiRequestModal.title} />
				<div className={styles.expensesTransactionsWrapper}>
					<h1 className={styles.expensesTransactionHeader}>Последние операции по расходам</h1>
					{fiveOperationsNames &&
						fiveOperationsNames.map((expensesData: IOperation, index: Key) => (
							<li key={index}>
								<ExpensesTransaction
									date={expensesData.date}
									name={expensesData.name}
									amount={expensesData.amount}
									type={""}
									categories={0}
									id={expensesData.id}
									onDeleteClick={() => [setIsDeleteOperationApprove(true), setIsId(String(expensesData.id))]}
									editClick={() => [setIsEdit(true), setIsId(String(expensesData.id))]}
									target={""}
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
				<ResponseApiRequestModal open={responseApiRequestModal.open} title={responseApiRequestModal.title} />
				{isEdit && (
					<EditTransactionModal open={isEdit} id={isId} request={editTransaction} cancelEdit={() => setIsEdit(false)} />
				)}
				<ResponseApiRequestModal open={responseApiRequestModal.open} title={responseApiRequestModal.title} />
			</div>
		</div>
	);
}

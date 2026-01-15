"use client";

import { useRouter } from "next/navigation";
import { Key, useCallback, useEffect, useState } from "react";
import { useForm } from "react-hook-form";
import axios, { AxiosResponse } from "axios";

import { useHandleLogout } from "../../../hooks/useHandleLogout";
import { useLogoutTimer } from "../../../hooks/useLogoutTimer";
import { useRuntimeEnv } from "../../../hooks/useRuntimeEnv";

import { IAddCategoryTransactionForm, IExpensesCategoryForm, IFiveOperations } from "../../../types/pages/Expenses";
import {
	IAddCategoryIncomeForm,
	IAddCategoryExpensesForm,
	IEditTransactionForm,
} from "../../../types/components/ComponentsTypes";
import { ICategoryOption } from "../../../types/common/ComponentsProps";
import { IAddingCategoryIncomeForm } from "../../../types/pages/ProfitMoney";
import { IOperation } from "../../../types/api/Expenses";
import InputDate from "../../../ui/inputDate/inputDate";
import AppInput from "../../../ui/appInput/AppInput";
import IncomeTransaction from "../../../components/userProfileLayout/incomeTransaction/incomeTransaction";
import { RecordDeleteModal } from "../../../components/userProfileLayout/recordDelete/recordDelete";
import { ResponseApiRequestModal } from "../../../ui/responseActionModal/responseApiRequestModal";
import { CategoryDeleteModal } from "../../../components/userProfileLayout/categoryDelete/categoryDelete";
import { CategorySelect } from "../../../components/userProfileLayout/categorySelect/CategorySelect";
import AddButton from "../../../components/userProfileLayout/addButton/addButton";
import InactivityLogoutModal from "../../../components/userProfileLayout/inactivityLogoutModal/inactivityLogoutModal";
import { CategoryAddModal } from "../../../components/userProfileLayout/categoryAdd/categoryAddModal";
import { EditTransactionModal } from "../../../components/userProfileLayout/editTransaction/editTransaction";
import { getFiveIncomeTransactions } from "../../../services/api/userProfile/getFiveIncomeTransactions";
import { addIncomeCategory } from "../../../services/api/userProfile/addIncomeCategory";
import { MainPath } from "../../../services/router/routes";
import { addIncomeCategoryTransaction } from "../../../services/api/userProfile/addIncomeCategoryTransaction";
import { removeIncomeCategory } from "../../../services/api/userProfile/removeIncomeCategory";
import { removeTransaction } from "../../../services/api/userProfile/removeTransaction";
import { archiveCategory } from "../../../services/api/userProfile/archiveCategory";
import { getAllIncomeOperations } from "../../../services/api/userProfile/getAllIncomeOperations";
import { CategoryType } from "../../../helpers/categoryTypes";
import { getCurrentDate } from "../../../utils/getCurrentDate";
import { InputTypeList } from "../../../helpers/Input";
import { editCategoryTransaction } from "../../../services/api/userProfile/editCategoryTransaction";
import { getAllIncomeCategories } from "../../../services/api/userProfile/getAllIncomeCategories";
import { mockBaseUrl } from "../../../mocks/envConsts";

import styles from "./profitMoney.module.scss";

function ProfitMoney() {
	const responseApiRequestModalInitialState = {
		open: false,
		title: "",
	};

	const [isAddSuccess, setIsAddSuccess] = useState<boolean>(false);
	const [fiveOperations, setFiveOperations] = useState<IOperation[]>([]);
	const [fiveOperationsNames, setFiveOperationsNames] = useState<IOperation[]>([]);
	const [options, setOptions] = useState<ICategoryOption[]>([]);
	const [isDeleteSuccessCategory, setIsDeleteSuccessCategory] = useState<boolean>(false);
	const [isDeleteOperationApprove, setIsDeleteOperationApprove] = useState<boolean>(false);
	const [isDeleteOperationSuccess, setIsDeleteOperationSuccess] = useState<boolean>(false);
	const [isId, setIsId] = useState<string>("");
	const [isEditSuccess, setIsEditSuccess] = useState<boolean>(false);
	const [isCategory, setIsCategory] = useState<string>("");
	const [isIdForDeleteCategory, setIsIdForDeleteCategory] = useState<string>("");
	const [isCategoryArchive, setIsCategoryArchive] = useState<boolean>(false);
	const [allOperations, setAllOperations] = useState<IOperation[]>([]);
	const [responseApiRequestModal, setResponseApiRequestModal] = useState(responseApiRequestModalInitialState);
	const [isCategoryAddModalOpen, setIsCategoryAddModalOpen] = useState<boolean>(false);
	const [isCategoryDeleteModalOpen, setIsCategoryDeleteModalOpen] = useState<boolean>(false);
	const [isEditTransactionModalOpen, setIsEditTransactionModalOpen] = useState<boolean>(false);

	const { control, handleSubmit } = useForm<IAddCategoryTransactionForm & IExpensesCategoryForm>({
		defaultValues: {
			amount: "",
			categories: null,
			type: "income",
		},
		mode: "all",
		delayError: 200,
	});

	const router = useRouter();
	const { getSafeEnvVar } = useRuntimeEnv(["NEXT_PUBLIC_BASE_URL"]);

	const baseUrl = getSafeEnvVar("NEXT_PUBLIC_BASE_URL", mockBaseUrl);
	const { request } = useHandleLogout(baseUrl);
	const { resetTimer, setIsOpenInactivityLogoutModal, isOpenInactivityLogoutModal } = useLogoutTimer(request);

	const endDate = 10;
	const interval = 2000;

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

	useEffect(() => {
		(async () => {
			await getFiveOperations();
			setFiveOperationsNames(getFiveOperationsNames);
			getAllCategoriesOptions();
		})();
		// eslint-disable-next-line react-hooks/exhaustive-deps
	}, []);

	useEffect(() => {
		resetTimer();
	}, [request, resetTimer]);

	useEffect(() => {
		(() => {
			if (isAddSuccess || isDeleteSuccessCategory || isCategoryArchive) {
				getAllCategoriesOptions();
			}
		})();
		// eslint-disable-next-line react-hooks/exhaustive-deps
	}, [isAddSuccess, isDeleteSuccessCategory, isCategoryArchive]);

	useEffect(() => {
		(() => {
			if (isDeleteOperationSuccess || isEditSuccess || isAddSuccess) {
				getFiveOperations();
			}
		})();
		// eslint-disable-next-line react-hooks/exhaustive-deps
	}, [isDeleteOperationSuccess, isEditSuccess, isAddSuccess]);

	useEffect(() => {
		(() => {
			if (isDeleteOperationSuccess || isEditSuccess || isAddSuccess) {
				setFiveOperationsNames(getFiveOperationsNames);
			}
		})();
		// eslint-disable-next-line react-hooks/exhaustive-deps
	}, [isDeleteOperationSuccess, isEditSuccess, isAddSuccess]);

	const getFiveOperations = async () => {
		const data = {
			type: "income",
		};
		try {
			if (baseUrl) {
				const response: AxiosResponse<IFiveOperations[]> = await getFiveIncomeTransactions(baseUrl, data);
				if (response !== null && response.status === axios.HttpStatusCode.Ok) {
					setFiveOperations(response.data as unknown as IOperation[]);
				}
			}
		} catch (error) {
			if (
				axios.isAxiosError(error) &&
				error.response &&
				error.response.status &&
				error.response.status >= axios.HttpStatusCode.InternalServerError &&
				error.response.status <= axios.HttpStatusCode.NetworkAuthenticationRequired
			) {
				router.push(MainPath.ServerError);
			}
		}
	};

	const getAllCategoriesOptions = async () => {
		const data = {
			// eslint-disable-next-line camelcase
			is_income: true,
			// eslint-disable-next-line camelcase
			is_outcome: false,
		};

		try {
			if (baseUrl) {
				const response: AxiosResponse<ICategoryOption[]> = await getAllIncomeCategories(baseUrl, data);
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
				error.response.status <= axios.HttpStatusCode.NetworkAuthenticationRequired
			) {
				router.push(MainPath.ServerError);
			}
		}
	};

	const addCategory = async (data: IAddCategoryIncomeForm) => {
		try {
			if (baseUrl && data !== null) {
				const payloadData: IAddingCategoryIncomeForm = {
					name: data.name,
					// eslint-disable-next-line camelcase
					is_income: true,
					// eslint-disable-next-line camelcase
					is_outcome: false,
					// eslint-disable-next-line camelcase
					is_visibility: true,
				};

				const response = await addIncomeCategory(baseUrl, payloadData);
				if (response.status === axios.HttpStatusCode.Created) {
					setIsCategoryAddModalOpen(false);
					setIsAddSuccess(true);
					setResponseApiRequestModal({
						open: true,
						title: "Категория успешно добавлена",
					});
					setTimeout(() => {
						setResponseApiRequestModal(responseApiRequestModalInitialState);
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
				error.response.status <= axios.HttpStatusCode.NetworkAuthenticationRequired
			) {
				router.push(MainPath.ServerError);
			}
		}
	};

	const handleIdName = (id: number, name: string) => {
		setIsCategory(name);
		setIsIdForDeleteCategory(String(id));
	};

	const removeCategoryApiRequest = async (id: string) => {
		try {
			if (baseUrl && id !== null) {
				const response = await removeIncomeCategory(baseUrl, String(id));
				if (response.status === axios.HttpStatusCode.Ok) {
					setIsCategoryDeleteModalOpen(false);
					setIsDeleteSuccessCategory(true);
					setResponseApiRequestModal({
						open: true,
						title: "Категория успешно удалена",
					});
					setTimeout(() => {
						setResponseApiRequestModal(responseApiRequestModalInitialState);
					}, interval);
				}
			}
		} catch (error) {
			if (
				axios.isAxiosError(error) &&
				error.response &&
				error.response.status &&
				error.response.status >= axios.HttpStatusCode.InternalServerError &&
				error.response.status <= axios.HttpStatusCode.NetworkAuthenticationRequired
			) {
				router.push(MainPath.ServerError);
			}
		}
	};

	const editTransaction = async (id: string, data: IEditTransactionForm) => {
		data.date = getCurrentDate(endDate);

		try {
			if (baseUrl && data !== null) {
				const response = await editCategoryTransaction(baseUrl, id, data);
				if (response.status === axios.HttpStatusCode.Ok) {
					setIsEditTransactionModalOpen(false);
					setIsEditSuccess(true);
					setResponseApiRequestModal({
						open: true,
						title: "Сумма успешно изменена",
					});
					setTimeout(() => {
						setResponseApiRequestModal(responseApiRequestModalInitialState);
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
				error.response.status <= axios.HttpStatusCode.NetworkAuthenticationRequired
			) {
				router.push(MainPath.ServerError);
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
						setResponseApiRequestModal(responseApiRequestModalInitialState);
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
				error.response.status <= axios.HttpStatusCode.NetworkAuthenticationRequired
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
						setResponseApiRequestModal(responseApiRequestModalInitialState);
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
				error.response.status <= axios.HttpStatusCode.NetworkAuthenticationRequired
			) {
				router.push(MainPath.ServerError);
			}
		}
	};

	const getAllOperations = async () => {
		try {
			if (baseUrl) {
				const response: AxiosResponse<IOperation[]> = await getAllIncomeOperations(baseUrl);
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
				error.response.status <= axios.HttpStatusCode.NetworkAuthenticationRequired
			) {
				router.push(MainPath.ServerError);
			}
		}
	};

	function getCategoryId(categoryName: string) {
		const categoryData = options.find(
			(currentCategoryData: ICategoryOption) => currentCategoryData.name === categoryName,
		);
		return categoryData?.id ?? 0;
	}

	const onSubmit = async (data: IAddCategoryTransactionForm & IExpensesCategoryForm) => {
		resetTimer();
		const transactionData: IAddCategoryTransactionForm = {
			date: getCurrentDate(endDate),
			amount: Number(data.amount),
			categories: getCategoryId(String(data.categories)),
			type: "income",
		};

		try {
			if (baseUrl && data !== null) {
				const response = await addIncomeCategoryTransaction(baseUrl, transactionData);
				if (response.status === axios.HttpStatusCode.Created) {
					setIsCategoryAddModalOpen(false);
					setIsAddSuccess(true);
					setResponseApiRequestModal({
						open: true,
						title: "Запись успешно добавлена",
					});
					setTimeout(() => {
						setResponseApiRequestModal(responseApiRequestModalInitialState);
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
				error.response.status <= axios.HttpStatusCode.NetworkAuthenticationRequired
			) {
				router.push(MainPath.ServerError);
			} else {
				setResponseApiRequestModal({
					open: true,
					title: "Запись не была добавлена",
				});
				setTimeout(() => {
					setResponseApiRequestModal(responseApiRequestModalInitialState);
				}, interval);
			}
		}
	};

	return (
		<div className={styles.profitMoneyPageWrap}>
			<div className={styles.profitMoneyPageContainer}>
				<form className={styles.formContentWrapper}>
					<h1 className={styles.headerTitle}>Доходы</h1>
					<div className={styles.profitMoneyGridWrapper}>
						<div className={styles.totalMonthlyWrapper}>
							<p className={styles.totalMonthlyWrapper__month}>Общий доход за Январь</p>
							<p className={styles.totalMonthlyWrapper__sum}>283 000 ₽</p>
						</div>
						<div className={styles.dateSelectionWrapper}>
							<InputDate control={control} name={"date"} />
						</div>

						<div className={styles.profitMoneyDetailsContainer__category}>
							<CategorySelect
								name={"categories"}
								label={"Категория"}
								options={options}
								control={control}
								onAddCategory={() => setIsCategoryAddModalOpen(true)}
								onRemoveCategory={(id, name) => [
									setIsCategoryDeleteModalOpen(true),
									handleIdName(id, name),
									getAllOperations(),
								]}
							/>
						</div>

						<div className={styles.profitMoneyDetailsContainer__sum}>
							<AppInput
								control={control}
								label={"Сумма"}
								type={InputTypeList.Number}
								name={"amount"}
								placeholder={"0.00"}
							/>
							<AddButton onClick={handleSubmit(onSubmit)} type={InputTypeList.Button} />
						</div>
					</div>
				</form>

				{isCategoryDeleteModalOpen && (
					<CategoryDeleteModal
						open={isCategoryDeleteModalOpen}
						category={isCategory}
						id={isIdForDeleteCategory}
						requestDeleteApi={removeCategoryApiRequest}
						requestArchiveApi={handleArchiveCategory}
						onCancelClick={() => setIsCategoryDeleteModalOpen(false)}
						operations={allOperations}
					/>
				)}

				<ResponseApiRequestModal open={responseApiRequestModal.open} title={responseApiRequestModal.title} />

				{isCategoryAddModalOpen && (
					<CategoryAddModal
						open={isCategoryAddModalOpen}
						onCancelClick={() => setIsCategoryAddModalOpen(false)}
						type={CategoryType.Income}
						request={(data: IAddCategoryExpensesForm) => addCategory(data as IAddCategoryIncomeForm)}
					/>
				)}

				<div className={styles.transactionsWrapper}>
					<h1 className={styles.transactionHeader}>Последние операции по доходам</h1>
					{fiveOperationsNames &&
						fiveOperationsNames.map((incomeData: IOperation, index: Key) => (
							<li key={index}>
								<IncomeTransaction
									date={incomeData.date}
									name={incomeData.name}
									amount={incomeData.amount}
									type={""}
									categories={0}
									id={incomeData.id}
									target={""}
									onDeleteClick={() => [setIsDeleteOperationApprove(true), setIsId(String(incomeData.id))]}
									editClick={() => [setIsEditTransactionModalOpen(true), setIsId(String(incomeData.id))]}
								/>
							</li>
						))}
				</div>

				{isEditTransactionModalOpen && (
					<EditTransactionModal
						open={isEditTransactionModalOpen}
						id={isId}
						request={editTransaction}
						cancelEdit={() => setIsEditTransactionModalOpen(false)}
					/>
				)}

				{isDeleteOperationApprove && (
					<RecordDeleteModal
						open={isDeleteOperationApprove}
						remove={() => deleteTransaction(isId)}
						cancelRemove={() => setIsDeleteOperationApprove(false)}
					/>
				)}

				<InactivityLogoutModal
					open={isOpenInactivityLogoutModal}
					onStayClick={() => [resetTimer(), setIsOpenInactivityLogoutModal(false)]}
					onLogoutClick={() => [request(), setIsOpenInactivityLogoutModal(false)]}
					onModalTimerExpiring={() => [request(), setIsOpenInactivityLogoutModal(false)]}
				/>
			</div>
		</div>
	);
}

export default ProfitMoney;

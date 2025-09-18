"use client";

import { useCallback, useEffect, useState } from "react";
import { useForm } from "react-hook-form";
import axios, { AxiosResponse } from "axios";
import { useRouter } from "next/navigation";

import { useLogoutTimer } from "../../../hooks/useLogoutTimer";

import {
	IEditActionProps,
	IEditTransactionForm,
	SavingsFieldValues,
	SortOrderStateValue,
	TIndexState,
	TSavingsFieldState,
} from "../../../types/components/ComponentsTypes";
import { ISavingsSelectForm, ISavingsTargetAddForm } from "../../../types/pages/Savings";
import SavingsTransaction from "../../../components/userProfileLayout/savingsTransaction/savingsTransaction";
import InputDate from "../../../ui/inputDate/inputDate";
import AppInput from "../../../ui/appInput/AppInput";
import { CategorySelect } from "../../../components/userProfileLayout/categorySelect/CategorySelect";
import AddButton from "../../../components/userProfileLayout/addButton/addButton";
import { savingsTransactions } from "../../../mocks/SavingsTransaction";
import { InputTypeList } from "../../../helpers/Input";
import { getCorrectBaseUrl } from "../../../utils/baseUrlConverter";
import handleLogout from "../../../helpers/logoutTimeoutHandler";

import { EditIcon } from "../../../assets/script/expenses/EditIcon";
import { CheckIcon } from "../../../assets/script/savings/CheckIcon";
import { MoreIcon } from "../../../assets/script/savings/MoreIcon";
import { SortIcon } from "../../../assets/script/savings/SortIcon";
import { ApiResponseCode } from "../../../helpers/apiResponseCode";

import { MainPath } from "../../../services/router/routes";

import { ISavingsTargetAddTransactionForm, ITarget } from "../../../types/api/Savings";
import { getTargetsAll } from "../../../services/api/userProfile/getAllTargets";
import { IOperation } from "../../../types/api/Expenses";
import { SavingsAddTargetModal } from "../../../components/userProfileLayout/savingsCategory/savingsCategory";
import { SavingsTargetStatus, SavingsTargetStatusName } from "../../../helpers/targetStatus";
import { getFiveExpensesTransactions } from "../../../services/api/userProfile/getFiveExpensesTransactions";
import { addSavingsTarget } from "../../../services/api/userProfile/addSavingsTarget";
import { removeSavingsTarget } from "../../../services/api/userProfile/removeSavingsTarget";
import { CategoryDeleteModal } from "../../../components/userProfileLayout/categoryDelete/categoryDelete";
import { editSavingsCurrentSum } from "../../../services/api/userProfile/editSavingsCurrentSum";
import { getCurrentDate } from "../../../utils/getCurrentDate";
import { EditTransactionModal } from "../../../components/userProfileLayout/editTransaction/editTransaction";
import { editSavingsCategoryTransaction } from "../../../services/api/userProfile/editSavingsTransaction";

import styles from "./savings.module.scss";

function Savings() {
	const { control, handleSubmit } = useForm<ISavingsTargetAddForm & ISavingsSelectForm>({
		defaultValues: {
			name: "",
			id: null,
			// eslint-disable-next-line camelcase
			current_sum: 0,
			type: "savings",
		},
		mode: "all",
		delayError: 200,
	});
	const [hoveredIndex, setHoveredIndex] = useState<TIndexState>(null);

	const [editField, setEditField] = useState<TSavingsFieldState>(null);
	const [editIndex, setEditIndex] = useState<TIndexState>(null);
	const [editValue, setEditValue] = useState<string | number>("");

	const [openMoreIndex, setOpenMoreIndex] = useState<TIndexState>(null);

	const [sortOrder, setSortOrder] = useState<SortOrderStateValue>(SortOrderStateValue.asc);
	const [sortTargetOrder, setSortTargetOrder] = useState<SortOrderStateValue>(SortOrderStateValue.asc);
	const [baseUrl, setBaseUrl] = useState<string>();
	const { request } = handleLogout(baseUrl);
	const { resetTimer } = useLogoutTimer(request);
	const [allTargets, setAllTargets] = useState<ITarget[]>([]);
	const [fiveOperations, setFiveOperations] = useState<IOperation[]>([]);
	const [isAddCategoryModalOpen, setIsCategoryModalOpen] = useState<boolean>(false);
	const [isAddCategorySuccess, setIsAddCategorySuccess] = useState<boolean>(false);
	const [isDeleteTargetModalOpen, setIsDeleteTargetModalOpen] = useState<boolean>(false);
	const [isDeleteTargetSuccess, setIsDeleteTargetSuccess] = useState<boolean>(false);
	const [savingsTargetName, setSavingsTargetName] = useState<string>("");
	const [savingsTargetId, setSavingsTargetId] = useState<string>("");
	const [isSumSavingsAdded, setIsSumSavingsAdded] = useState<boolean>(false);
	const [fiveOperationsWithNames, setFiveOperationsWithNames] = useState<IOperation[]>([]);
	const [isSumEdit, setIsSumEdit] = useState<boolean>(false);
	const [idSaving, setIdSaving] = useState<string>("");

	const interval = 2000;
	const endDate = 10;

	const router = useRouter();
	const handleEditClick = ({ index, field, value }: IEditActionProps) => {
		setEditIndex(index);
		setEditField(field);
		setEditValue(value);
	};

	const handleSaveClick = () => {
		setEditIndex(null);
		setEditField(null);
	};

	const handleMoreClick = (index: number) => {
		setOpenMoreIndex(openMoreIndex === index ? null : index);
	};

	const handleSortBySum = () => {
		const sortedAllTargets = [...allTargets].sort((a, b) => {
			const sumA = parseFloat(a.current_sum.toString().replace(/[^0-9.-]+/g, ""));
			const sumB = parseFloat(b.current_sum.toString().replace(/[^0-9.-]+/g, ""));
			return sortOrder === SortOrderStateValue.asc ? sumA - sumB : sumB - sumA;
		});
		setAllTargets(sortedAllTargets);
		setSortOrder(sortOrder === SortOrderStateValue.asc ? SortOrderStateValue.desc : SortOrderStateValue.asc);
	};

	const handleSortByTarget = () => {
		const sortedAllTargets = [...allTargets].sort((a, b) => {
			const targetA = parseFloat(a.amount.toString().replace(/[^0-9.-]+/g, ""));
			const targetB = parseFloat(b.amount.toString().replace(/[^0-9.-]+/g, ""));
			return sortTargetOrder === SortOrderStateValue.asc ? targetA - targetB : targetB - targetA;
		});
		setAllTargets(sortedAllTargets);
		setSortTargetOrder(
			sortTargetOrder === SortOrderStateValue.asc ? SortOrderStateValue.desc : SortOrderStateValue.asc,
		);
	};

	function getTargetId(targetName: string) {
		const targetData = allTargets.find((currentTargetData: ITarget) => currentTargetData.name === targetName);

		return targetData?.id ?? 0;
	}

	const onSubmit = async (data: ISavingsSelectForm & ISavingsTargetAddForm) => {
		resetTimer();
		((data.date = getCurrentDate(endDate)), console.log(data));
		try {
			if (baseUrl && data !== null) {
				const targetFormData: ISavingsTargetAddTransactionForm = {
					type: "targets",
					amount: Number(data.current_sum),
					date: data.date,
					target: getTargetId(data.name),
				};
				const response = await editSavingsCurrentSum(baseUrl, targetFormData);
				if (response.status === axios.HttpStatusCode.Created) {
					setIsSumSavingsAdded(true);
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

	const getAllTargets = useCallback(async () => {
		try {
			if (baseUrl) {
				const response: AxiosResponse<ITarget[]> = await getTargetsAll(baseUrl);

				if (response !== null && response.status === axios.HttpStatusCode.Ok) {
					setAllTargets(response.data);
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

	const getFiveOperations = useCallback(async () => {
		const data = {
			type: "targets",
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

	const getFiveOperationsWithNames = useCallback(() => {
		const fiveOperationsWithNames: IOperation[] = [];
		fiveOperations.forEach((element: IOperation) => {
			allTargets.forEach((option: ITarget) => {
				if (element.target === option.id) {
					element.name = option.name;
					fiveOperationsWithNames.push(element);
				}
			});
		});
		return fiveOperationsWithNames;
	}, [fiveOperations, allTargets]);

	const addSavingsCategory = async (data: ISavingsTargetAddForm) => {
		try {
			if (baseUrl && data !== null) {
				const response = await addSavingsTarget(baseUrl, data);
				if (response.status === axios.HttpStatusCode.Created) {
					setIsAddCategorySuccess(true);
					setIsCategoryModalOpen(false);
					setTimeout(() => {
						setIsAddCategorySuccess(false);
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

	const deleteSavingsCategory = async (id: string) => {
		try {
			if (baseUrl && id !== null) {
				const response = await removeSavingsTarget(baseUrl, String(id));
				if (response.status === axios.HttpStatusCode.Ok) {
					setIsDeleteTargetModalOpen(false);
					setIsDeleteTargetSuccess(true);
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
				const response = await editSavingsCategoryTransaction(baseUrl, id, data);
				if (response.status === axios.HttpStatusCode.Ok) {
					setIsSumEdit(false);
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

	useEffect(() => {
		setFiveOperationsWithNames(getFiveOperationsWithNames());
	}, [getFiveOperationsWithNames]);

	useEffect(() => {
		setBaseUrl(getCorrectBaseUrl());
	}, []);

	useEffect(() => {
		resetTimer();
	}, [request, resetTimer]);

	useEffect(() => {
		getAllTargets();
		if (isAddCategorySuccess || isDeleteTargetSuccess || isSumSavingsAdded) {
			getAllTargets();
		}
	}, [getAllTargets, isAddCategorySuccess, isDeleteTargetSuccess, isSumSavingsAdded]);

	useEffect(() => {
		getFiveOperations();
	}, [getFiveOperations]);

	const handleIdName = (id: number, name: string) => {
		setSavingsTargetName(name);
		setSavingsTargetId(String(id));
	};

	function renderSavingsStatus(status: SavingsTargetStatus) {
		return status === SavingsTargetStatus.inProgress
			? SavingsTargetStatusName.inProgress
			: SavingsTargetStatusName.achieved;
	}

	function renderSavingsItemList() {
		return allTargets.map((item, index) => {
			return (
				<li
					key={index}
					onMouseEnter={() => setHoveredIndex(index)}
					onMouseLeave={() => setHoveredIndex(null)}
					className={editIndex === index ? styles.activeEditItem : ""}>
					<div className={styles.wrapperListContentBlock__category}>
						<div className={styles.inputEditWrapper}>
							{editIndex === index && editField === SavingsFieldValues.name ? (
								<input
									className={styles.inputEdit}
									type={InputTypeList.Text}
									value={editValue}
									onChange={(e) => setEditValue(e.target.value)}
								/>
							) : (
								<p className={styles.inputEditWrapper__textCategory}>{item.name}</p>
							)}
							<div
								className={styles.editIcon}
								style={{
									display: hoveredIndex === index || editIndex === index ? "flex" : "none",
								}}
								onClick={() =>
									editIndex === index && editField === SavingsFieldValues.name
										? handleSaveClick()
										: handleEditClick({ index, field: SavingsFieldValues.name, value: item.name })
								}
								role="button">
								{editIndex === index && editField === SavingsFieldValues.name ? <CheckIcon /> : <EditIcon />}
							</div>
						</div>
					</div>

					<div className={styles.wrapperListContentBlock__target}>
						<div className={styles.inputEditWrapper}>
							<div
								className={styles.editIcon}
								style={{
									display: hoveredIndex === index || editIndex === index ? "flex" : "none",
								}}
								onClick={() =>
									editIndex === index && editField === SavingsFieldValues.amount
										? handleSaveClick()
										: handleEditClick({ index, field: SavingsFieldValues.amount, value: item.amount })
								}
								role="button">
								{editIndex === index && editField === SavingsFieldValues.amount ? <CheckIcon /> : <EditIcon />}
							</div>
							{editIndex === index && editField === SavingsFieldValues.amount ? (
								<input
									className={`${styles.inputEdit} ${styles.inputEdit__target}`}
									type={InputTypeList.Number}
									value={editValue}
									onChange={(e) => setEditValue(e.target.value)}
								/>
							) : (
								<p className={styles.inputEditWrapper__textTarget}>{item.amount}</p>
							)}
						</div>
					</div>

					<div className={styles.wrapperListContentBlock__sum}>
						<p>{item.current_sum}</p>
					</div>
					<div className={styles.wrapperListContentBlock__status}>
						<p>{renderSavingsStatus(item.status)}</p>
					</div>
					<div
						className={styles.wrapperListContentBlock__actionElement}
						onClick={() => handleMoreClick(index)}
						role="button">
						<MoreIcon />
						{openMoreIndex === index && (
							<div className={styles.wrapperListContentMore}>
								<p className={styles.wrapperListContentMore__close}>Закрыть цель</p>
								<p>Вернуть средства на счет</p>
							</div>
						)}
					</div>
				</li>
			);
		});
	}

	const renderSavingsTransactions = (fiveOperationsAndNames: IOperation[]) => {
		if (fiveOperationsWithNames) {
			return fiveOperationsAndNames.map((savingsData, index) => (
				<li key={index}>
					<SavingsTransaction
						date={savingsData.date}
						name={savingsData.name}
						amount={savingsData.amount}
						id={savingsData.id}
						type={""}
						categories={savingsData.categories}
						onDeleteClick={() => undefined}
						editClick={() => [setIsSumEdit(true), setIdSaving(String(savingsData.id))]}
					/>
				</li>
			));
		}
	};

	return (
		<div className={styles.savingsPageWrap}>
			<div className={styles.savingsPageContainer}>
				<form className={styles.savingsFormContentWrapper}>
					<h1 className={styles.headerTitle}>Накопления</h1>
					<div className={styles.savingsFormContentWrapperChoice}>
						<div className={styles.savingsByDateContainer}>
							<div className={styles.totalAmountWrapper}>
								<p className={styles.totalAmountWrapper__savings}>Общая сумма накоплений </p>
								<p className={styles.totalAmountWrapper__sum}>4 112 500 ₽</p>
							</div>
							<div className={styles.dateSelectionWrapper}>
								<InputDate control={control} name={"date"} />
							</div>
						</div>
						<div className={styles.savingsDetailsContainer}>
							<div className={styles.savingsDetailsContainer__category}>
								<CategorySelect
									name={"name"}
									label={"Накопления"}
									options={allTargets}
									placeholder="Выберите категорию"
									control={control}
									onAddCategory={() => setIsCategoryModalOpen(true)}
									onRemoveCategory={(id, name) => [setIsDeleteTargetModalOpen(true), handleIdName(id, name)]}
								/>
							</div>
							<div className={styles.savingsDetailsContainer__sum}>
								<AppInput
									control={control}
									label={"Сумма"}
									type={InputTypeList.Number}
									name={"current_sum"}
									placeholder={"0.00 ₽"}
								/>
							</div>

							<AddButton onClick={handleSubmit(onSubmit)} type={InputTypeList.Submit} />
						</div>
					</div>
					<div className={styles.savingsFormContentWrapperList}>
						<div className={styles.wrapperList__header}>
							<ul className={styles.wrapperListHeaderBlock}>
								<li className={styles.wrapperListHeaderBlock__category}>Категория</li>
								<li className={styles.wrapperListHeaderBlock__target}>
									<div className={styles.wrapperListHeaderBlock__targetPosition}>
										<p>Цель, ₽</p>
										<div onClick={handleSortByTarget} role="button">
											<SortIcon classNames={styles.sortIcon} />
										</div>
									</div>
								</li>
								<li className={styles.wrapperListHeaderBlock__sum}>
									<div className={styles.wrapperListHeaderBlock__sumPosition}>
										<p>Сумма, ₽</p>
										<div className={styles.sortIcon} onClick={handleSortBySum} role="button">
											<SortIcon />
										</div>
									</div>
								</li>
								<li className={styles.wrapperListHeaderBlock__status}>Статус</li>
							</ul>
						</div>
						<div className={styles.wrapperList__content}>
							<ul className={styles.wrapperListContentBlock}>{renderSavingsItemList()}</ul>
						</div>
					</div>
				</form>
				{isAddCategoryModalOpen && (
					<SavingsAddTargetModal
						open={isAddCategoryModalOpen}
						onCancelClick={() => setIsCategoryModalOpen(false)}
						request={addSavingsCategory}
					/>
				)}
				{isDeleteTargetModalOpen && (
					<CategoryDeleteModal
						open={isDeleteTargetModalOpen}
						category={savingsTargetName}
						id={savingsTargetId}
						requestDeleteApi={deleteSavingsCategory}
						onCancelClick={() => setIsDeleteTargetModalOpen(false)}
						requestArchiveApi={() => undefined}
						operations={[]}
					/>
				)}
				<div className={styles.savingsTransactionWrapper}>
					<h2 className={styles.savingsTransactionHeader}>Последние операции по накоплениям</h2>
					<ul className={styles.savingsTransaction}>
						{savingsTransactions && renderSavingsTransactions(fiveOperations)}
					</ul>
				</div>
				{isSumEdit && (
					<EditTransactionModal
						open={isSumEdit}
						id={idSaving}
						request={editTransaction}
						cancelEdit={() => setIsSumEdit(false)}
					/>
				)}
			</div>
		</div>
	);
}

export default Savings;

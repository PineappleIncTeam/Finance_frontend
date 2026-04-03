import { ChangeEvent, useCallback, useEffect, useMemo, useState } from "react";
import { useDispatch } from "react-redux";
import { useForm } from "react-hook-form";
import axios from "axios";
import { useRouter } from "next/navigation";

import { useRuntimeEnv } from "../../../hooks/useRuntimeEnv";
import { useHandleLogout } from "../../../hooks/useHandleLogout";
import { useLogoutTimer } from "../../../hooks/useLogoutTimer";
import { useDebouncedCallback } from "../../../hooks/useDebounce";
import { useAppSelector } from "../../../services/redux/hooks";

import { IAnalyticsInputForm } from "../../../types/pages/Analytics";
import { DisplayMode, fileLoadTypeList, Operation } from "../../../helpers/analytics";
import { generateRandomColors } from "../../../utils/generateRandomColor";
import { mockBaseUrl } from "../../../mocks/envConsts";
import {
	balanceActions,
	reportCategoriesActions,
	reportsStatisticsActions,
} from "../../../types/redux/sagaActions/storeSaga.actions";
import {
	reportsExpensesCategoriesSelector,
	reportsProfitCategoriesSelector,
	reportsTargetsCategoriesSelector,
} from "../../../services/redux/features/reportsCategories/reportsCategorySelector";
import { reportStatisticsSelector } from "../../../services/redux/features/reportStatistics/reportStatisticsSelector";
import { balanceSelector } from "../../../services/redux/features/userBalance/balanceSelector";
import { getStatisticPdfFile } from "../../../services/api/userProfile/getStatisticPdfFile";
import { MainPath } from "../../../services/router/routes";
import { calculateDaysBetween } from "../../../utils/calculateDaysBetween";
import { getStatisticXslFile } from "../../../services/api/userProfile/getStatisticXslFile";
import { downloadFile } from "../../../utils/downloadFile";

function useAnalyticsPage() {
	const { control, watch } = useForm<IAnalyticsInputForm>({
		defaultValues: {
			sum: "",
			number: "Расходы",
			date: [],
		},
		mode: "all",
		delayError: 200,
	});

	const selectedOperation = watch("number");
	const selectedDate = watch("date");
	const operation: string = selectedOperation || Operation.Expenses;

	const hundredPercents = 100;
	const debounceDelay = 200;
	const fileNameLastLetterIndex = 19;
	const windowSizeDefault = 1440;
	const windowSizeM = 1024;
	const windowSizeS = 768;
	const windowSizeXS = 460;
	const windowResizeLabel = 600;

	const operationRowValues = {
		minimalRowValue: 0,
		expensesRowValue: 8,
		incomeRowValue: 5,
	};

	const chartHeightValues = {
		mobileDisplayValue: 238,
		desktopDisplayValue: 298,
	};

	let maximalRowValue: number = 0;

	if (operation === Operation.Expenses) {
		maximalRowValue = operationRowValues.expensesRowValue;
	} else if (operation === Operation.Income) {
		maximalRowValue = operationRowValues.incomeRowValue;
	}

	const [windowWidth, setWindowWidth] = useState<number>(windowSizeDefault);
	const [displayMode, setDisplayMode] = useState(DisplayMode.RUB);

	const { getSafeEnvVar } = useRuntimeEnv(["NEXT_PUBLIC_BASE_URL"]);

	const baseUrl = getSafeEnvVar("NEXT_PUBLIC_BASE_URL", mockBaseUrl);
	const { request } = useHandleLogout(baseUrl);
	const { resetTimer, setIsOpenInactivityLogoutModal, isOpenInactivityLogoutModal } = useLogoutTimer(request);

	const dispatch = useDispatch();
	const router = useRouter();

	const profitMoneyData = useAppSelector(reportsProfitCategoriesSelector);
	const expensesData = useAppSelector(reportsExpensesCategoriesSelector);
	const savingsData = useAppSelector(reportsTargetsCategoriesSelector);

	const reportStatisticData = useAppSelector(reportStatisticsSelector).data;

	const balanceData = useAppSelector(balanceSelector);

	const isEmptyPage = false;
	// reportStatisticData.total_expenses === 0 &&
	// reportStatisticData.total_income === 0 &&
	// reportStatisticData.total_savings === 0;

	const gettingIsLabel = useMemo(() => windowWidth > windowResizeLabel, [windowWidth]);

	const gettingChartHeight = useMemo(() => {
		return windowWidth < windowSizeS ? chartHeightValues.mobileDisplayValue : chartHeightValues.desktopDisplayValue;
		// eslint-disable-next-line react-hooks/exhaustive-deps
	}, [windowWidth]);

	const gettingItemsToShow = useMemo(() => {
		if (operation === Operation.Income) {
			if (windowWidth > windowSizeDefault) {
				return maximalRowValue;
			} else if (windowWidth <= windowSizeDefault && windowWidth > windowSizeM) {
				return operationRowValues.minimalRowValue;
			} else if (windowWidth <= windowSizeM && windowWidth > windowSizeS) {
				return maximalRowValue;
			} else if (windowWidth <= windowSizeS) {
				return operationRowValues.minimalRowValue;
			}
			return maximalRowValue;
		} else {
			return windowWidth <= windowSizeDefault ? operationRowValues.minimalRowValue : maximalRowValue;
		}
	}, [windowWidth, operation, maximalRowValue, operationRowValues.minimalRowValue]);

	const rawAnalysisData = [reportStatisticData.total_income, reportStatisticData.total_expenses];

	const expensesLabelsLengthValue = expensesData.length;
	const profitMoneyLengthValue = profitMoneyData.length;

	const analysisLabels: string[] = ["Общий расход", "Общий доход"];

	const handleResize = useDebouncedCallback(() => {
		setWindowWidth(window.innerWidth);
	}, debounceDelay);

	useEffect(() => {
		dispatch(reportCategoriesActions.pending({ baseURL: baseUrl }));
		dispatch(reportsStatisticsActions.pending({ baseURL: baseUrl }));
		dispatch(balanceActions.pending({ baseURL: baseUrl }));
		// eslint-disable-next-line react-hooks/exhaustive-deps
	}, []);

	useEffect(() => {
		setWindowWidth(window.innerWidth);
		window.addEventListener("resize", handleResize);

		return () => {
			window.removeEventListener("resize", handleResize);
		};
	}, [handleResize]);

	const handleDisplayChange = useCallback((event: ChangeEvent<HTMLInputElement>) => {
		const value = event.target.value as DisplayMode;
		setDisplayMode(value);
	}, []);

	const randomExpensesColorSet = useMemo(() => {
		return generateRandomColors(expensesLabelsLengthValue);
	}, [expensesLabelsLengthValue]);

	const randomIncomeColorSet = useMemo(() => {
		return generateRandomColors(profitMoneyLengthValue);
	}, [profitMoneyLengthValue]);

	function getExpensesDetailsData(mode: "labels" | "rawData") {
		if (mode === "labels") {
			return expensesData.map((expenseData) => expenseData.category_name);
		}

		return expensesData.map((expenseData) => expenseData.amount);
	}

	const gettingExpensesData = useMemo(
		() => ({
			labels: getExpensesDetailsData("labels") as string[],
			datasets: [
				{
					label: "Расходы",
					data: getExpensesDetailsData("rawData").map((value) =>
						displayMode === DisplayMode.RUB
							? value
							: ((Number(value) / reportStatisticData.total_expenses) * hundredPercents).toFixed(2),
					),
					backgroundColor: randomExpensesColorSet,
					borderWidth: 0,
				},
			],
		}),
		// eslint-disable-next-line react-hooks/exhaustive-deps
		[displayMode, randomExpensesColorSet],
	);

	function getIncomeDetailsData(mode: "labels" | "rawData") {
		if (mode === "labels") {
			return profitMoneyData.map((expenseData) => expenseData.category_name);
		}

		return profitMoneyData.map((expenseData) => expenseData.amount);
	}

	const gettingIncomeData = useMemo(
		() => ({
			labels: getIncomeDetailsData("labels") as string[],
			datasets: [
				{
					label: "Доходы",
					data: getIncomeDetailsData("rawData").map((value) =>
						displayMode === DisplayMode.RUB
							? value
							: ((Number(value) / reportStatisticData.total_income) * hundredPercents).toFixed(2),
					),
					backgroundColor: randomIncomeColorSet,
					borderWidth: 0,
				},
			],
		}),
		// eslint-disable-next-line react-hooks/exhaustive-deps
		[displayMode, randomIncomeColorSet],
	);

	const gettingDisplayExpensesData = useMemo(
		() =>
			gettingExpensesData.labels.map((label, index) => ({
				title: label,
				value: gettingExpensesData.datasets[0].data[index],
				background: gettingExpensesData.datasets[0].backgroundColor[index],
			})),
		[gettingExpensesData],
	);

	const gettingDisplayIncomesData = useMemo(
		() =>
			gettingIncomeData.labels.map((label, index) => ({
				title: label,
				value: gettingIncomeData.datasets[0].data[index],
				background: gettingIncomeData.datasets[0].backgroundColor[index],
			})),
		[gettingIncomeData],
	);

	// TODO: Replace with date response

	// const gettingMonthNames = useMemo(() => {
	// 	if (windowWidth <= windowSizeS) {
	// 		return ["Янв.", "Февр.", "Март", "Апр.", "Май", "Июн.", "Июль", "Авг.", "Сент.", "Окт.", "Нояб.", "Дек."];
	// 	} else {
	// 		return Object.keys(monthlyExpenses);
	// 	}
	// }, [windowWidth]);

	// const gettingRotation = useMemo(() => {
	// 	if (windowWidth <= windowSizeS) {
	// 		return { maxRotation: 90, minRotation: 90 };
	// 	} else {
	// 		return { maxRotation: 0, minRotation: 0 };
	// 	}
	// }, [windowWidth]);

	// const gettingRotationOptions = useMemo(
	// 	() => ({
	// 		responsive: true,
	// 		maintainAspectRatio: false,
	// 		scales: {
	// 			x: {
	// 				ticks: {
	// 					autoSkip: false,
	// 					maxRotation: gettingRotation.maxRotation,
	// 					minRotation: gettingRotation.minRotation,
	// 				},
	// 				grid: {
	// 					display: false,
	// 				},
	// 				stacked: true,
	// 			},
	// 			y: {
	// 				border: {
	// 					display: false,
	// 				},
	// 				beginAtZero: true,
	// 				ticks: {
	// 					stepSize: 5000,
	// 					callback: (tickValue: string | number) => {
	// 						const value = typeof tickValue === "string" ? parseFloat(tickValue) : tickValue;
	// 						if (window.innerWidth <= windowSizeXS && value >= 1000) {
	// 							return value / 1000 + "K";
	// 						}
	// 						return value;
	// 					},
	// 				},
	// 				stacked: true,
	// 			},
	// 		},
	// 	}),
	// 	[gettingRotation, windowWidth],
	// );

	// const gettingDataIncome = useMemo(() => {
	// 	const uniqueLabels = Array.from(
	// 		new Set(
	// 			Object.values(monthlyExpenses)
	// 				.flat()
	// 				.map((expense) => Object.keys(expense)[0]),
	// 		),
	// 	);

	// 	const dataSetsIncome = uniqueLabels.map((label, index) => {
	// 		const typedLabel = label as ExpenseLabel;

	// 		if (typedLabel in expensesMapping) {
	// 			return {
	// 				label: expensesMapping[typedLabel].label,
	// 				data: Object.keys(monthlyExpenses).map((month) => {
	// 					const expenseData = monthlyExpenses[month].find((exp) => Object.keys(exp)[0] === typedLabel);
	// 					return expenseData ? expenseData[typedLabel] : 0;
	// 				}),
	// 				backgroundColor: randomColorSet[index % randomColorSet.length],
	// 				barThickness: 10,
	// 			};
	// 		} else {
	// 			return {
	// 				label: label,
	// 				data: Array(Object.keys(monthlyExpenses).length).fill(0),
	// 				backgroundColor: randomColorSet[index % randomColorSet.length],
	// 				barThickness: 10,
	// 			};
	// 		}
	// 	});

	// 	return {
	// 		labels: gettingMonthNames,
	// 		datasets: dataSetsIncome,
	// 	};
	// }, [gettingMonthNames, randomColorSet]);

	const gettingDataAnalysis = useMemo(
		() => ({
			labels: analysisLabels,
			datasets: [
				{
					data: rawAnalysisData.map((value) =>
						displayMode === DisplayMode.RUB
							? value
							: ((value / balanceData.currentBalance) * hundredPercents).toFixed(2),
					),
					backgroundColor: randomExpensesColorSet,
					borderWidth: 0,
				},
			],
		}),
		// eslint-disable-next-line react-hooks/exhaustive-deps
		[displayMode, randomExpensesColorSet],
	);

	const gettingOptionsAnalysis = useMemo(
		() => ({
			cutout: "60%",
		}),
		[],
	);

	const gettingDisplayDataAnalysis = useMemo(
		() =>
			gettingDataAnalysis.labels.map((label, index) => ({
				title: label,
				value: gettingDataAnalysis.datasets[0].data[index],
				background: gettingDataAnalysis.datasets[0].backgroundColor[index],
			})),
		[gettingDataAnalysis],
	);

	async function handlePdfButtonClick() {
		try {
			const days = calculateDaysBetween(selectedDate);

			const responses = await Promise.all(
				fileLoadTypeList.map((type) =>
					getStatisticPdfFile(baseUrl, {
						type,
						days,
					}),
				),
			);

			responses.forEach((response, index) => {
				if (response.data) {
					const fileName = `report_${fileLoadTypeList[index]}_${new Date().toISOString().substring(0, fileNameLastLetterIndex)}.pdf`;
					downloadFile(response.data, fileName);
				}
			});
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
	}

	async function handleXslButtonClick() {
		try {
			const days = calculateDaysBetween(selectedDate);

			const responses = await Promise.all(
				fileLoadTypeList.map((type) =>
					getStatisticXslFile(baseUrl, {
						type,
						days,
					}),
				),
			);

			responses.forEach((response, index) => {
				if (response.data) {
					const fileName = `report_${fileLoadTypeList[index]}_${new Date().toISOString().substring(0, fileNameLastLetterIndex)}.xlsx`;
					downloadFile(response.data, fileName);
				}
			});
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
	}

	return {
		control,
		isOpenInactivityLogoutModal,
		isEmptyPage,
		operation,
		gettingIsLabel,
		displayMode,
		gettingDataAnalysis,
		gettingOptionsAnalysis,
		gettingDisplayDataAnalysis,
		gettingDisplayExpensesData,
		gettingDisplayIncomesData,
		minimalRowValue: operationRowValues.minimalRowValue,
		maximalRowValue,
		windowSizeXS,
		gettingItemsToShow,
		gettingIncomeData,
		gettingChartHeight,
		gettingExpensesData,
		analyticsIncomeTransactions: profitMoneyData,
		analyticsExpensesTransactions: expensesData,
		analyticsSavingsTransactions: savingsData,
		balanceData,
		reportStatisticData,
		setIsOpenInactivityLogoutModal,
		resetTimer,
		request,
		handleDisplayChange,
		handlePdfButtonClick,
		handleXslButtonClick,
	};
}

export default useAnalyticsPage;

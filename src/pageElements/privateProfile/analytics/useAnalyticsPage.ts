import { ChangeEvent, useCallback, useEffect, useMemo, useState } from "react";
import { useDispatch } from "react-redux";
import { useForm } from "react-hook-form";

import { useRuntimeEnv } from "../../../hooks/useRuntimeEnv";
import { useHandleLogout } from "../../../hooks/useHandleLogout";
import { useLogoutTimer } from "../../../hooks/useLogoutTimer";
import { useDebouncedCallback } from "../../../hooks/useDebounce";

import { ExpenseLabel, IAnalyticsInputForm } from "../../../types/pages/Analytics";
import { DisplayMode, Operation } from "../../../helpers/analytics";
import {
	expensesLabels,
	expensesMapping,
	monthlyExpenses,
	rawExpensesData,
} from "../../../mocks/analytics/analyticsMocks";
import { generateRandomColors } from "../../../utils/generateRandomColor";
import { mockBaseUrl } from "../../../mocks/envConsts";
import {
	balanceActions,
	reportCategoriesActions,
	reportsStatisticsActions,
} from "../../../types/redux/sagaActions/storeSaga.actions";

function useAnalyticsPage() {
	const { control, watch } = useForm<IAnalyticsInputForm>({
		defaultValues: {
			sum: "",
			number: "Расходы",
		},
		mode: "all",
		delayError: 200,
	});

	const selectedOperation = watch("number");
	const operation: string = selectedOperation || Operation.Expenses;

	const windowSize = 1440;
	const windowSizeM = 1024;
	const windowSizeS = 768;
	const windowSizeXS = 460;
	const windowResizeLabel = 600;
	const minimalRowValue = 0;

	let maximalRowValue: number = 0;

	if (operation === Operation.Expenses) {
		maximalRowValue = 8;
	} else if (operation === Operation.Income) {
		maximalRowValue = 5;
	}

	const [windowWidth, setWindowWidth] = useState<number>(1440);
	const [displayMode, setDisplayMode] = useState(DisplayMode.RUB);
	const isEmptyPage = false;

	const { getSafeEnvVar } = useRuntimeEnv(["NEXT_PUBLIC_BASE_URL"]);

	const baseUrl = getSafeEnvVar("NEXT_PUBLIC_BASE_URL", mockBaseUrl);
	const { request } = useHandleLogout(baseUrl);
	const { resetTimer, setIsOpenInactivityLogoutModal, isOpenInactivityLogoutModal } = useLogoutTimer(request);

	const dispatch = useDispatch();

	const gettingIsLabel = useMemo(() => windowWidth > windowResizeLabel, [windowWidth]);

	const gettingChartHeight = useMemo(() => {
		return windowWidth < windowSizeS ? 238 : 298;
	}, [windowWidth]);

	const gettingRotation = useMemo(() => {
		if (windowWidth <= windowSizeS) {
			return { maxRotation: 90, minRotation: 90 };
		} else {
			return { maxRotation: 0, minRotation: 0 };
		}
	}, [windowWidth]);

	const gettingItemsToShow = useMemo(() => {
		if (operation === Operation.Income) {
			if (windowWidth > windowSize) {
				return maximalRowValue;
			} else if (windowWidth <= windowSize && windowWidth > windowSizeM) {
				return minimalRowValue;
			} else if (windowWidth <= windowSizeM && windowWidth > windowSizeS) {
				return maximalRowValue;
			} else if (windowWidth <= windowSizeS) {
				return minimalRowValue;
			}
			return maximalRowValue;
		} else {
			return windowWidth <= windowSize ? minimalRowValue : maximalRowValue;
		}
	}, [windowWidth, operation, maximalRowValue, minimalRowValue]);

	const rawAnalysisData = [50000, 50000];

	const expensesLabelsLengthValue = expensesLabels.length;

	const analysisLabels: string[] = ["Общий расход", "Общий доход"];

	const gettingMonthNames = useMemo(() => {
		if (windowWidth <= windowSizeS) {
			return ["Янв.", "Февр.", "Март", "Апр.", "Май", "Июн.", "Июль", "Авг.", "Сент.", "Окт.", "Нояб.", "Дек."];
		} else {
			return Object.keys(monthlyExpenses);
		}
	}, [windowWidth]);

	const handleResize = useDebouncedCallback(() => {
		setWindowWidth(window.innerWidth);
	}, 200);

	useEffect(() => {
		dispatch(reportCategoriesActions.pending({ baseURL: baseUrl }));
		dispatch(reportsStatisticsActions.pending({ baseURL: baseUrl }));
		dispatch(balanceActions.pending({ baseURL: baseUrl }));
		// eslint-disable-next-line react-hooks/exhaustive-deps
	}, [dispatch]);

	useEffect(() => {
		setWindowWidth(window.innerWidth);
		window.addEventListener("resize", handleResize);

		return () => {
			window.removeEventListener("resize", handleResize);
		};
		// eslint-disable-next-line react-hooks/exhaustive-deps
	}, [handleResize]);

	const handleDisplayChange = useCallback((event: ChangeEvent<HTMLInputElement>) => {
		const value = event.target.value as DisplayMode;
		setDisplayMode(value);
	}, []);

	const randomColorSet = useMemo(() => {
		return generateRandomColors(expensesLabelsLengthValue);
	}, [expensesLabelsLengthValue]);

	const gettingExpensesData = useMemo(
		() => ({
			labels: expensesLabels,
			datasets: [
				{
					label: "Расходы",
					data: rawExpensesData.map((value) =>
						displayMode === DisplayMode.RUB ? value : ((value / 130000) * 100).toFixed(2),
					),
					backgroundColor: randomColorSet,
					borderWidth: 0,
				},
			],
		}),
		[displayMode, randomColorSet],
	);

	const gettingDataIncome = useMemo(() => {
		const uniqueLabels = Array.from(
			new Set(
				Object.values(monthlyExpenses)
					.flat()
					.map((expense) => Object.keys(expense)[0]),
			),
		);

		const dataSetsIncome = uniqueLabels.map((label, index) => {
			const typedLabel = label as ExpenseLabel;

			if (typedLabel in expensesMapping) {
				return {
					label: expensesMapping[typedLabel].label,
					data: Object.keys(monthlyExpenses).map((month) => {
						const expenseData = monthlyExpenses[month].find((exp) => Object.keys(exp)[0] === typedLabel);
						return expenseData ? expenseData[typedLabel] : 0;
					}),
					backgroundColor: randomColorSet[index % randomColorSet.length],
					barThickness: 10,
				};
			} else {
				return {
					label: label,
					data: Array(Object.keys(monthlyExpenses).length).fill(0),
					backgroundColor: randomColorSet[index % randomColorSet.length],
					barThickness: 10,
				};
			}
		});

		return {
			labels: gettingMonthNames,
			datasets: dataSetsIncome,
		};
	}, [gettingMonthNames, randomColorSet]);

	const gettingDisplayExpensesData = useMemo(
		() =>
			gettingExpensesData.labels.map((label, index) => ({
				title: label,
				value: gettingExpensesData.datasets[0].data[index],
				background: gettingExpensesData.datasets[0].backgroundColor[index],
			})),
		[gettingExpensesData],
	);

	const gettingRotationOptions = useMemo(
		() => ({
			responsive: true,
			maintainAspectRatio: false,
			scales: {
				x: {
					ticks: {
						autoSkip: false,
						maxRotation: gettingRotation.maxRotation,
						minRotation: gettingRotation.minRotation,
					},
					grid: {
						display: false,
					},
					stacked: true,
				},
				y: {
					border: {
						display: false,
					},
					beginAtZero: true,
					ticks: {
						stepSize: 5000,
						callback: (tickValue: string | number) => {
							const value = typeof tickValue === "string" ? parseFloat(tickValue) : tickValue;
							if (window.innerWidth <= windowSizeXS && value >= 1000) {
								return value / 1000 + "K";
							}
							return value;
						},
					},
					stacked: true,
				},
			},
		}),
		[gettingRotation, windowWidth],
	);

	const gettingDataAnalysis = useMemo(
		() => ({
			labels: analysisLabels,
			datasets: [
				{
					data: rawAnalysisData.map((value) =>
						displayMode === DisplayMode.RUB ? value : ((value / 130000) * 100).toFixed(2),
					),
					backgroundColor: randomColorSet,
					borderWidth: 0,
				},
			],
		}),
		[displayMode, randomColorSet],
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
		minimalRowValue,
		maximalRowValue,
		windowSizeXS,
		gettingItemsToShow,
		gettingDataIncome,
		gettingRotationOptions,
		gettingChartHeight,
		gettingExpensesData,
		setIsOpenInactivityLogoutModal,
		resetTimer,
		request,
		handleDisplayChange,
	};
}

export default useAnalyticsPage;

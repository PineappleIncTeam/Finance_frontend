import { ChangeEvent, useEffect, useMemo, useState } from "react";
import { useForm } from "react-hook-form";

import { useRuntimeEnv } from "../../../hooks/useRuntimeEnv";
import { useHandleLogout } from "../../../hooks/useHandleLogout";
import { useLogoutTimer } from "../../../hooks/useLogoutTimer";

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

	const [itemsToShow, setItemsToShow] = useState(maximalRowValue);
	const [displayMode, setDisplayMode] = useState(DisplayMode.RUB);
	const [chartHeight, setChartHeight] = useState(298);
	const [rotation, setRotation] = useState({ maxRotation: 0, minRotation: 0 });
	const [isLabel, setIsLabel] = useState(true);
	const isEmptyPage = false;

	const { getSafeEnvVar } = useRuntimeEnv(["NEXT_PUBLIC_BASE_URL"]);

	const baseUrl = getSafeEnvVar("NEXT_PUBLIC_BASE_URL", mockBaseUrl);
	const { request } = useHandleLogout(baseUrl);
	const { resetTimer, setIsOpenInactivityLogoutModal, isOpenInactivityLogoutModal } = useLogoutTimer(request);

	const handleResizeIsLabel = () => {
		setIsLabel(window.innerWidth > windowResizeLabel);
	};

	const rawAnalysisData = [50000, 50000];

	const expensesLabelsLengthValue = expensesLabels.length;

	const analysisLabels: string[] = ["Общий расход", "Общий доход"];

	const [monthNames, setMonthNames] = useState(Object.keys(monthlyExpenses));

	const updateMonthNames = () => {
		if (window.innerWidth <= windowSizeS) {
			setMonthNames(["Янв.", "Февр.", "Март", "Апр.", "Май", "Июн.", "Июль", "Авг.", "Сент.", "Окт.", "Нояб.", "Дек."]);
		} else {
			setMonthNames(Object.keys(monthlyExpenses));
		}
	};

	const updateChartHeight = () => {
		const width = window.innerWidth;
		if (width < windowSizeS) {
			setChartHeight(238);
		} else {
			setChartHeight(298);
		}
	};

	useEffect(() => {
		const handleResize = () => {
			if (window.innerWidth <= windowSizeS) {
				setRotation({ maxRotation: 90, minRotation: 90 });
			} else {
				setRotation({ maxRotation: 0, minRotation: 0 });
			}

			if (operation === Operation.Income) {
				if (window.innerWidth > windowSize) {
					setItemsToShow(maximalRowValue);
				} else if (window.innerWidth <= windowSize && window.innerWidth > windowSizeM) {
					setItemsToShow(minimalRowValue);
				} else if (window.innerWidth <= windowSizeM && window.innerWidth > windowSizeS) {
					setItemsToShow(maximalRowValue);
				} else if (window.innerWidth <= windowSizeS) {
					setItemsToShow(minimalRowValue);
				}
			} else {
				setItemsToShow(window.innerWidth <= windowSize ? minimalRowValue : maximalRowValue);
			}
		};

		updateChartHeight();
		updateMonthNames();
		handleResize();
		handleResizeIsLabel();

		window.addEventListener("resize", handleResize);
		window.addEventListener("resize", updateChartHeight);
		window.addEventListener("resize", updateMonthNames);
		window.addEventListener("resize", handleResizeIsLabel);

		return () => {
			window.removeEventListener("resize", handleResize);
			window.removeEventListener("resize", updateChartHeight);
			window.removeEventListener("resize", updateMonthNames);
			window.removeEventListener("resize", handleResizeIsLabel);
		};
		// eslint-disable-next-line react-hooks/exhaustive-deps
	}, []);

	const handleDisplayChange = (event: ChangeEvent<HTMLInputElement>) => {
		const value = event.target.value as DisplayMode;
		setDisplayMode(value);
	};

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
			labels: monthNames,
			datasets: dataSetsIncome,
		};
	}, [monthNames, randomColorSet]);

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
						maxRotation: rotation.maxRotation,
						minRotation: rotation.minRotation,
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
		[rotation],
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
		isLabel,
		displayMode,
		gettingDataAnalysis,
		gettingOptionsAnalysis,
		gettingDisplayDataAnalysis,
		gettingDisplayExpensesData,
		minimalRowValue,
		maximalRowValue,
		windowSizeXS,
		itemsToShow,
		gettingDataIncome,
		gettingRotationOptions,
		chartHeight,
		gettingExpensesData,
		setIsOpenInactivityLogoutModal,
		resetTimer,
		request,
		handleDisplayChange,
	};
}

export default useAnalyticsPage;

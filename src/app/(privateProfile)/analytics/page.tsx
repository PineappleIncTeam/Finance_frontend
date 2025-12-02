"use client";

import { useRouter } from "next/navigation";
import { useState, useEffect, ChangeEvent, useCallback, Key } from "react";
import { useForm } from "react-hook-form";
import axios, { AxiosResponse } from "axios";
import { Pie, Bar, Doughnut } from "react-chartjs-2";
import { Chart as ChartJS, ArcElement, Tooltip, CategoryScale, LinearScale, BarElement } from "chart.js";

import { useHandleLogout } from "../../../hooks/useHandleLogout";
import { useLogoutTimer } from "../../../hooks/useLogoutTimer";
import { useRuntimeEnv } from "../../../hooks/useRuntimeEnv";

import { MoneyIcon } from "../../../assets/script/analytics/MoneyIcon";

import InputDate from "../../../ui/inputDate/inputDate";
import { Selector } from "../../../ui/selector/Selector";
import { IAnalyticsInputForm } from "../../../types/pages/Analytics";
import { InputTypeList } from "../../../helpers/Input";
import { generateRandomColors } from "../../../utils/generateRandomColor";
import { analyticsIncomeTransactions } from "../../../mocks/AnalyticsIncomeTransaction";
import { analyticsExpensesTransactions } from "../../../mocks/AnalyticsExpensesTransaction";
import { analyticsSavingsTransactions } from "../../../mocks/AnalyticsSavingsTransaction";
import { IAnalyticsTransactions } from "../../../types/components/ComponentsTypes";
import AnalystIncomeTransactions from "../../../components/userProfileLayout/analystIncomeTransactions/analystIncomeTransactions";
import AnalystExpensesTransactions from "../../../components/userProfileLayout/analystExpensesTransactions/analystExpensesTransactions";
import AnalystSavingsTransactions from "../../../components/userProfileLayout/analystSavingsTransactions/analystSavingsTransactions";
import InactivityLogoutModal from "../../../components/userProfileLayout/inactivityLogoutModal/inactivityLogoutModal";
import { mockBaseUrl } from "../../../mocks/envConsts";
import { MainPath } from "../../../services/router/routes";
import { getReportsCategories } from "../../../services/api/userProfile/getReportsCategories";
import {
	ICategoryBudget,
	IFinancialTransaction,
	IReportsBalance,
	IReportsStatistics,
} from "../../../types/api/Analytics";
import { getReportsStatistics } from "../../../services/api/userProfile/getReportsStatistics";
import { getReportsBalance } from "../../../services/api/userProfile/getReportsBalance";

import styles from "./analytics.module.scss";

function Analytics() {
	const { control, watch } = useForm<IAnalyticsInputForm>({
		defaultValues: {
			sum: "",
			number: "Расходы",
		},
		mode: "all",
		delayError: 200,
	});

	enum Operation {
		Expenses = "Расходы",
		Income = "Доходы",
		Analysis = "Анализ доходов и расходов",
		ListOfOperations = "Список операций",
	}

	enum DisplayMode {
		RUB = "rub",
		USD = "usd",
		EUR = "eur",
		PERCENT = "percent",
	}

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
	const [listOfOperations, setListOfOperations] = useState<IFinancialTransaction[] & ICategoryBudget>([]);
	const [expensesStatistics, setExpensesStatistics] = useState<number | null>(null);
	const [incomeStatistics, setIncomeStatistics] = useState<number | null>(null);
	const [savingsStatistics, setSavingsStatistics] = useState<number | null>(null);
	const [reportsBalance, setReportsBalance] = useState<number | null>(null);
	const isEmptyPage = false;
	const rawExpensesData = [
		1300.01, 3900.02, 3250.02, 1638.83, 2652.06, 15271.09, 390.0, 975.56, 1340.79, 9110.05, 16192.09, 2600.01, 6437.57,
		1690.01, 26000.15, 520.0, 520.0, 520.0, 520.0, 9586.33,
	];

	const { getSafeEnvVar } = useRuntimeEnv(["NEXT_PUBLIC_BASE_URL"]);

	const baseUrl = getSafeEnvVar("NEXT_PUBLIC_BASE_URL", mockBaseUrl);
	const { request } = useHandleLogout(baseUrl);
	const { resetTimer, setIsOpenInactivityLogoutModal, isOpenInactivityLogoutModal } = useLogoutTimer(request);
	const router = useRouter();
	const handleResizeIsLabel = () => {
		setIsLabel(window.innerWidth > windowResizeLabel);
	};

	function getRawAnalysisData(incomeStatistics: number, expensesStatistics: number) {
		return incomeStatistics && expensesStatistics ? [incomeStatistics, expensesStatistics] : [];
	}

	const expensesLabels = () => {
		if (listOfOperations !== null) {
			return listOfOperations.map((item) => item?.category_name) ?? [];
		}
	};
	const expensesLabelsLengthValue = expensesLabels()?.length || 0;

	const analysisLabels: string[] = ["Общий расход", "Общий доход"];

	type ExpenseLabel =
		| "Внезапная покупка"
		| "Стрижка"
		| "Бассейн"
		| "Школа"
		| "Еда"
		| "Плата жилья"
		| "Ногти"
		| "Бензин"
		| "Дорога работа"
		| "Юрист"
		| "Детский сад"
		| "Учебники"
		| "Отпуск"
		| "Театр"
		| "Кредит"
		| "Страховка"
		| "Киберспорт"
		| "Путешествия"
		| "Кино"
		| "Ипотека";

	const expensesMapping: Record<ExpenseLabel, { label: string; value: number }> = {
		"Внезапная покупка": { label: "Внезапная покупка", value: 1300.01 },
		Стрижка: { label: "Стрижка", value: 3900.02 },
		Бассейн: { label: "Бассейн", value: 3250.02 },
		Школа: { label: "Школа", value: 1638.83 },
		Еда: { label: "Еда", value: 2652.06 },
		"Плата жилья": { label: "Плата жилья", value: 15271.09 },
		Ногти: { label: "Ногти", value: 390.0 },
		Бензин: { label: "Бензин", value: 975.56 },
		"Дорога работа": { label: "Дорога работа", value: 1340.79 },
		Юрист: { label: "Юрист", value: 9110.05 },
		"Детский сад": { label: "Детский сад", value: 16192.09 },
		Учебники: { label: "Учебники", value: 2600.01 },
		Отпуск: { label: "Отпуск", value: 6437.57 },
		Театр: { label: "Театр", value: 1690.01 },
		Кредит: { label: "Кредит", value: 26000.15 },
		Страховка: { label: "Страховка", value: 520.0 },
		Киберспорт: { label: "Киберспорт", value: 520.0 },
		Путешествия: { label: "Путешествия", value: 520.0 },
		Кино: { label: "Кино", value: 520.0 },
		Ипотека: { label: "Ипотека", value: 9586.33 },
	};

	type MonthlyExpenses = {
		[month: string]: Array<{ [key: string]: number }>;
	};

	const monthlyExpenses: MonthlyExpenses = {
		Январь: [
			{ "Плата жилья": 15271.09 },
			{ Еда: 2652.06 },
			{ Стрижка: 3900.02 },
			{ "Дорога работа": 1340.79 },
			{ Театр: 1690.01 },
			{ Путешествия: 520.0 },
		],
		Февраль: [
			{ "Плата жилья": 15271.09 },
			{ Еда: 2652.06 },
			{ Бассейн: 3250.02 },
			{ Юрист: 9110.05 },
			{ Страховка: 520.0 },
		],
		Март: [
			{ "Плата жилья": 15271.09 },
			{ Еда: 2652.06 },
			{ Школа: 1638.83 },
			{ "Детский сад": 16192.09 },
			{ Киберспорт: 520.0 },
		],
		Апрель: [
			{ "Плата жилья": 15271.09 },
			{ Еда: 2652.06 },
			{ Ногти: 390.0 },
			{ Учебники: 2600.01 },
			{ Театр: 1690.01 },
			{ Ипотека: 9586.33 },
		],
		Май: [
			{ "Плата жилья": 15271.09 },
			{ Еда: 2652.06 },
			{ Бензин: 975.56 },
			{ Отпуск: 6437.57 },
			{ Киберспорт: 520.0 },
			{ Ипотека: 9586.33 },
		],
		Июнь: [
			{ "Плата жилья": 15271.09 },
			{ Еда: 2652.06 },
			{ Бассейн: 3250.02 },
			{ "Детский сад": 16192.09 },
			{ Кредит: 26000.15 },
		],
		Июль: [
			{ "Плата жилья": 15271.09 },
			{ Еда: 2652.06 },
			{ Школа: 1638.83 },
			{ Учебники: 2600.01 },
			{ Театр: 1690.01 },
			{ Кредит: 26000.15 },
		],
		Август: [
			{ "Плата жилья": 15271.09 },
			{ Еда: 2652.06 },
			{ Бензин: 975.56 },
			{ "Дорога работа": 1340.79 },
			{ Кино: 520.0 },
		],
		Сентябрь: [
			{ "Плата жилья": 15271.09 },
			{ Еда: 2652.06 },
			{ Ногти: 390.0 },
			{ Юрист: 9110.05 },
			{ Страховка: 520.0 },
		],
		Октябрь: [
			{ "Плата жилья": 15271.09 },
			{ Еда: 2652.06 },
			{ Стрижка: 3900.02 },
			{ Учебники: 2600.01 },
			{ Кино: 520.0 },
		],
		Ноябрь: [
			{ "Плата жилья": 15271.09 },
			{ Еда: 2652.06 },
			{ Школа: 1638.83 },
			{ Страховка: 520.0 },
			{ Путешествия: 520.0 },
		],
		Декабрь: [
			{ "Плата жилья": 15271.09 },
			{ Еда: 2652.06 },
			{ Бассейн: 3250.02 },
			{ Юрист: 9110.05 },
			{ Отпуск: 6437.57 },
		],
	};

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

	const getListOfOperations = useCallback(async () => {
		try {
			if (baseUrl) {
				const response: AxiosResponse<ICategoryBudget[] & IFinancialTransaction[]> =
					await getReportsCategories(baseUrl);
				if (response !== null && response.status === axios.HttpStatusCode.Ok) {
					setListOfOperations(response.data);
					console.log(response.data);
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
	}, [baseUrl, router]);

	const getCategoriesStatistics = useCallback(async () => {
		try {
			if (baseUrl) {
				const response: AxiosResponse<IReportsStatistics> = await getReportsStatistics(baseUrl);
				if (response !== null && response.status === axios.HttpStatusCode.Ok) {
					setExpensesStatistics(response.data?.total_expenses);
					setIncomeStatistics(response.data?.total_income);
					setSavingsStatistics(response.data?.total_savings);
					console.log(response.data);
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
	}, [baseUrl, router]);

	const getBalance = useCallback(async () => {
		try {
			if (baseUrl) {
				const response: AxiosResponse<IReportsBalance> = await getReportsBalance(baseUrl);
				if (response !== null && response.status === axios.HttpStatusCode.Ok) {
					setReportsBalance(response.data?.current_balance);
					console.log(response.data);
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
	}, [baseUrl, router]);

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

	useEffect(() => {
		getListOfOperations();
	}, [getListOfOperations]);

	useEffect(() => {
		getCategoriesStatistics();
	}, [getCategoriesStatistics]);

	useEffect(() => {
		getBalance();
	}, [getBalance]);

	const handleDisplayChange = (event: ChangeEvent<HTMLInputElement>) => {
		const value = event.target.value as DisplayMode;
		setDisplayMode(value);
	};

	ChartJS.register(ArcElement, Tooltip);
	ChartJS.register(CategoryScale, LinearScale, BarElement);

	const randomColorSet: string[] = generateRandomColors(expensesLabelsLengthValue);

	const data = {
		labels: expensesLabels() ?? [],
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
	};

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

	const dataIncome = {
		labels: monthNames.map((label) => label),
		datasets: dataSetsIncome,
	};

	const displayData = data.labels.map((label, index) => ({
		title: label,
		value: data.datasets[0].data[index],
		background: data.datasets[0].backgroundColor[index],
	}));

	const options = {
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
	};

	const dataAnalysis = {
		labels: analysisLabels,
		datasets: [
			{
				data: getRawAnalysisData(incomeStatistics ?? 0, expensesStatistics ?? 0).map((value) =>
					displayMode === DisplayMode.RUB ? value : ((value / 130000) * 100).toFixed(2),
				),
				backgroundColor: randomColorSet,
				borderWidth: 0,
			},
		],
	};
	const optionsAnalysis = {
		cutout: "60%",
	};

	const displayDataAnalysis = dataAnalysis?.labels?.map((label, index) => ({
		title: label ?? "",
		value: dataAnalysis.datasets[0].data[index] ?? null,
		background: dataAnalysis.datasets[0].backgroundColor[index],
	}));

	const renderEmptyAnalyticsPage = () => (
		<div className={styles.analyticsBlankPage}>
			<p className={styles.analyticsBlankPage__text}>
				К сожалению, этот раздел пока пуст. Начните вести учет финансов в приложении и сможет воспользоваться этим
				разделом.
			</p>

			<MoneyIcon classNames={styles.analyticsBlankPage__image} />
		</div>
	);

	const renderExpenses = () => (
		<div className={styles.analyticsDiagramExpensesWrapper}>
			<div className={styles.analyticsDiagramExpensesInfo}>
				<p className={styles.analyticsDiagramExpensesInfo__title}>Общий расход</p>
				<p className={styles.analyticsDiagramExpensesInfo__value}>{expensesStatistics}</p>
				<p className={styles.analyticsDiagramExpensesInfo__date}>14.09.23 - 20.09.23</p>
			</div>

			<div className={styles.analyticsDiagramExpenses}>
				<div className={styles.diagramExpenses}>
					<Pie data={data} options={{ responsive: true }} />
				</div>

				<div className={styles.diagramExpensesBlock}>
					<div className={styles.diagramExpensesBlockLeft}>
						<ul className={styles.diagramExpensesBlockLeftItems}>
							{displayData.slice(minimalRowValue, maximalRowValue).map((item, index) => (
								<li key={index} className={styles.diagramExpensesBlockLeftItem}>
									<div className={styles.diagramExpensesBlockLeftIconWrapper}>
										<div
											className={styles.diagramExpensesBlockLeftIconWrapper__circle}
											style={{ background: `${item.background}` }}></div>
										<p className={styles.diagramExpensesBlockLeftIconWrapper__text}>{item.title}</p>
									</div>
									<p className={styles.diagramExpensesBlockLeftItem__value}>
										{displayMode === DisplayMode.RUB ? `${item.value} ₽` : `${item.value}%`}
									</p>
								</li>
							))}
						</ul>
					</div>

					<div className={styles.diagramExpensesBlockRight}>
						<ul className={styles.diagramExpensesBlockRightItems}>
							{displayData.slice(itemsToShow).map((item, index) => (
								<li key={index} className={styles.diagramExpensesBlockRightItem}>
									<div className={styles.diagramExpensesBlockRightIconWrapper}>
										<div
											className={styles.diagramExpensesBlockRightIconWrapper__circle}
											style={{ background: `${item.background}` }}></div>
										<p className={styles.diagramExpensesBlockRightIconWrapper__text}>{item.title}</p>
									</div>
									<p className={styles.diagramExpensesBlockRightItem__value}>
										{displayMode === DisplayMode.RUB ? `${item.value} ₽` : `${item.value}%`}
									</p>
								</li>
							))}
						</ul>
					</div>
				</div>
			</div>
		</div>
	);

	const renderIncome = () => (
		<div className={styles.analyticsDiagramIncomeWrapper}>
			<div className={styles.analyticsDiagramIncomeInfoWrapper}>
				<div className={styles.analyticsDiagramIncomeInfo}>
					<p className={styles.analyticsDiagramIncomeInfo__title}>Общий доход</p>
					<p className={styles.analyticsDiagramIncomeInfo__value}>{incomeStatistics}</p>
					<p className={styles.analyticsDiagramIncomeInfo__date}>14.09.23 - 20.09.23</p>
				</div>

				<div className={styles.analyticsDiagramIncome}>
					<div className={styles.diagramIncomeBlockLeft}>
						<ul className={styles.diagramIncomeBlockLeftItems}>
							{displayData.slice(minimalRowValue, maximalRowValue).map((item, index) => (
								<li key={index} className={styles.diagramIncomeBlockLeftItem}>
									<div className={styles.diagramIncomeBlockLeftIconWrapper}>
										<div
											className={styles.diagramIncomeBlockLeftIconWrapper__circle}
											style={{ background: `${item.background}` }}></div>
										<p className={styles.diagramIncomeBlockLeftIconWrapper__text}>{item.title}</p>
									</div>
									<p className={styles.diagramIncomeBlockLeftItem__value}>
										{displayMode === DisplayMode.RUB ? `${item.value} ₽` : `${item.value}%`}
									</p>
								</li>
							))}
						</ul>
					</div>

					{window.innerWidth > windowSizeXS && (
						<div className={styles.diagramIncomeBlockRight}>
							<ul className={styles.diagramIncomeBlockRightItems}>
								{displayData.slice(itemsToShow).map((item, index) => (
									<li key={index} className={styles.diagramIncomeBlockRightItem}>
										<div className={styles.diagramIncomeBlockRightIconWrapper}>
											<div
												className={styles.diagramIncomeBlockRightIconWrapper__circle}
												style={{ background: `${item.background}` }}></div>
											<p className={styles.diagramIncomeBlockRightIconWrapper__text}>{item.title}</p>
										</div>
										<p className={styles.diagramIncomeBlockRightItem__value}>
											{displayMode === DisplayMode.RUB ? `${item.value} ₽` : `${item.value}%`}
										</p>
									</li>
								))}
							</ul>
						</div>
					)}
				</div>
			</div>

			<div className={styles.diagramIncome} style={{ height: chartHeight }}>
				<Bar data={dataIncome} options={options} />
			</div>

			{window.innerWidth <= windowSizeXS && (
				<div className={styles.diagramIncomeBlockRight}>
					<ul className={styles.diagramIncomeBlockRightItems}>
						{displayData.slice(itemsToShow).map((item, index) => (
							<li key={index} className={styles.diagramIncomeBlockRightItem}>
								<div className={styles.diagramIncomeBlockRightIconWrapper}>
									<div
										className={styles.diagramIncomeBlockRightIconWrapper__circle}
										style={{ background: `${item.background}` }}></div>
									<p className={styles.diagramIncomeBlockRightIconWrapper__text}>{item.title}</p>
								</div>
								<p className={styles.diagramIncomeBlockRightItem__value}>
									{displayMode === DisplayMode.RUB ? `${item.value} ₽` : `${item.value}%`}
								</p>
							</li>
						))}
					</ul>
				</div>
			)}
		</div>
	);

	const renderAnalysis = () => (
		<div className={styles.analyticsDiagramAnalysisWrapper}>
			<div className={styles.analyticsDiagramAnalysisInfoWrapper}>
				<div className={styles.analyticsDiagramAnalysisInfo}>
					<p className={styles.analyticsDiagramAnalysisInfo__title}>Ваш баланс</p>
					{reportsBalance && <p className={styles.analyticsDiagramAnalysisInfo__value}>{reportsBalance}</p>}
					<p className={styles.analyticsDiagramAnalysisInfo__date}>14.09.23 - 20.09.23</p>
				</div>

				<div className={styles.analyticsDiagramAnalysis}>
					<div className={styles.diagramAnalysis}>
						<Doughnut data={dataAnalysis} options={optionsAnalysis} />
					</div>

					<div className={styles.diagramAnalysisBlock}>
						<ul className={styles.diagramAnalysisBlockItems}>
							{displayDataAnalysis &&
								displayDataAnalysis.map((item, index) => (
									<li key={index} className={styles.diagramAnalysisBlockItem}>
										<div className={styles.diagramAnalysisBlockIconWrapper}>
											<div
												className={styles.diagramAnalysisBlockIconWrapper__circle}
												style={{ background: `${item.background}` }}></div>
											<p className={styles.diagramAnalysisBlockIconWrapper__text}>{item.title}:</p>
										</div>
										<p className={styles.diagramAnalysisBlockItem__value}>
											{displayMode === DisplayMode.RUB ? `${item.value} ₽` : `${item.value}%`}
										</p>
									</li>
								))}
						</ul>
					</div>
				</div>
			</div>
		</div>
	);

	const renderContentAnalyticsPage = () => (
		<div className={styles.analyticsPagesContent}>
			<div className={styles.analyticsSelectContainer}>
				<div className={styles.analyticsSelectOperation}>
					<Selector
						name={"number"}
						label={"Операции"}
						options={[Operation.Expenses, Operation.Income, Operation.Analysis, Operation.ListOfOperations]}
						control={control}
					/>
				</div>
				<div className={styles.analyticsSelectDateAndPeriod}>
					<InputDate control={control} name={"date"} isPeriod={true} isLabel={isLabel} />
				</div>
			</div>

			<div className={styles.analyticsDisplayWrapper}>
				<p className={styles.analyticsDisplay_title}>Отображать в:</p>
				<div className={styles.analyticsDisplay}>
					<input
						name="value"
						type={InputTypeList.Radio}
						value="rub"
						id="analyticsDisplay__rub"
						checked={displayMode === DisplayMode.RUB}
						className={styles.analyticsDisplay__input}
						onChange={handleDisplayChange}
					/>
					<label htmlFor="analyticsDisplay__rub" className={styles.analyticsDisplay__label}>
						<p className={styles.analyticsDisplay__text}>В рублях</p>
					</label>
					<input
						name="value"
						type={InputTypeList.Radio}
						value="percent"
						id="analyticsDisplay__percent"
						checked={displayMode === DisplayMode.PERCENT}
						onChange={handleDisplayChange}
						className={styles.analyticsDisplay__input}
					/>
					<label htmlFor="analyticsDisplay__percent" className={styles.analyticsDisplay__label}>
						<p className={styles.analyticsDisplay__text}>В процентах</p>
					</label>
				</div>
			</div>

			{operation === Operation.Expenses && renderExpenses()}

			{operation === Operation.Income && renderIncome()}

			{operation === Operation.Analysis && renderAnalysis()}
		</div>
	);

	const renderAnalyticsIncomeTransactions = (transactions: IAnalyticsTransactions[]) => {
		return transactions.map((savingsData, index) => (
			<li key={index}>
				<AnalystIncomeTransactions
					firstDate={savingsData.firstDate}
					secondDate={savingsData.secondDate}
					purpose={savingsData.purpose}
					sum={savingsData.sum}
				/>
			</li>
		));
	};

	const renderAnalyticsExpensesTransactions = (transactions: IFinancialTransaction[] & ICategoryBudget[]) => {
		if (transactions !== null) {
			return transactions.map((data: IFinancialTransaction & ICategoryBudget, index: Key) => (
				<li key={index}>
					<AnalystExpensesTransactions
						month={data.month}
						category_name={data.category_name}
						amount={data.amount}
						category_id={0}
					/>
				</li>
			));
		}
	};

	const renderAnalyticsSavingsTransactions = (transactions: IAnalyticsTransactions[]) => {
		return transactions.map((savingsData, index) => (
			<li key={index}>
				<AnalystSavingsTransactions
					firstDate={savingsData.firstDate}
					secondDate={savingsData.secondDate}
					purpose={savingsData.purpose}
					sum={savingsData.sum}
				/>
			</li>
		));
	};

	const renderListOfOperations = () => (
		<div className={styles.analyticsListOfOperationsWrapper}>
			<div className={styles.analyticsListOfOperationsContainer}>
				<div className={styles.analyticsListOfOperationsSelectsBlock}>
					<div className={styles.analyticsSelectOperation}>
						<Selector
							name={"number"}
							label={"Операции"}
							options={[Operation.Expenses, Operation.Income, Operation.Analysis, Operation.ListOfOperations]}
							control={control}
						/>
					</div>
					<div className={styles.analyticsSelectDateAndPeriod}>
						<InputDate control={control} name={"date"} isPeriod={true} isLabel={isLabel} />
					</div>
				</div>
				<div className={styles.analyticsListOfOperationsDownloadWrapper}>
					<p className={styles.analyticsListOfOperationsDownloadWrapper__title}>Скачать</p>
					<div className={styles.analyticsListOfOperationsButtonContent}>
						<button className={styles.analyticsListOfOperationsButtonContent__PdfButton}>PDF</button>
						<button className={styles.analyticsListOfOperationsButtonContent__XslButton}>XSL</button>
					</div>
				</div>
			</div>

			<div className={styles.analyticsListOfOperationsContent}>
				<div className={styles.analyticsTransactionsWrapper}>
					<h3 className={styles.analyticsTransactionsWrapper__title}>Операции с доходами</h3>
					<ul className={styles.analyticsTransactionsWrapper__item}>
						{analyticsIncomeTransactions && renderAnalyticsIncomeTransactions(analyticsIncomeTransactions)}
					</ul>
				</div>

				<div className={styles.analyticsTransactionsWrapper}>
					<h3 className={styles.analyticsTransactionsWrapper__title}>Операции с расходами</h3>
					<ul className={styles.analyticsTransactionsWrapper__item}>
						{listOfOperations && renderAnalyticsExpensesTransactions(listOfOperations)}
					</ul>
				</div>

				<div className={styles.analyticsTransactionsWrapper}>
					<h3 className={styles.analyticsTransactionsWrapper__title}>Операции с накоплениями</h3>
					<ul className={styles.analyticsTransactionsWrapper__item}>
						{analyticsSavingsTransactions && renderAnalyticsSavingsTransactions(analyticsSavingsTransactions)}
					</ul>
				</div>
			</div>
		</div>
	);

	return (
		<div className={styles.analyticsPageWrap}>
			<div className={styles.analyticsPageContainer}>
				<h1 className={styles.headerTitle}>Аналитика</h1>
				{operation === Operation.ListOfOperations
					? renderListOfOperations()
					: isEmptyPage
						? renderEmptyAnalyticsPage()
						: renderContentAnalyticsPage()}
			</div>
			<InactivityLogoutModal
				open={isOpenInactivityLogoutModal}
				onStayClick={() => [resetTimer(), setIsOpenInactivityLogoutModal(false)]}
				onLogoutClick={() => [request(), setIsOpenInactivityLogoutModal(false)]}
				onModalTimerExpiring={() => [request(), setIsOpenInactivityLogoutModal(false)]}
			/>
		</div>
	);
}

export default Analytics;

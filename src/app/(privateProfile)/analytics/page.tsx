"use client";

import { useState, useEffect, ChangeEvent } from "react";

import { useForm } from "react-hook-form";

import { Pie } from "react-chartjs-2";
import { Chart as ChartJS, ArcElement, Tooltip} from "chart.js";

import { MoneyIcon } from "../../../assets/script/analytics/MoneyIcon";

import AppInput from "../../../ui/appInput/AppInput";
import { Select } from "../../../ui/select/Select";
import { IAnalyticsInputForm } from "../../../types/pages/Analytics";
import { InputTypeList } from "../../../helpers/Input";

import styles from "./analytics.module.scss";

function Analytics() {
	const { control } = useForm<IAnalyticsInputForm>({
		defaultValues: {
			sum: "",
		},
		mode: "all",
		delayError: 200,
	});

	const WINDOW_SIZE = 1440;
	const MIN_ROW = 0;
	const MAX_ROW = 8;

	const [itemsToShow, setItemsToShow] = useState(MAX_ROW);
	const [displayMode, setDisplayMode] = useState("rub");
	const isEmptyPage = false;

	useEffect(() => {
		const handleResize = () => {
			setItemsToShow(window.innerWidth <= WINDOW_SIZE ? MIN_ROW : MAX_ROW);
		};

		handleResize();

		window.addEventListener("resize", handleResize);

		return () => {
			window.removeEventListener("resize", handleResize);
		};
	}, []);

	const handleDisplayChange = (event: ChangeEvent<HTMLInputElement>) => {
		setDisplayMode(event.target.value);
	};

	ChartJS.register(ArcElement, Tooltip);

	const data = {
		labels: [
			"Внезапная покупка", "Стрижка", "Бассейн", "Школа", "Еда", 
			"Плата жилья", "Ногти", "Бензин", "Дорога работа", "Юрист", 
			"Детский сад", "Учебники", "Отпуск", "Театр", "Кредит", 
			"Страховка", "Киберспорт", "Путешествия", "Кино", "Ипотека"
		],
		datasets: [
			{
				label: "Расходы",
				data: [
					1300.01, 3900.02, 3250.02, 1638.83, 2652.06, 
					15271.09, 390.0, 975.56, 1340.79, 9110.05, 
					16192.09, 2600.01, 6437.57, 1690.01, 26000.15, 
					520.0, 520.0, 520.0, 520.0, 9586.33
				].map(value => displayMode === "rub" ? value : (value / 130000 * 100).toFixed(2)),
				backgroundColor: [
					"#21703c", "#b48dad", "#bfc3a8", 
					"#eed6cd", "#b83400", "#c88b79", 
					"#ff9d73", "#90b89e", "#c7b2af", 
					"#8891a8", "#edc915", "#f8ab9e", 
					"#489177", "#8f9e3e", "#eef6c6", 
					"#8f670a", "#c0a30f", "#afb9cf", 
					"#c66a04", "#dbed15"
				],
				borderWidth: 0,
			},
		],
	};

	const displayData = data.labels.map((label, index) => ({
		title: label,
		value: data.datasets[0].data[index],
		background: data.datasets[0].backgroundColor[index],
	}));

	return (
		<div className={styles.analyticsPageWrap}>
			<div className={styles.analyticsPageContainer}>
				<h1 className={styles.headerTitle}>Аналитика</h1>
				{isEmptyPage? (
					<div className={styles.analyticsBlankPage}>

						<p className={styles.analyticsBlankPage__text}>К сожалению, этот раздел пока пуст. Начните вести учет финансов в приложении и сможет воспользоваться этим разделом.</p>
						
						<MoneyIcon classNames={styles.analyticsBlankPage__image}/>
	
					</div>
				) : (
					<div className={styles.analyticsPagesContent}>
						<div className={styles.analyticsSelectContainer}>
							<div className={styles.analyticsSelectOperation}>
								<Select
									name={"expenses"}
									label={"Операции"}
									options={["Расходы", "Доходы", "Анализ доходов и расходов"]}
								/>
							</div>
							<div className={styles.analyticsSelectDateAndPeriod}>
								<AppInput control={control} label={"Выбор даты"} type={InputTypeList.Date} name={"date"} />
							</div>
						</div>

						<div className={styles.analyticsDisplayWrapper}>
							<p className={styles.analyticsDisplay_title}>Отображать в:</p>
							<div className={styles.analyticsDisplay}>
								<input
									name="value"
									type="radio"
									value="rub"
									id="analyticsDisplay__rub"
									checked={displayMode === "rub"}
									className={styles.analyticsDisplay__input}
									onChange={handleDisplayChange}
								/>
								<label htmlFor="analyticsDisplay__rub" className={styles.analyticsDisplay__label}>
									<p className={styles.analyticsDisplay__text}>В рублях</p>
								</label>
								<input
									name="value"
									type="radio"
									value="percent"
									id="analyticsDisplay__percent"
									checked={displayMode === "percent"}
									onChange={handleDisplayChange}
									className={styles.analyticsDisplay__input}
								/>
								<label htmlFor="analyticsDisplay__percent" className={styles.analyticsDisplay__label}>
									<p className={styles.analyticsDisplay__text}>В процентах</p>
								</label>
							</div>
						</div>

						<div className={styles.analyticsDiagramExpensesWrapper}>
							<div className={styles.analyticsDiagramExpensesInfo}>
								<p className={styles.analyticsDiagramExpensesInfo__title}>Общий расход</p>
								<p className={styles.analyticsDiagramExpensesInfo__value}>130 000.75 ₽</p>
								<p className={styles.analyticsDiagramExpensesInfo__date}>14.09.23 - 20.09.23</p>
							</div>

							<div className={styles.analyticsDiagramExpenses}>

								<div className={styles.diagramExpenses}>
									<Pie data={data} options={{ responsive: true }} />
								</div>

								<div className={styles.diagramExpensesBlock}>
									<div className={styles.diagramExpensesBlockLeft}>
										<ul className={styles.diagramExpensesBlockLeftItems}>
											{displayData.slice(MIN_ROW, MAX_ROW).map((item, index) => (
												<li key={index} className={styles.diagramExpensesBlockLeftItem}>
													<div className={styles.diagramExpensesBlockLeftIconWrapper}>
														<div
															className={styles.diagramExpensesBlockLeftIconWrapper__circle}
															style={{ background: `var(${item.background})` }}></div>
														<p className={styles.diagramExpensesBlockLeftIconWrapper__text}>{item.title}</p>
													</div>
													<p className={styles.diagramExpensesBlockLeftItem__value}>
														{displayMode === "rub" ? `${item.value} ₽` : `${item.value}%`}
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
															style={{ background: `var(${item.background})` }}></div>
														<p className={styles.diagramExpensesBlockRightIconWrapper__text}>{item.title}</p>
													</div>
													<p className={styles.diagramExpensesBlockRightItem__value}>
														{displayMode === "rub" ? `${item.value} ₽` : `${item.value}%`}
													</p>
												</li>
											))}
										</ul>
									</div>
								</div>
							</div>
						</div>
					</div>
				)}
			</div>
		</div>
	);
}

export default Analytics;

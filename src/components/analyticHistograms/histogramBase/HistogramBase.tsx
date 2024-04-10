import { Chart as ChartJS, CategoryScale, LinearScale, BarElement, Title, Tooltip, Legend } from "chart.js";
import { Bar, Doughnut } from "react-chartjs-2";

import { getHistogramCategorySum } from "../../../utils/getHistogramCategorySum";
import { getPercentForHistogramSum } from "../../../utils/getPercentForHistogramSum";
import { numberFormatRub } from "../../../helpers/calculator";
import { colorsAnalytic, colorsIncome, colorsOutcome, colorsStorage } from "../../../helpers/colors";

import style from "./HistogramBase.module.css";

function HistogramBase({
	histogramSize,
	sumGroupIncome,
	sumGroupOutcome,
	sumGroupMoneyBox,
	isActive,
	percentChoice,
	incomePercent,
	outcomePercent,
	storageSum,
	balanceToTarget,
	analyticSum,
}: any) {
	ChartJS.register(LinearScale, CategoryScale, BarElement, Title, Tooltip, Legend);
	const options = {
		indexAxis: histogramSize.indexAxis,
		barThickness: 10,
		plugins: {
			legend: {
				display: false,
				position: "bottom",
				align: "start",
				labels: {
					boxWidth: 150,
					pointStyleWidth: 40,
					usePointStyle: true,
					pointStyle: "rectRounded",

					font: {
						family: "Monserrat-Medium",
						size: 12,

						useBorderRadius: true,
					},

					padding: 20,
				},
			},
			title: {
				display: false,
				text: "Chart.js Bar Chart - Stacked",
			},
		},
		responsive: true,
		scales: (isActive === "costs" || isActive === "income") && {
			x: {
				stacked: true,
			},
			y: {
				stacked: true,
			},
		},
		elements: {
			bar: {
				// borderRadius: 10,
			},
		},
	};
	//
	const storageData = [storageSum, balanceToTarget];
	const storageNames = ["Сумма накоплений", "Осталось накопить"];
	const dataStorage = {
		labels: [...storageNames],

		datasets: [
			{
				data: [...storageData],
				backgroundColor: colorsStorage,
				hoverOffset: 4,
			},
		],
	};

	const dataAnalytic = {
		labels: ["Общий доход", "Общий расход"],

		datasets: [
			{
				data: analyticSum,
				backgroundColor: colorsAnalytic,
				hoverOffset: 4,
			},
		],
	};
	//
	const incomeCategories = sumGroupIncome.map((item: any) => Object.keys(item));
	const incomeCategory = sumGroupIncome.length > 0 && sumGroupIncome[0];
	const incomeCategoryName = sumGroupIncome.length > 0 && Object.keys(incomeCategory);
	const incomeMonths = sumGroupIncome.length > 0 && Object.keys(incomeCategory[incomeCategoryName]);
	const labels = incomeMonths;
	const incomeCategoriesSum = getHistogramCategorySum(sumGroupIncome);
	const incomeCategoriesSumInPercent = getPercentForHistogramSum(incomeCategoriesSum);

	const dataIncome = {
		labels,
		datasets: incomeCategories.map((item: any, index: number) => {
			let result = {};
			result = {
				label: item,
				data: !percentChoice ? Object.values(sumGroupIncome[index][item]) : incomePercent[index],
				backgroundColor: colorsIncome[index],
			};
			return result;
		}),
	};

	const moneyBoxCategories = sumGroupMoneyBox.map((item: any) => Object.keys(item));
	const moneyBoxCategoriesSum = getHistogramCategorySum(sumGroupMoneyBox);

	const outcomeCategories = sumGroupOutcome.map((item: any) => Object.keys(item));
	const outcomeCategory = sumGroupOutcome.length > 0 && sumGroupOutcome[0];
	const outcomeCategoryName = sumGroupOutcome.length > 0 && Object.keys(outcomeCategory);
	const outcomeMonths = sumGroupOutcome.length > 0 && Object.keys(outcomeCategory[outcomeCategoryName]);
	const outcomeLabels = outcomeMonths;

	const outcomeCategoriesSum = getHistogramCategorySum(sumGroupOutcome);
	const outcomeCategoriesSumTotal = outcomeCategoriesSum.concat(moneyBoxCategoriesSum);
	const outcomeCategoriesSumTotalInPercent = getPercentForHistogramSum(outcomeCategoriesSumTotal);

	const datasets = outcomeCategories.map((item: any, index: number) => {
		let result = {};
		result = {
			label: item,
			data: !percentChoice ? Object.values(sumGroupOutcome[index][item]) : outcomePercent[index],
			backgroundColor: colorsOutcome[index],
		};
		return result;
	});
	const moneyBoxDatasets = moneyBoxCategories.map((item: any, index: number) => {
		let result = {};
		result = {
			label: item,
			data: !percentChoice
				? Object.values(sumGroupMoneyBox[index][item])
				: outcomePercent[index + outcomeCategories.length],

			backgroundColor: colorsOutcome[index + outcomeCategories.length],
		};
		return result;
	});

	datasets.push(...moneyBoxDatasets);

	const dataOutcome = {
		labels: outcomeLabels,
		datasets: datasets,
	};

	return (
		<>
			<div className={style.histogram}>
				{isActive === "income" && (
					<div className={style.bar_histogram}>
						<Bar
							className={style.bar_histogram}
							width={histogramSize.width}
							height={histogramSize.height}
							options={options}
							data={dataIncome}
						/>
					</div>
				)}
				{isActive === "costs" && (
					<div className={style.bar_histogram}>
						<Bar
							className={style.bar_histogram}
							width={histogramSize.width}
							height={histogramSize.height}
							options={options}
							data={dataOutcome}
						/>
					</div>
				)}
				{isActive === "storage" && (
					<Doughnut
						className={style.doughnut}
						width={style.doughnut}
						height={style.doughnut}
						data={dataStorage}
						options={options}
					/>
				)}
				{isActive === "analitic" && (
					<Doughnut
						className={style.doughnut}
						width={style.doughnut}
						height={style.doughnut}
						data={dataAnalytic}
						options={options}
					/>
				)}
			</div>

			<div className={style.categories_name}>
				{isActive === "income" &&
					incomeCategories.map((item, index) => {
						return (
							incomeCategoriesSum[index] > 0 && (
								<div className={style.label_element} key={index}>
									<div className={style.category_color} style={{ backgroundColor: colorsIncome[index] }}></div>
									<div className={style.category_name}>
										{item}{" "}
										<span className={style.sum}>
											{!percentChoice
												? numberFormatRub.format(incomeCategoriesSum[index])
												: incomeCategoriesSumInPercent[index] + " %"}
										</span>
									</div>
								</div>
							)
						);
					})}
				{isActive === "costs" &&
					outcomeCategories.map((item, index) => {
						return (
							outcomeCategoriesSumTotal[index] > 0 && (
								<div className={style.label_element} key={index}>
									<div className={style.category_color} style={{ backgroundColor: colorsOutcome[index] }}></div>
									<div className={style.category_name}>
										{item}{" "}
										<span className={style.sum}>
											{!percentChoice
												? numberFormatRub.format(outcomeCategoriesSumTotal[index])
												: outcomeCategoriesSumTotalInPercent[index] + " %"}
										</span>
									</div>
								</div>
							)
						);
					})}
				{isActive === "costs" &&
					moneyBoxCategories.map((item, index) => {
						return (
							outcomeCategoriesSumTotal[index + outcomeCategoriesSum.length] > 0 && (
								<div className={style.label_element} key={index}>
									<div
										className={style.category_color}
										style={{
											backgroundColor: colorsOutcome[index + outcomeCategories.length],
										}}></div>
									<div className={style.category_name}>
										{item}{" "}
										<span className={style.sum}>
											{!percentChoice
												? numberFormatRub.format(outcomeCategoriesSumTotal[index + outcomeCategoriesSum.length])
												: outcomeCategoriesSumTotalInPercent[index + outcomeCategoriesSum.length] + " %"}
										</span>
									</div>
								</div>
							)
						);
					})}
				{isActive === "storage" &&
					storageData.map((item, index) => {
						return (
							<div className={style.label_element} key={index}>
								<div className={style.category_color} style={{ backgroundColor: colorsStorage[index] }}></div>
								<div className={style.category_name}>
									{storageNames[index]}{" "}
									<span className={style.sum}>{!percentChoice ? numberFormatRub.format(item) : item + " %"}</span>{" "}
								</div>
							</div>
						);
					})}
				{isActive === "analitic" &&
					analyticSum.map((item, index) => {
						return (
							<div className={style.label_element} key={index}>
								<div className={style.category_color} style={{ backgroundColor: colorsAnalytic[index] }}></div>
								<div className={style.category_name}>
									{dataAnalytic.labels[index]}{" "}
									<span className={style.sum}>{!percentChoice ? numberFormatRub.format(item) : item + " %"}</span>{" "}
								</div>
							</div>
						);
					})}
			</div>
		</>
	);
}
export default HistogramBase;

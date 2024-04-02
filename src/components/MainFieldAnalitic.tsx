// Компонент "Аналитика"
import { useEffect, useState, useRef } from "react";
import { useSelector } from "react-redux";

import { percentFunction } from "../utils/percentFunction";
import { getAnaliticGistogramSum } from "../utils/analiticFunction";

import { URLS, firstDayOfMonth, lastDayOfMonth } from "../helpers/urlsAndDates";

import ChartGistograms from "./analiticGistograms/ChartGistograms";
import Gistogram from "./analiticGistograms/Gistogram";
import AllTransactionsList from "./Transactions/AllTransactionsList";

import PdfButton from "./CreateFiles/PDFButton/PdfButton";
import CreatePDF from "./CreateFiles/CreatePDF";
import CreateXLS from "./CreateFiles/CreateXLS";
import VirtualAssistant from "./VirtualAssistant/VirtualAssistant";

function MainFieldAnalitic({
	changeRangeCalendar,
	getStorageCategories,
	sum,
	balanceToTarget,
	balanceToTargetInPercent,
	setCheckMainField,
	setCheckCalculator,
	gistogramSize,
}: any) {
	const token = useSelector((state: any) => state.user.token);
	const dataCalRange = useSelector((state: any) => state.data.dataRange);

	const [sumGroupIncome, setSumGroupIncome] = useState([]);
	const [sumGroupOutcome, setSumGroupOutcome] = useState([]);
	const [sumGroupMoneyBox, setSumGroupMoneyBox] = useState([]);
	const [outcomeTotal, setOutcomeTotal] = useState([]);
	const [gistogramType, setGistogramType] = useState("pie");
	const [isActive, setIsActive] = useState("income");
	//
	const [percentChoice, setPercentChoice] = useState(false);
	const [incomePercent, setIncomePercent] = useState([]);
	const [outcomePercent, setOutcomePercent] = useState([]);

	const [allOperationList, setAllOperationList] = useState();
	const reportTemplateRef = useRef(null);

	const dataStart = dataCalRange.length > 1 ? dataCalRange[0].split(".").reverse().join("-") : firstDayOfMonth;

	const dataEnd = dataCalRange.length > 1 ? dataCalRange[1].split(".").reverse().join("-") : lastDayOfMonth;

	const dateStartObject = new Date(dataStart);
	const dateEndObject = new Date(dataEnd);
	const result = dateEndObject.getMonth() - dateStartObject.getMonth();

	useEffect(() => {
		if (result) {
			setGistogramType("bar");
		} else {
			setGistogramType("pie");
		}
		getAnaliticSum();
		changeRangeCalendar(true);
	}, [dataCalRange, result]);
	//
	useEffect(() => {
		setCheckMainField(false);
		setCheckCalculator(false);
	});

	function getAnaliticSum() {
		const incomeEndpoint = result
			? `${URLS.getSumMonthlyIncome}?date_start=${dataStart}&date_end=${dataEnd}`
			: `${URLS.getSumIncomeGroup}?date_start=${dataStart}&date_end=${dataEnd}`;
		const outcomeEndpoint = result
			? `${URLS.getSumMonthlyOutcome}?date_start=${dataStart}&date_end=${dataEnd}`
			: `${URLS.getSumOutcomeGroup}?date_start=${dataStart}&date_end=${dataEnd}`;
		const moneyBoxEndpoint = result
			? `${URLS.getSumMonthlyMoneyBox}?date_start=${dataStart}&date_end=${dataEnd}`
			: `${URLS.getSumMoneyBoxGroup}?date_start=${dataStart}&date_end=${dataEnd}`;

		const outcomeTotal: any = [];
		const optionsIncome = {
			method: "GET",
			headers: {
				"Content-Type": "application/json",
				Authorization: `Token ${token}`,
			},
		};
		fetch(incomeEndpoint, optionsIncome)
			.then((result) => result.json())
			.then((dataSumIncome) => {
				setSumGroupIncome(dataSumIncome);
				if (percentChoice && result && dataSumIncome.length > 0) {
					setIncomePercent(percentFunction(dataSumIncome));
				}
			});

		const optionsOutcome = {
			method: "GET",
			headers: {
				"Content-Type": "application/json",
				Authorization: `Token ${token}`,
			},
		};
		fetch(outcomeEndpoint, optionsOutcome)
			.then((result) => result.json())
			.then((dataSumOutcome) => {
				setSumGroupOutcome(dataSumOutcome);
				outcomeTotal.unshift(...dataSumOutcome);
			});

		const optionsMoneyBox = {
			method: "GET",
			headers: {
				"Content-Type": "application/json",
				Authorization: `Token ${token}`,
			},
		};
		fetch(moneyBoxEndpoint, optionsMoneyBox)
			.then((result) => result.json())
			.then((dataSumMoneyBox) => {
				outcomeTotal.push(...dataSumMoneyBox);
				setSumGroupMoneyBox(dataSumMoneyBox);
				setOutcomeTotal(outcomeTotal);
				if (percentChoice && result && outcomeTotal.length > 0) {
					setOutcomePercent(percentFunction(outcomeTotal));
				}
			});
	}

	useEffect(() => {
		getStorageCategories(URLS.getMoneyBoxCategories);
	}, []);

	function getAllOperationList() {
		const options = {
			method: "GET",
			headers: {
				"Content-Type": "application/json",
				Authorization: `Token ${token}`,
			},
		};
		fetch(`${URLS.getAllOperations}?date_start=${dataStart}&date_end=${dataEnd}`, options)
			.then((result) => result.json())
			.then((responseServer) => {
				setAllOperationList(responseServer);
			});
	}
	useEffect(() => {
		getAllOperationList();
	}, [dataCalRange, result]);

	//.sort((a, b) => b.result_sum - a.result_sum) - сортировка данных по размеру суммы
	const categoryNameIncome =
		sumGroupIncome.length > 0 && sumGroupIncome[0].sum && !result
			? sumGroupIncome[0].sum.sort((a, b) => b.result_sum - a.result_sum).map((item) => item.categories__categoryName)
			: [];
	const resultSumIncome =
		sumGroupIncome.length > 0 && sumGroupIncome[0].sum && !result
			? sumGroupIncome[0].sum.sort((a, b) => b.result_sum - a.result_sum).map((item) => item.result_sum)
			: [];

	const categoryNameOutcome =
		sumGroupOutcome.length > 0 && sumGroupOutcome[0].sum && !result
			? sumGroupOutcome[0].sum.sort((a, b) => b.result_sum - a.result_sum).map((item) => item.categories__categoryName)
			: [];
	const resultSumOutcome =
		sumGroupOutcome.length > 0 && sumGroupOutcome[0].sum && !result
			? sumGroupOutcome[0].sum.sort((a, b) => b.result_sum - a.result_sum).map((item) => item.result_sum)
			: [];

	const categoryNameMoneyBox =
		sumGroupMoneyBox.length > 0 && sumGroupMoneyBox[0].sum && !result
			? sumGroupMoneyBox[0].sum.sort((a, b) => b.result_sum - a.result_sum).map((item) => item.categories__categoryName)
			: [];
	const resultSumMoneyBox =
		sumGroupMoneyBox.length > 0 && sumGroupMoneyBox[0].sum && !result
			? sumGroupMoneyBox[0].sum.sort((a, b) => b.result_sum - a.result_sum).map((item) => item.result_sum)
			: [];

	function handleChange(e) {
		setIsActive(e.target.value);
	}
	//
	const gistogramSumIncome = sumGroupIncome.length > 0 && result ? sumGroupIncome : [];
	const gistogramSumOutcome = sumGroupOutcome.length > 0 && result ? sumGroupOutcome : [];

	const resultSumIncomeTotal = resultSumIncome.length > 0 && resultSumIncome.reduce((a, b) => +a + +b, 0).toFixed(2);
	const onePercentIncome = resultSumIncomeTotal / 100;
	const resultSumIncomeInPercent = [];
	for (let i = 0; i < resultSumIncome.length; i++) {
		resultSumIncomeInPercent.push((resultSumIncome[i] / onePercentIncome).toFixed(2));
	}
	const resultSumOutcomeTotal = resultSumOutcome.length > 0 && resultSumOutcome.reduce((a, b) => +a + +b, 0).toFixed(2);
	const onePercentOutcome = resultSumOutcomeTotal / 100;
	const resultSumOutcomeInPercent = [];
	for (let i = 0; i < resultSumOutcome.length; i++) {
		resultSumOutcomeInPercent.push((resultSumOutcome[i] / onePercentOutcome).toFixed(2));
	}
	const resultSumMoneyBoxTotal =
		resultSumMoneyBox.length > 0 && resultSumMoneyBox.reduce((a, b) => +a + +b, 0).toFixed(2);
	const onePercentMoneyBox = resultSumMoneyBoxTotal / 100;
	const resultSumMoneyBoxInPercent = [];
	for (let i = 0; i < resultSumOutcome.length; i++) {
		resultSumMoneyBoxInPercent.push((resultSumMoneyBox[i] / onePercentMoneyBox).toFixed(2));
	}
	const resultSumCostsTotal = Number(resultSumOutcomeTotal) + Number(resultSumMoneyBoxTotal);
	const onePercentCosts = resultSumCostsTotal / 100;
	const resultSumCostsTotalinPercent = [];
	for (let i = 0; i < resultSumOutcome.length; i++) {
		resultSumCostsTotalinPercent.push((resultSumOutcome[i] / onePercentCosts).toFixed(2));
	}
	for (let i = 0; i < resultSumMoneyBox.length; i++) {
		resultSumCostsTotalinPercent.push((resultSumMoneyBox[i] / onePercentCosts).toFixed(2));
	}

	const analiticTotal = [resultSumIncomeTotal, resultSumCostsTotal];
	const onePercentAnaltiicTotal = analiticTotal.reduce((a, b) => +a + +b, 0).toFixed(2) / 100;
	const analiticTotalInPercent = analiticTotal.map((item) => (item / onePercentAnaltiicTotal).toFixed(2));
	//
	const analiticSumIncomeForGistogram = result ? getAnaliticGistogramSum(sumGroupIncome) : 0;
	const analiticSumOutcomeForGistogram = result ? getAnaliticGistogramSum(outcomeTotal) : 0;
	const analiticTotalForGistogram = [analiticSumIncomeForGistogram, analiticSumOutcomeForGistogram];
	// console.log(analiticTotalForGistogram)
	const onePercentAnaliticTotalForGistogram = analiticTotalForGistogram.reduce((a, b) => +a + +b, 0).toFixed(2) / 100;
	const analiticTotalForGistogramInPercent = analiticTotalForGistogram.map((item) =>
		(item / onePercentAnaliticTotalForGistogram).toFixed(2),
	);
	// console.log(analiticTotalForGistogramInPercent)

	function handlePercentChange(e) {
		if (e.target.value === "В рублях") return setPercentChoice(false);

		if (e.target.value === "В процентах" && isActive === "storage") return setPercentChoice(true);

		if (e.target.value === "В процентах" && (isActive === "costs" || "income")) {
			setPercentChoice(true);
			sumGroupIncome.length > 0 && setIncomePercent(percentFunction(sumGroupIncome));
			outcomeTotal.length > 0 && setOutcomePercent(percentFunction(outcomeTotal));
			return;
		}
	}
	//
	const [virtualAssistant, setVirtualAssistant] = useState(false);
	const aiHelper = JSON.parse(localStorage.getItem("aiHelper"));
	const [checked, setChecked] = useState(aiHelper ? aiHelper.value : true);
	function handleCheckbox(e) {
		e.stopPropagation();
		if (e.target.checked) {
			localStorage.setItem("aiHelper", JSON.stringify({ value: true }));
			// setVirtualAssistant(true)
			setChecked(true);
		}
		if (!e.target.checked) {
			localStorage.setItem("aiHelper", JSON.stringify({ value: false }));
			setChecked(false);
		}
	}
	//
	return (
		<div className="main_field main_field_analitic">
			<h2 className="main_field_title main_field_title_analitic">Аналитика</h2>
			<div className="ai_helper_checkbox">
				<input type="checkbox" id="aiCheckbox" onChange={(e) => handleCheckbox(e)} checked={checked} />
				<label>Активировать помощника по финансам</label>
			</div>
			<div className="analitic_select_zone">
				<select className="analitic_select" defaultValue="income" onChange={(e) => handleChange(e)}>
					<option className="analitic_select_option" value="income">
						Доходы
					</option>
					<option className="analitic_select_option" value="costs">
						Расходы
					</option>
					<option className="analitic_select_option" value="storage">
						Накопления
					</option>
					<option className="analitic_select_option" value="analitic">
						Аналитика
					</option>
					<option className="analitic_select_option" value="operationsList">
						Список операций
					</option>
				</select>
				{isActive !== "operationsList" ? (
					<form className="analitic_select_form">
						<div>
							<input
								className="analitic_radio_input"
								type="radio"
								id="option1"
								name="analitic_select"
								value="В рублях"
								onClick={(e) => handlePercentChange(e)}
							/>
							<label htmlFor="option1">В рублях</label>
						</div>
						<div>
							<input
								className="analitic_radio_input"
								type="radio"
								id="option2"
								name="analitic_select"
								value="В процентах"
								onClick={(e) => handlePercentChange(e)}
							/>
							<label htmlFor="option2">В процентах</label>
						</div>
					</form>
				) : (
					<>
						<PdfButton reportTemplateRef={reportTemplateRef} />
						<CreateXLS allOperationList={allOperationList} dataCalRange={dataCalRange} />
					</>
				)}
			</div>
			{isActive === "operationsList" && (
				<>
					<AllTransactionsList allOperationList={allOperationList} />
					<div ref={reportTemplateRef} style={{ position: "absolute", top: "-10000%" }}>
						<CreatePDF allOperationList={allOperationList} dataCalRange={dataCalRange} />
					</div>
				</>
			)}
			{isActive !== "operationsList" && gistogramType === "pie" && !result && (
				<ChartGistograms
					categoryNameIncome={categoryNameIncome}
					resultSumIncome={!percentChoice ? resultSumIncome : resultSumIncomeInPercent}
					categoryNameOutcome={categoryNameOutcome}
					resultSumOutcome={!percentChoice ? resultSumOutcome : resultSumCostsTotalinPercent}
					categoryNameMoneyBox={categoryNameMoneyBox}
					resultSumMoneyBox={!percentChoice ? resultSumMoneyBox : ""}
					isActive={isActive}
					percentChoice={percentChoice}
					storageSum={!percentChoice ? sum : balanceToTargetInPercent[0]}
					balanceToTarget={!percentChoice ? balanceToTarget : balanceToTargetInPercent[1]}
					analiticSum={!percentChoice ? analiticTotal : analiticTotalInPercent}
				/>
			)}
			{isActive !== "operationsList" && gistogramType !== "pie" && result && (
				<Gistogram
					gistogramSize={gistogramSize}
					sumGroupIncome={gistogramSumIncome}
					sumGroupOutcome={gistogramSumOutcome}
					sumGroupMoneyBox={sumGroupMoneyBox}
					isActive={isActive}
					percentChoice={percentChoice}
					incomePercent={incomePercent}
					outcomePercent={outcomePercent}
					storageSum={!percentChoice ? sum : balanceToTargetInPercent[0]}
					balanceToTarget={!percentChoice ? balanceToTarget : balanceToTargetInPercent[1]}
					analiticSum={!percentChoice ? analiticTotalForGistogram : analiticTotalForGistogramInPercent}
				/>
			)}
			{/* <AiModalWindow active={aiModalWindow} setActive={setAiModalWindow} aiHelper={aiHelper} checked={checked} setChecked={setChecked} /> */}
			<VirtualAssistant
				active={virtualAssistant}
				setActive={setVirtualAssistant}
				aiHelper={aiHelper}
				checked={checked}
				setChecked={setChecked}
			/>
		</div>
	);
}

export default MainFieldAnalitic;

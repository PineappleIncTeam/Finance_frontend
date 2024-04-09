import { useEffect, useState } from "react";
import { useNavigate } from "react-router-dom";
import { AiOutlineMenu, AiOutlineClose } from "react-icons/ai";

import useAppSelector from "../../../hooks/useAppSelector";

import infoPartSelector from "../../../services/redux/features/infoPart/InfoPartSelector";
import userDataSelector from "../../../services/redux/features/userData/UserDataSelector";
import { getStorageSum, getBalanceToTarget, getBalanceToTargetinPercent } from "../../../utils/storageFunctions";
import { currentDate, startDate } from "../../../helpers/urlsAndDates";

import MainFieldRouter from "../../../services/router/MainfieldRouter";

import Navigation from "../../../components/navBar/NavBar";
import Aside from "../../../components/dateBar/DateBar";
import Transactions from "../../../components/transactionComponents/transactionArray/TransactionArray";

import "./Rectangle.css";
import {
	getBalanceInfo,
	getBaseCategoryList,
	getInputInfo,
	getOperations,
} from "../../../services/api/mainFieldApi/RectangleActions";

function Rectangle() {
	// const [allOperationList, setAllOperationList] = useState()
	const [operationList, setOperationList] = useState("");
	const [symbol, setSymbol] = useState("+");
	const [balanceData, setBalanceData] = useState("");
	const [inputData, setInputData] = useState("");
	const [checkMainField, setCheckMainField] = useState(true);
	const [checkCalculator, setCheckCalculator] = useState(false);
	const [menuActive, setMenuActive] = useState(false);

	const [categories, setCategories] = useState("");
	const [storageCategories, setStorageCategories] = useState("");
	const [storageSum, setStorageSum] = useState();
	const [balanceToTarget, setBalanceToTarget] = useState();
	const [balanceToTargetInPercent, setBalanceToTargetInPercent] = useState([]);

	const [range, setRange] = useState(true);

	const [gistogramSize, setGistogramSize] = useState({
		width: 280,
		height: 500,
		indexAxis: "y",
	});
	const [width, setWidth] = useState(window.innerWidth);

	const navigate = useNavigate();
	const dataCal = useAppSelector(infoPartSelector).data;
	const token = useAppSelector(userDataSelector).token;

	const selectDate = (dataCal && dataCal.split(".").reverse().join("-")) || currentDate;

	function changeRangeCalendar(range: any) {
		setRange(range);
	}

	useEffect(() => {
		const handleResize = (event: any) => {
			setWidth(event.target.innerWidth);
		};
		window.addEventListener("resize", handleResize);
		return () => {
			window.removeEventListener("resize", handleResize);
		};
	}, [gistogramSize]);

	useEffect(() => {
		if (width >= 1920) {
			setGistogramSize({ width: 902, height: 408, indexAxis: "x" });
		} else if (width < 1920 && width >= 1280) {
			setGistogramSize({ width: 600, height: 280, indexAxis: "x" });
		} else if (width < 1280 && width > 768) {
			setGistogramSize({ width: 400, height: 200, indexAxis: "x" });
		} else if (width <= 768) {
			setGistogramSize({ width: 280, height: 500, indexAxis: "y" });
		}
	}, [width]);

	function getCategories(typeOfCategories: any) {
		getBaseCategoryList(typeOfCategories, token ?? "").then(function (response: any) {
			if (response.status === 401) {
				navigate("/");
				return;
			}
			response.json().then((userCategories: any) => setCategories(userCategories));
		});
	}

	function getStorageCategories(typeOfCategories: any) {
		getBaseCategoryList(typeOfCategories, token ?? "")
			.then((result: any) => result.json())
			.then((userCategories: any) => {
				setStorageCategories(userCategories);
				setStorageSum(getStorageSum(userCategories));
				setBalanceToTarget(getBalanceToTarget(userCategories));
				setBalanceToTargetInPercent(getBalanceToTargetinPercent(userCategories));
			});
	}

	function getOperationList(endpoint: string, symbol: any) {
		getOperations(endpoint, token ?? "")
			.then((result) => result.json())
			.then((responseServer) => {
				setOperationList("");
				setOperationList(responseServer);
				setSymbol(symbol);
			});
	}

	function getBalanceData() {
		getBalanceInfo(startDate, selectDate, token ?? "").then(function (response) {
			if (response.status === 401) {
				navigate("/");
				return;
			}
			response.json().then((responseServer) => setBalanceData(Number(responseServer.sum_balance).toFixed(2)));
		});
	}

	useEffect(() => {
		getBalanceData();
	}, [dataCal]);

	function getInputData(endpoint: string) {
		getInputInfo(endpoint, token ?? "")
			.then((result) => result.json())
			.then((responseServer) => {
				if (responseServer.length) {
					responseServer.map((responseNumber: any) => {
						const constSum = Number(responseNumber.constant_sum);
						const onceSum = Number(responseNumber.once_sum);
						const accumSum = Number(responseNumber.accum_sum);
						const sumField = accumSum ? (constSum + onceSum + accumSum).toFixed(2) : (constSum + onceSum).toFixed(2);
						return setInputData(sumField);
					});
				} else {
					setInputData("0");
				}
			});
	}

	return (
		<>
			<div className="rectangle" onClick={() => menuActive && setMenuActive(!menuActive)}>
				<div className="mobile_burg" onClick={() => setMenuActive(!menuActive)}>
					{menuActive ? <AiOutlineClose color="teal" size={40} /> : <AiOutlineMenu color="teal" size={40} />}
				</div>

				<Navigation menuActive={menuActive} setMenuActive={setMenuActive} />
				<div
					className={menuActive ? "main active" : "main"}
					// active={menuActive}
				>
					<div className="mainField">
						<div className="mainFieldBlock">
							<MainFieldRouter
								categories={categories}
								storageCategories={storageCategories}
								getCategories={getCategories}
								getStorageCategories={getStorageCategories}
								storageSum={storageSum}
								balanceToTarget={balanceToTarget}
								balanceToTargetInPercent={balanceToTargetInPercent}
								getOperationList={getOperationList}
								// getAllOperationList={getAllOperationList}
								getBalanceData={getBalanceData}
								getInputData={getInputData}
								inputData={inputData}
								operationList={operationList}
								// allOperationList={allOperationList}
								changeRangeCalendar={changeRangeCalendar}
								range={range}
								setCheckMainField={setCheckMainField}
								setCheckCalculator={setCheckCalculator}
								gistogramSize={gistogramSize}
							/>
						</div>
						<div className="aside">
							<Aside
								balanceData={balanceData}
								range={range}
								selectDate={selectDate}
								checkCalculator={checkCalculator}
							/>
						</div>
					</div>
					{checkMainField && (
						<div className="transactions">
							<Transactions
								getBalanceData={getBalanceData}
								getOperationList={getOperationList}
								operationList={operationList}
								symbol={symbol}
								getInputData={getInputData}
								getStorageCategories={getStorageCategories}
							/>
						</div>
					)}
				</div>
			</div>
		</>
	);
}
export default Rectangle;

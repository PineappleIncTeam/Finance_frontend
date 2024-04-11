import { Route, Routes } from "react-router-dom";

import MainFieldStorage from "../../pages/mainFieldPages/mainFieldStorage/MainFieldStorage";
import MainFieldAnalytic from "../../pages/mainFieldPages/analytic/MainFieldAnalytic";
import Calculator from "../../pages/mainFieldPages/calculator/Calculator";
import MainField from "../../pages/mainFieldPages/incomeExpenses/MainField";
import MainFieldCosts from "../../pages/mainFieldPages/incomeExpenses/MainFieldCosts";

import { MainFieldPath } from "./routes";

const MainFieldRouter = ({
	categories,
	storageCategories,
	getCategories,
	getStorageCategories,
	storageSum,
	balanceToTarget,
	balanceToTargetInPercent,
	getOperationList,
	getBalanceData,
	getInputData,
	inputData,
	changeRangeCalendar,
	range,
	setCheckMainField,
	setCheckCalculator,
	histogramSize,
}: any) => {
	return (
		<Routes>
			<Route
				path={MainFieldPath.Base}
				element={
					<MainField
						categories={categories}
						getCategories={getCategories}
						getOperationList={getOperationList}
						getBalanceData={getBalanceData}
						getInputData={getInputData}
						inputData={inputData}
						changeRangeCalendar={changeRangeCalendar}
						range={range}
						setCheckMainField={setCheckMainField}
						setCheckCalculator={setCheckCalculator}
					/>
				}
			/>
			<Route
				path={MainFieldPath.Cost}
				element={
					<MainFieldCosts
						categories={categories}
						storageCategories={storageCategories}
						getCategories={getCategories}
						getStorageCategories={getStorageCategories}
						getOperationList={getOperationList}
						getBalanceData={getBalanceData}
						getInputData={getInputData}
						inputData={inputData}
						changeRangeCalendar={changeRangeCalendar}
						setCheckMainField={setCheckMainField}
						setCheckCalculator={setCheckCalculator}
					/>
				}
			/>
			<Route
				path={MainFieldPath.Storage}
				element={
					<MainFieldStorage
						categories={categories}
						getCategories={getCategories}
						storageCategories={storageCategories}
						sum={storageSum}
						getStorageCategories={getStorageCategories}
						setCheckMainField={setCheckMainField}
						setCheckCalculator={setCheckCalculator}
						getOperationList={getOperationList}
						getBalanceData={getBalanceData}
						getInputData={getInputData}
					/>
				}
			/>
			<Route
				path={MainFieldPath.Analytics}
				element={
					<MainFieldAnalytic
						changeRangeCalendar={changeRangeCalendar}
						range={range}
						getStorageCategories={getStorageCategories}
						sum={storageSum}
						balanceToTarget={balanceToTarget}
						balanceToTargetInPercent={balanceToTargetInPercent}
						setCheckMainField={setCheckMainField}
						setCheckCalculator={setCheckCalculator}
						histogramSize={histogramSize}
					/>
				}
			/>
			<Route
				path={MainFieldPath.Calculator}
				element={<Calculator setCheckMainField={setCheckMainField} setCheckCalculator={setCheckCalculator} />}></Route>
		</Routes>
	);
};

export default MainFieldRouter;

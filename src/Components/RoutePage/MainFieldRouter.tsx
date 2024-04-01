import React from "react";
import { Route, Routes } from "react-router-dom";

import MainField from "../MainField";
import MainFieldAnalitic from "../MainFieldAnalitic";
import MainFieldCosts from "../MainFieldCosts";
import MainFieldStorage from "../MainFieldStorage";
import Calculator from "../calculator/Calculator";

const MainFieldRouter = ({
	categories,
	storageCategories,
	getCategories,
	getStorageCategories,
	storageSum,
	balanceToTarget,
	balanceToTargetInPercent,
	getOperationList,
	// getAllOperationList,
	setSymbol,
	getBalanceData,
	getInputData,
	inputData,
	// operationList,
	// allOperationList,
	changeRangeCalendar,
	range,
	setCheckMainField,
	setCheckCalculator,
	gistogramSize,
}) => {
	return (
		<Routes>
			<Route
				path="/mainfield"
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
				path="/mainfieldcosts"
				element={
					<MainFieldCosts
						categories={categories}
						storageCategories={storageCategories}
						getCategories={getCategories}
						getStorageCategories={getStorageCategories}
						getOperationList={getOperationList}
						setSymbol={setSymbol}
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
				path="/mainfieldstorage"
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
				path="/mainfieldanalitic"
				element={
					<MainFieldAnalitic
						// operationList={operationList}
						changeRangeCalendar={changeRangeCalendar}
						range={range}
						getStorageCategories={getStorageCategories}
						sum={storageSum}
						balanceToTarget={balanceToTarget}
						balanceToTargetInPercent={balanceToTargetInPercent}
						setCheckMainField={setCheckMainField}
						setCheckCalculator={setCheckCalculator}
						gistogramSize={gistogramSize}
						// getAllOperationList={getAllOperationList}
						// allOperationList={allOperationList}
					/>
				}
			/>
			<Route
				path="/calculator"
				element={<Calculator setCheckMainField={setCheckMainField} setCheckCalculator={setCheckCalculator} />}></Route>
		</Routes>
	);
};

export default MainFieldRouter;

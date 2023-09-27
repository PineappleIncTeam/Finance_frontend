import React from "react"
import { Route, Routes } from "react-router-dom"
import MainField from "../MainField"
import MainFieldAnalitic from "../MainFieldAnalitic"
import MainFieldCosts from "../MainFieldCosts"
import MainFieldStorage from "../MainFieldStorage"
import Calculator from "../calculator/Calculator"

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
            gistogramSize={gistogramSize}
            // getAllOperationList={getAllOperationList}
            // allOperationList={allOperationList}
          />
        }
      />
      <Route
        path="/calculator"
        element={<Calculator setCheckMainField={setCheckMainField} />}
      ></Route>
    </Routes>
  )
}

export default MainFieldRouter

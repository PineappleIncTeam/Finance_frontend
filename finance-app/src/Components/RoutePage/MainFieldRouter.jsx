import React from "react"
import { Route, Routes } from "react-router-dom"
import MainField from "../MainField"
import MainFieldAnalitic from "../MainFieldAnalitic"
import MainFieldCosts from "../MainFieldCosts"
import MainFieldStorage from "../MainFieldStorage"

const MainFieldRouter = ({
  categories,
  storageCategories,
  getCategories,
  getStorageCategories,
  getOperationList,
  setSymbol,
  getBalanceData,
  getInputData,
  inputData,
  operationList,
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
            storageCategories={storageCategories}
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
            operationList={operationList}
            changeRangeCalendar={changeRangeCalendar}
            range={range}
            setCheckMainField={setCheckMainField}
            gistogramSize={gistogramSize}
          />
        }
      />
    </Routes>
  )
}

export default MainFieldRouter

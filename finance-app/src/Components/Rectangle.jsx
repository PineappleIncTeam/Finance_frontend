import "./Rectangle.css"
import Navigation from "./Navigation"
import { useEffect, useState } from "react"
import { useSelector } from "react-redux"
import Aside from "./Aside/Aside"
import Transactions from "./Transactions/Transactions"
import MainFieldRouter from "./RoutePage/MainFieldRouter"
import { AiOutlineMenu, AiOutlineClose } from "react-icons/ai"
import { URLS, currentDate, startDate } from "../urls/urlsAndDates"
import { getStorageSum, getBalanceToTarget, getBalanceToTargetinPercent } from "../Utils/storageFunctions"

function Rectangle() {
  //
  const dataCal = useSelector((state) => state.data.data)
  
  const selectDate = (dataCal && dataCal.split(".").reverse().join("-")) || currentDate
  //
  const token = useSelector((state) => state.user.token)
  //
  // const [allOperationList, setAllOperationList] = useState()
  const [operationList, setOperationList] = useState("")
  const [symbol, setSymbol] = useState("+")
  const [balanceData, setBalanceData] = useState("")
  const [inputData, setInputData] = useState("")
  const [checkMainField, setCheckMainField] = useState(true)
  //
  const [categories, setCategories] = useState("")
  const [storageCategories, setStorageCategories] = useState("")
  const [storageSum, setStorageSum] = useState()
  const [balanceToTarget, setBalanceToTarget] = useState()
  const [balanceToTargetInPercent, setBalanceToTargetInPercent] = useState([])

  const [range, setRange] = useState(true)
  const [menuActive, setMenuActive] = useState(false)

  function changeRangeCalendar(range) {
    setRange(range)
  }

  //
  const [gistogramSize, setGistogramSize] = useState({
    width: 280,
    height: 500,
    indexAxis: "y",
  })
  const [width, setWidth] = useState(window.innerWidth)
  useEffect(() => {
    const handleResize = (event) => {
      setWidth(event.target.innerWidth)
    }
    window.addEventListener("resize", handleResize)
    return () => {
      window.removeEventListener("resize", handleResize)
    }
  }, [gistogramSize])

  useEffect(() => {
    if (width >= 1920) {
      setGistogramSize({ width: 902, height: 408, indexAxis: "x" })
    } else if (width < 1920 && width >= 1280) {
      setGistogramSize({ width: 600, height: 280, indexAxis: "x" })
    } else if (width < 1280 && width > 768) {
      setGistogramSize({ width: 400, height: 200, indexAxis: "x" })
    } else if (width <= 768) {
      setGistogramSize({ width: 280, height: 500, indexAxis: "y" })
    }
  }, [width])
  //
  function getCategories(typeOfCategories) {
    const options = {
      method: "GET",
      headers: {
        "Content-Type": "application/json",
        Authorization: `Token ${token}`,
      },
    }
    fetch(typeOfCategories, options)
      .then((result) => result.json())
      .then((userCategories) => setCategories(userCategories))
  }

  function getStorageCategories(typeOfCategories) {
    const options = {
      method: "GET",
      headers: {
        "Content-Type": "application/json",
        Authorization: `Token ${token}`,
      },
    }
    fetch(typeOfCategories, options)
      .then((result) => result.json())
      .then((userCategories) => {
        setStorageCategories(userCategories)
        setStorageSum(getStorageSum(userCategories))
        setBalanceToTarget(getBalanceToTarget(userCategories))
        setBalanceToTargetInPercent(getBalanceToTargetinPercent(userCategories))
      })
  }

  function getOperationList(endpoint, symbol) {
    const options = {
      method: "GET",
      headers: {
        "Content-Type": "application/json",
        Authorization: `Token ${token}`,
      },
    }
    fetch(endpoint, options)
      .then((result) => result.json())
      .then((responseServer) => {
        setOperationList("")
        setOperationList(responseServer)
        setSymbol(symbol)
      })
  }
  // function getAllOperationList() {
  //   const options = {
  //     method: "GET",
  //     headers: {
  //       "Content-Type": "application/json",
  //       Authorization: `Token ${token}`,
  //     },
  //   }
  //   fetch(URLS.getAllOperations, options)
  //     .then((result) => result.json())
  //     .then((responseServer) => {
  //       setAllOperationList(responseServer)
  //     })
  // }
  // useEffect(() => {
  //   getAllOperationList()
  // }, [])

  function getBalanceData() {
    const options = {
      method: "GET",
      headers: {
        "Content-Type": "application/json",
        Authorization: `Token ${token}`,
      },
    }
    fetch(
      `${URLS.balance}?date_start=${startDate}&date_end=${selectDate}`,
      options
    )
      .then((result) => result.json())
      .then((responseServer) => setBalanceData(Number(responseServer.sum_balance).toFixed(2)))
  }

  useEffect(() => {
    getBalanceData()
  }, [dataCal])

  function getInputData(endpoint) {
    const options = {
      method: "GET",
      headers: {
        "Content-Type": "application/json",
        Authorization: `Token ${token}`,
      },
    }
    fetch(endpoint, options)
      .then((result) => result.json())
      .then((responseServer) => {
        if (responseServer.length) {
          responseServer.map((responseNumber) => {
            let constSum = Number(responseNumber.constant_sum)
            let onceSum = Number(responseNumber.once_sum)
            let accumSum = Number(responseNumber.accum_sum)
            let sumField = accumSum
              ? (constSum + onceSum + accumSum).toFixed(2)
              : (constSum + onceSum).toFixed(2)
            return setInputData(sumField)
          })
        } else {
          setInputData("0")
        }
      })
  }

  return (
    <>
      <div
        className="rectangle"
        onClick={() => menuActive && setMenuActive(!menuActive)}
      >
        <div className="mobile_burg" onClick={() => setMenuActive(!menuActive)}>
          {menuActive ? (
            <AiOutlineClose color="teal" size={40} />
          ) : (
            <AiOutlineMenu color="teal" size={40} />
          )}
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
                gistogramSize={gistogramSize}
              />
            </div>
            <div className="aside">
              <Aside
                balanceData={balanceData}
                range={range}
                selectDate={selectDate}
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
  )
}
export default Rectangle

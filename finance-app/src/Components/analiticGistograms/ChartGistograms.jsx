import React from "react"
import { Chart as ChartJS, ArcElement, Tooltip, Legend } from "chart.js"
import { Pie, Doughnut } from "react-chartjs-2"
import { colorsIncome, colorsOutcome, colorsStorage, colorsAnalitic } from "../../data/colors"
import style from "./ChartGistograms.module.css"

function ChartGistograms({
  categoryNameIncome,
  resultSumIncome,
  categoryNameOutcome,
  resultSumOutcome,
  categoryNameMoneyBox,
  resultSumMoneyBox,
  isActive,
  percentChoice,
  storageSum,
  balanceToTarget,
  analiticSum
}) {
  ChartJS.register(ArcElement, Tooltip, Legend)
  const checkName = categoryNameIncome ? categoryNameIncome : []
  const checkSum = resultSumIncome ? resultSumIncome : []
  const checkSumTotal = checkSum.length > 0 && checkSum.reduce((a, b) => ((+a) + (+b)), 0).toFixed(2)
  const checkNameOut = categoryNameOutcome ? categoryNameOutcome : []
  const checkSumOut = resultSumOutcome ? resultSumOutcome : []
  const checkSumOutTotal = checkSumOut.length > 0 && checkSumOut.reduce((a, b) => ((+a) + (+b)), 0).toFixed(2)
  const checkNameMoneyBox = categoryNameMoneyBox ? categoryNameMoneyBox : []
  const checkSumMoneyBox = resultSumMoneyBox ? resultSumMoneyBox : []
  const checkSumMoneyBoxTotal = checkSumMoneyBox.length > 0 && checkSumMoneyBox.reduce((a, b) => ((+a) + (+b)), 0).toFixed(2)
  const totalCosts = (Number(checkSumOutTotal) + Number(checkSumMoneyBoxTotal)).toFixed(2)
  const storageData = [storageSum, balanceToTarget]
  const storageNames = ["Сумма накоплений", "Осталось накопить"]
  
  // const checkSumAnalitic = checkSum.length > 0 && [checkSumTotal, totalCosts]
  // const onePercentAnalitic = checkSumAnalitic.length > 0 && (checkSumAnalitic.reduce((a, b) => ((+a) + (+b))).toFixed(2) / 100).toFixed(2)
  // const checkSumAnaliticInPercent = checkSumAnalitic.length > 0 && checkSumAnalitic.map((item) => (item / onePercentAnalitic).toFixed(2) )
  // console.log(checkSumAnaliticInPercent)
  
  
  let options = {
    plugins: {
      legend: {
        display: false,
        position: "right",
        align: "center",
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
    },
  }

  const dataIncome = {
    labels: [...checkName],

    datasets: [
      {
        data: [...checkSum],
        backgroundColor: colorsIncome,
        hoverOffset: 4,
      },
    ],
  }

  const dataCosts = {
    labels: [...checkNameOut, ...checkNameMoneyBox],

    datasets: [
      {
        data: [...checkSumOut, ...checkSumMoneyBox],
        backgroundColor: colorsOutcome,
        hoverOffset: 4,
      },
    ],
  }

  const dataStorage = {
    labels: [...storageNames],

    datasets: [
      {
        data: [...storageData],
        backgroundColor: colorsStorage,
        hoverOffset: 4,
      },
    ],
  }
  const dataAnalitic = {
    labels: ["Общий доход", "Общий расход"],

    datasets: [
      {
        data: analiticSum,
        backgroundColor: colorsAnalitic,
        hoverOffset: 4,
      },
    ],
  }

  return (
    <div className={style.diagram_box}>
      <div className={style.diagrams}>
        <div className={style.pie}>
          {isActive === "income" && (
            <Pie
              className={style.doughnut}
              width={style.doughnut}
              height={style.doughnut}
              data={dataIncome}
              options={options}
            />
          )}
          {isActive === "costs" && (
            <Pie
              className={style.doughnut}
              width={style.doughnut}
              height={style.doughnut}
              data={dataCosts}
              options={options}
            />
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
              data={dataAnalitic}
              options={options}
            />
          )}
        </div>
      </div>
      <div className={style.categories_name}>
        {isActive === "income" && !percentChoice && checkSum.length > 0 && (
          <div className={style.label_element}>
            <div
              className={style.category_color}
              style={{ backgroundColor: colorsStorage[1] }}
            ></div>
            <div className={style.category_name}>
              Общий доход {checkSumTotal}{" "}
              <span>{!percentChoice ? "₽" : "%"}</span>
            </div>
          </div>
        )}
        {isActive === "income" &&
          checkSum.map((item, index) => {
            return (
              <div className={style.label_element} key={index}>
                <div
                  className={style.category_color}
                  style={{ backgroundColor: colorsIncome[index] }}
                ></div>
                <div className={style.category_name}>
                  {checkName[index]} {item}{" "}
                  <span>{!percentChoice ? "₽" : "%"}</span>
                </div>
              </div>
            )
          })}
        {isActive === "costs" && !percentChoice && checkSumOutTotal && (
          <div className={style.label_element}>
            <div
              className={style.category_color}
              style={{ backgroundColor: colorsStorage[1] }}
            ></div>
            <div className={style.category_name}>
              Общий расход {totalCosts}{" "}
              <span>{!percentChoice ? "₽" : "%"}</span>
            </div>
          </div>
        )}
        {isActive === "costs" &&
          checkSumOut.map((item, index) => {
            return (
              <div className={style.label_element} key={index}>
                <div
                  className={style.category_color}
                  style={{ backgroundColor: colorsOutcome[index] }}
                ></div>
                <div className={style.category_name}>
                  {checkNameOut[index] || checkNameMoneyBox[index - (checkSumOut.length - checkNameMoneyBox.length)]} {item}{" "}
                  <span>{!percentChoice ? "₽" : "%"}</span>
                </div>
              </div>
            )
          })}
          {isActive === "costs" &&
          checkSumMoneyBox.map((item, index) => {
            return (
              <div className={style.label_element} key={index}>
                <div
                  className={style.category_color}
                  style={{ backgroundColor: colorsOutcome[index + checkSumOut.length] }}
                ></div>
                <div className={style.category_name}>
                  {checkNameMoneyBox[index]} {item}{" "}
                  <span>{!percentChoice ? "₽" : "%"}</span>
                </div>
              </div>
            )
          })

          }
        {isActive === "storage" &&
          storageData.map((item, index) => {
            return (
              <div className={style.label_element} key={index}>
                <div
                  className={style.category_color}
                  style={{ backgroundColor: colorsStorage[index] }}
                ></div>
                <div className={style.category_name}>
                  {storageNames[index]} {item}{" "}
                  <span>{!percentChoice ? "₽" : "%"}</span>
                </div>
              </div>
            )
          })}
          {isActive === "analitic" && analiticSum.length > 0 &&
          analiticSum.map((item, index) => {
            return (
              <div className={style.label_element} key={index}>
                <div
                  className={style.category_color}
                  style={{ backgroundColor: colorsAnalitic[index] }}
                ></div>
                <div className={style.category_name}>
                  {dataAnalitic.labels[index]} {item}{" "}
                  <span>{!percentChoice ? "₽" : "%"}</span>
                </div>
              </div>
            )
          })}
      </div>
    </div>
  )
}

export default ChartGistograms

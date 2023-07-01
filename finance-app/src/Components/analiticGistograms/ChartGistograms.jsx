import React from "react"
import { Chart as ChartJS, ArcElement, Tooltip, Legend } from "chart.js"
import { Pie, Doughnut } from "react-chartjs-2"
import { colorsIncome, colorsOutcome, colorsStorage } from "../../data/colors"
import style from "./ChartGistograms.module.css"

function ChartGistograms({
  categoryNameIncome,
  resultSumIncome,
  categoryNameOutcome,
  resultSumOutcome,
  isActive,
  percentChoice,
  storageSum,
  balanceToTarget,
}) {
  ChartJS.register(ArcElement, Tooltip, Legend)
  const checkName = categoryNameIncome ? categoryNameIncome : []
  const checkSum = resultSumIncome ? resultSumIncome : []
  const checkSumTotal = checkSum.length > 0 && checkSum.reduce((a, b) => a + b)
  const checkNameOut = categoryNameOutcome ? categoryNameOutcome : []
  const checkSumOut = resultSumOutcome ? resultSumOutcome : []
  const checkSumOutTotal = checkSumOut.length > 0 && checkSumOut.reduce((a, b) => a + b)
  const storageData = [storageSum, balanceToTarget]
  const storageNames = ["Сумма накоплений", "Осталось накопить"]
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
    labels: [...checkNameOut],

    datasets: [
      {
        data: [...checkSumOut],
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
              Общий расход {checkSumOutTotal}{" "}
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
                  {checkNameOut[index]} {item}{" "}
                  <span>{!percentChoice ? "₽" : "%"}</span>
                </div>
              </div>
            )
          })}
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
      </div>
    </div>
  )
}

export default ChartGistograms

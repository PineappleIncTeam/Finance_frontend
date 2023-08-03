// import React, { useState, useEffect } from "react"
import {
  Chart as ChartJS,
  CategoryScale,
  LinearScale,
  BarElement,
  Title,
  Tooltip,
  Legend,
} from "chart.js"

import { Bar, Doughnut } from "react-chartjs-2"
import {
  colorsAnalitic,
  colorsIncome,
  colorsOutcome,
  colorsStorage,
} from "../../data/colors"
import style from "./Gistogram.module.css"

function Gistogram({
  gistogramSize,
  sumGroupIncome,
  sumGroupOutcome,
  sumGroupMoneyBox,
  isActive,
  percentChoice,
  incomePercent,
  outcomePercent,
  storageSum,
  balanceToTarget,
  analiticSum,
}) {
  ChartJS.register(
    LinearScale,
    CategoryScale,
    BarElement,
    Title,
    Tooltip,
    Legend
  )
  const options = {
    indexAxis: gistogramSize.indexAxis,
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
  }
  //
  const storageData = [storageSum, balanceToTarget]
  const storageNames = ["Сумма накоплений", "Осталось накопить"]
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
  //
  const incomeCategories = sumGroupIncome.map((item) => Object.keys(item))
  const incomeCategory = sumGroupIncome.length > 0 && sumGroupIncome[0]
  const incomeCategoryName =
    sumGroupIncome.length > 0 && Object.keys(incomeCategory)
  const incomeMonths =
    sumGroupIncome.length > 0 && Object.keys(incomeCategory[incomeCategoryName])
  const labels = incomeMonths

  const dataIncome = {
    labels,
    datasets: incomeCategories.map((item, index) => {
      let result = {}
      result = {
        label: item,
        data: !percentChoice
          ? Object.values(sumGroupIncome[index][item])
          : incomePercent[index],
        backgroundColor: colorsIncome[index],
      }
      return result
    }),
  }

  const moneyBoxCategories = sumGroupMoneyBox.map((item) => Object.keys(item))
  // const moneyBoxCategory = sumGroupMoneyBox.length > 0 && sumGroupMoneyBox[0]
  // const moneyBoxCategoryName = sumGroupMoneyBox.length > 0 && Object.keys(moneyBoxCategory)
  // const moneyBoxMonths = sumGroupMoneyBox.length > 0 && Object.keys(moneyBoxCategory[moneyBoxCategoryName])

  const outcomeCategories = sumGroupOutcome.map((item) => Object.keys(item))
  const outcomeCategory = sumGroupOutcome.length > 0 && sumGroupOutcome[0]
  const outcomeCategoryName =
    sumGroupOutcome.length > 0 && Object.keys(outcomeCategory)
  const outcomeMonths =
    sumGroupOutcome.length > 0 &&
    Object.keys(outcomeCategory[outcomeCategoryName])
  const outcomeLabels = outcomeMonths
  //

  //
  const datasets = outcomeCategories.map((item, index) => {
    let result = {}
    result = {
      label: item,
      data: !percentChoice
        ? Object.values(sumGroupOutcome[index][item])
        : outcomePercent[index],
      backgroundColor: colorsOutcome[index],
    }
    return result
  })
  const moneyBoxDatasets = moneyBoxCategories.map((item, index) => {
    let result = {}
    result = {
      label: item,
      data: !percentChoice
        ? Object.values(sumGroupMoneyBox[index][item])
        : outcomePercent[index + outcomeCategories.length],

      backgroundColor: colorsOutcome[index + outcomeCategories.length],
    }
    return result
  })

  datasets.push(...moneyBoxDatasets)
  //

  const dataOutcome = {
    labels: outcomeLabels,
    datasets: datasets,
  }

  return (
    <>
      <div className={style.gistogram}>
        {isActive === "income" && (
          <div className={style.bar_gistogram}>
            <Bar
              className={style.bar_gistogram}
              width={gistogramSize.width}
              height={gistogramSize.height}
              options={options}
              data={dataIncome}
            />
          </div>
        )}
        {isActive === "costs" && (
          <div className={style.bar_gistogram}>
            <Bar
              className={style.bar_gistogram}
              width={gistogramSize.width}
              height={gistogramSize.height}
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
            data={dataAnalitic}
            options={options}
          />
        )}
      </div>

      <div className={style.categories_name}>
        {isActive === "income" &&
          incomeCategories.map((item, index) => {
            return (
              <div className={style.label_element} key={index}>
                <div
                  className={style.category_color}
                  style={{ backgroundColor: colorsIncome[index] }}
                ></div>
                <div className={style.category_name}>{item}</div>
              </div>
            )
          })}
        {isActive === "costs" &&
          outcomeCategories.map((item, index) => {
            return (
              <div className={style.label_element} key={index}>
                <div
                  className={style.category_color}
                  style={{ backgroundColor: colorsOutcome[index] }}
                ></div>
                <div className={style.category_name}>{item}</div>
              </div>
            )
          })}
        {isActive === "costs" &&
          moneyBoxCategories.map((item, index) => {
            return (
              <div className={style.label_element} key={index}>
                <div
                  className={style.category_color}
                  style={{
                    backgroundColor:
                      colorsOutcome[index + outcomeCategories.length],
                  }}
                ></div>
                <div className={style.category_name}>{item}</div>
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
        {isActive === "analitic" &&
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
    </>
  )
}
export default Gistogram

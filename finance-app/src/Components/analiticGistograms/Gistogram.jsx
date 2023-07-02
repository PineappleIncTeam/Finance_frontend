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
import { colorsIncome, colorsOutcome, colorsStorage } from "../../data/colors"
import style from "./Gistogram.module.css"

function Gistogram({
  gistogramSize,
  sumGroupIncome,
  sumGroupOutcome,
  isActive,
  percentChoice,
  incomePercent,
  outcomePercent,
  storageSum,
  balanceToTarget,
}) {
  ChartJS.register(
    CategoryScale,
    LinearScale,
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
    scales: {
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
  const outcomeCategories = sumGroupOutcome.map((item) => Object.keys(item))
  const outcomeCategory = sumGroupOutcome.length > 0 && sumGroupOutcome[0]
  const outcomeCategoryName =
    sumGroupOutcome.length > 0 && Object.keys(outcomeCategory)
  const outcomeMonths =
    sumGroupOutcome.length > 0 &&
    Object.keys(outcomeCategory[outcomeCategoryName])
  const outcomeLabels = outcomeMonths
  const dataOutcome = {
    labels: outcomeLabels,
    datasets: outcomeCategories.map((item, index) => {
      let result = {}
      result = {
        label: item,
        data: !percentChoice
          ? Object.values(sumGroupOutcome[index][item])
          : outcomePercent[index],
        backgroundColor: colorsOutcome[index],
      }
      return result
    }),
  }
  return (
    <>
      <div className={style.gistogram}>
        <div className={style.bar_gistogram}>
          {isActive === "income" && (
            <Bar
              className={style.bar_gistogram}
              width={gistogramSize.width}
              height={gistogramSize.height}
              options={options}
              data={dataIncome}
            />
          )}
          {isActive === "costs" && (
            <Bar
              className={style.bar_gistogram}
              width={gistogramSize.width}
              height={gistogramSize.height}
              options={options}
              data={dataOutcome}
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
    </>
  )
}
export default Gistogram

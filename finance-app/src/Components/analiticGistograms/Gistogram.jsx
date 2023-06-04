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

import { Bar } from "react-chartjs-2"
import { colorsIncome, colorsOutcome } from "../../data/colors"
import style from "./Gistogram.module.css"

function Gistogram({
  gistogramSize,
  sumGroupIncome,
  sumGroupOutcome,
  isActive,
  percentChoice,
  incomePercent,
  outcomePercent,
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
          {isActive === "income" ? (
            <Bar
              className={style.bar_gistogram}
              width={gistogramSize.width}
              height={gistogramSize.height}
              options={options}
              data={dataIncome}
            />
          ) : (
            <Bar
              className={style.bar_gistogram}
              width={gistogramSize.width}
              height={gistogramSize.height}
              options={options}
              data={dataOutcome}
            />
          )}
        </div>
      </div>
      <div className={style.categories_name}>
        {isActive === "income"
          ? incomeCategories.map((item, index) => {
              return (
                <div className={style.label_element} key={index}>
                  <div
                    className={style.category_color}
                    style={{ backgroundColor: colorsIncome[index] }}
                  ></div>
                  <div className={style.category_name}>{item}</div>
                </div>
              )
            })
          : outcomeCategories.map((item, index) => {
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
      </div>
    </>
  )
}
export default Gistogram

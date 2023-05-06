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
import style from "./Gistogram.module.css"

function Gistogram({
  gistogramSize,
  sumGroupIncome,
  sumGroupOutcome,
  isActive,
  percentChoice,
  incomePercent,
  outcomePercent
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

  const colorsIncome = [
    "#aceb0e",
    "#124e5b",
    "#125b38",
    "#23b09b",
    "#415b12",
    "#125b2b",
    "#125b3e",
    "#1a8675",
    "#23b09b",
    "#1eb067",
    "#1eb036",
    "#52e29a",
    "#7ee9b3",
    "#1eb01e",
    "#1eb067",
    "#09c567",
    "#0f5934",
    "#17844d",
    "#04592f",
    "#045904",
    "#068a49",
    "#08bb63",
    "#20770b",
    "#2da60f",
    "#3ad513",
    "#2da60f",
    "#1f8705",
    "#608705",
    "#207a3b",
    "#5ed582",
  ]
  const colorsOutcome = [
    "#dfa919",
    "#f8b400",
    "#926a00",
    "#c58f00",
    "#f8b400",
    "#ffc52c",
    "#f8f200",
    "#8b8408",
    "#bbb20b",
    "#ebe00e",
    "#f3ea39",
    "#aba30c",
    "#dbd00f",
    "#f0e62d",
    "#99931e",
    "#ab7b0c",
    "#c0a30f",
    "#edc915",
    "#ffd503",
    "#dbed15",
    "#edc915",
    "#c4a714",
    "#96800f",
    "#c47b14",
    "#edd351",
    "#ffc700",
    "#f7ff00",
    "#ff8700",
    "#c99d02",
    "#c96b02",
  ]
  const incomeCategories = sumGroupIncome.map(item => Object.keys(item))
  const incomeCategory = sumGroupIncome.length > 0 && sumGroupIncome[0]
  const incomeCategoryName = sumGroupIncome.length > 0 && Object.keys(incomeCategory)
  const incomeMonths = sumGroupIncome.length > 0 && Object.keys(incomeCategory[incomeCategoryName])
  const labels = incomeMonths
  const dataIncome = {
    labels,
    datasets: incomeCategories.map((item, index) => {
      let result = {}
      result = {
        label: item,
        data: !percentChoice ? Object.values(sumGroupIncome[index][item]) : incomePercent[index],
        backgroundColor: colorsIncome[index],
      }
      return result
    }),
    // [
    // {
    //   label: "Dataset 1",
    //   data: [65, 59, 80, 81, 56, 55, 40, 65, 59, 80, 81, 56, 55, 40],
    //   backgroundColor: "rgb(84, 125, 42)",
    // },
    // {
    //   label: "Dataset 2",
    //   data: [65, 59, 80, 81, 56, 55, 40, 65, 59, 80, 81, 56, 55, 40],
    //   backgroundColor: "rgb(134, 171, 91)",
    // },
    // {
    //   label: "Dataset 3",
    //   data: [65, 59, 80, 81, 56, 55, 40, 65, 59, 80, 81, 56, 55, 40],
    //   backgroundColor: "rgb(209, 241, 172)",
    // },
    // ],
  }
  const outcomeCategories = sumGroupOutcome.map(item => Object.keys(item))
  const outcomeCategory = sumGroupOutcome.length > 0 && sumGroupOutcome[0]
  const outcomeCategoryName = sumGroupOutcome.length > 0 && Object.keys(outcomeCategory)
  const outcomeMonths = sumGroupOutcome.length > 0 && Object.keys(outcomeCategory[outcomeCategoryName])
  const outcomeLabels = outcomeMonths
  const dataOutcome = {
    labels: outcomeLabels,
    datasets: outcomeCategories.map((item, index) => {
      let result = {}
      result = {
        label: item,
        data: !percentChoice ? Object.values(sumGroupOutcome[index][item]) : outcomePercent[index],
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
              // let result = `<div className="category_color" style="background-color: ${colorsIncome[index]}">${item.categories__categoryName}</div>`
              return (
                <div className={style.label_element}>
                  <div
                    className={style.category_color}
                    style={{ backgroundColor: colorsIncome[index] }}
                  ></div>
                  <div className={style.category_name}>
                    {item}
                  </div>
                </div>
              )
            })
          : outcomeCategories.map((item, index) => {
              // let result = `<div className="category_color" style="background-color: ${colorsIncome[index]}">${item.categories__categoryName}</div>`
              return (
                <div className={style.label_element}>
                  <div
                    className={style.category_color}
                    style={{ backgroundColor: colorsOutcome[index] }}
                  ></div>
                  <div className={style.category_name}>
                    {item}
                  </div>
                </div>
              )
            })}
      </div>
    </>
  )
}
export default Gistogram

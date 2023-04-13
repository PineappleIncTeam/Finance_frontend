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
    "rgb(84  125   42)",
    "rgb(134  171   91)",
    "rgb(209  241  172)",
    "rgb(164  240   76)",
    "rgb(115  191   26)",
    "rgb(55   93   10)",
    "rgb(34   51   14)",
    "rgb(74   85   60)",
    "rgb(119  129  107)",
    "rgb(129  240    2)",
    "rgb(173 255 47)",
    "rgb(255 228 181)",
    "rgb(255 69 0)",
    "rgb(160 82 45)",
    "rgb(184 134 11)",
    "rgb(222 184 135)",
    "rgb(178 34 34)",
    "rgb(233 150 122)",
    "rgb(128 0 0)",
    "rgb(250 128 114)",
    "rgb(205 92 92)",
    "rgb(240 128 128)",
    "rgb(233 150 122)",
  ]
  const colorsOutcome = [
    "rgb(248  180    0)",
    "rgb(238  212  143)",
    "rgb(185  156   78)",
    "rgb(112   92   41)",
    "rgb(183  135    9)",
    "rgb(75   60   20)",
    "rgb(248  238  210)",
    "rgb(177  167  140)",
    "rgb(26   20    2)",
    "rgb(255  185    0)",
    "rgb(184 134 11)",
    "rgb(255 69 0)",
    "rgb(255 165 0)",
    "rgb(244 164 96)",
    "rgb(222 184 135)",
    "rgb(139 0 0)",
    "rgb(47 79 79)",
    "rgb(119 136 153)",
    "rgb(105 105 105)",
    "rgb(30 144 255)",
    "rgb(0 0 255)",
    "rgb(0 0 128)",
    "rgb(72 61 139)",
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

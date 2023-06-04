import React from "react"
import { Chart as ChartJS, ArcElement, Tooltip, Legend } from "chart.js"
import { Pie } from "react-chartjs-2"
import { colorsIncome, colorsOutcome } from "../../data/colors"
import style from "./ChartGistograms.module.css"

function ChartGistograms({
  categoryNameIncome,
  resultSumIncome,
  categoryNameOutcome,
  resultSumOutcome,
  isActive,
  percentChoice,
}) {
  ChartJS.register(ArcElement, Tooltip, Legend)
  const checkName = categoryNameIncome ? categoryNameIncome : []
  const checkSum = resultSumIncome ? resultSumIncome : []
  const checkNameOut = categoryNameOutcome ? categoryNameOutcome : []
  const checkSumOut = resultSumOutcome ? resultSumOutcome : []
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

  return (
    <div className={style.diagram_box}>
      <div className={style.diagrams}>
        <div className={style.pie}>
          {isActive === "income" ? (
            <Pie
              className={style.doughnut}
              width={style.doughnut}
              height={style.doughnut}
              data={dataIncome}
              options={options}
            />
          ) : (
            <Pie
              className={style.doughnut}
              width={style.doughnut}
              height={style.doughnut}
              data={dataCosts}
              options={options}
            />
          )}
        </div>
      </div>
      <div className={style.categories_name}>
        {isActive === "income"
          ? checkSum.map((item, index) => {
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
            })
          : checkSumOut.map((item, index) => {
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
      </div>
    </div>
  )
}

export default ChartGistograms

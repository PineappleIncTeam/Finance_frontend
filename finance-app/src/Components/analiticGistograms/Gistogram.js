import React, { useState, useEffect } from "react"
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
  sumGroupIncome,
  resultSumIncome,
  sumGroupOutcome,
  resultSumOutcome,
  isActive,
}) {
  ChartJS.register(
    CategoryScale,
    LinearScale,
    BarElement,
    Title,
    Tooltip,
    Legend
  )
  const [gistogramSize, setGistogramSize] = useState({ width: 902, height: 408, indexAxis: "x" })
  const [width, setWidth] = useState(window.innerWidth)
  useEffect(() => {
    const handleResize = (event) => {
      setWidth(event.target.innerWidth);
    };
    window.addEventListener('resize', handleResize);
    return () => {
      window.removeEventListener('resize', handleResize);
    };
  }, [gistogramSize])

  useEffect(() => {
    if (width >= 1920) {
      setGistogramSize({ width: 902, height: 408, indexAxis: "x" })
    } else if (width < 1920 && width >= 1280) {
      setGistogramSize({ width: 600, height: 280, indexAxis: "x" })
    } else if (width < 1280 && width > 768) {
      setGistogramSize({ width: 400, height: 200, indexAxis: "x" })
    } else if (width < 768) {
      setGistogramSize({ width: 280, height: 500, indexAxis: "y" })
    }
  }, [width])
  console.log(gistogramSize)
  console.log(width)
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
        borderRadius: 10,
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
  ]
  const labels = [
    "Январь",
    "Февраль",
    "Март",
    "Апрель",
    "Май",
    "Июнь",
    "Июль",
    "Август",
    "Сентябрь",
    "Октябрь",
    "Ноябрь",
    "Декабрь",
  ]
  const dataIncome = {
    labels,
    datasets: sumGroupIncome.map((item, index) => {
      let result = {}
      result = {
        label: item.categories__categoryName,
        data: [item.result_sum],
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
  const dataOutcome = {
    labels,
    datasets: sumGroupOutcome.map((item, index) => {
      let result = {}
      result = {
        label: item.categories__categoryName,
        data: [item.result_sum],
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
              className={style.bar}
              options={options}
              width={gistogramSize.width}
              height={gistogramSize.height}
              data={dataOutcome}
            />
          )}
        </div>
      </div>
      <div className={style.categories_name}>
        {isActive === "income"
          ? sumGroupIncome.map((item, index) => {
              // let result = `<div className="category_color" style="background-color: ${colorsIncome[index]}">${item.categories__categoryName}</div>`
              return (
                <div className={style.label_element}>
                  <div
                    className={style.category_color}
                    style={{ backgroundColor: colorsIncome[index] }}
                  ></div>
                  <div className={style.category_name}>
                    {item.categories__categoryName}
                  </div>
                </div>
              )
            })
          : sumGroupOutcome.map((item, index) => {
              // let result = `<div className="category_color" style="background-color: ${colorsIncome[index]}">${item.categories__categoryName}</div>`
              return (
                <div className={style.label_element}>
                  <div
                    className={style.category_color}
                    style={{ backgroundColor: colorsOutcome[index] }}
                  ></div>
                  <div className={style.category_name}>
                    {item.categories__categoryName}
                  </div>
                </div>
              )
            })}
      </div>
    </>
  )
}
export default Gistogram

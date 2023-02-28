import React from "react"
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
  categoryNameOutcome,
  resultSumOutcome,
}) {
  ChartJS.register(
    CategoryScale,
    LinearScale,
    BarElement,
    Title,
    Tooltip,
    Legend
  )
  console.log(sumGroupIncome)
  const options = {
    barThickness: 10,
    plugins: {
      legend: {
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
        backgroundColor: "rgba(0, 0, 0, 1)",
        borderRadius: 10,
      },
    },
  }

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
  const data = {
    labels,
    datasets: 
    // sumGroupIncome.map((item) => {
    //   let result = {}
    //   result = {
    //     label: item.categories__categoryName,
    //     data: [item.result_sum],
    //     backgroundColor: "rgb(84, 125, 42)",
    //   }
    //   return result
    // }),
    [
    {
      label: "Dataset 1",
      data: [65, 59, 80, 81, 56, 55, 40, 65, 59, 80, 81, 56, 55, 40],
      backgroundColor: "rgb(84, 125, 42)",
    },
    {
      label: "Dataset 2",
      data: [65, 59, 80, 81, 56, 55, 40, 65, 59, 80, 81, 56, 55, 40],
      backgroundColor: "rgb(134, 171, 91)",
    },
    {
      label: "Dataset 3",
      data: [65, 59, 80, 81, 56, 55, 40, 65, 59, 80, 81, 56, 55, 40],
      backgroundColor: "rgb(209, 241, 172)",
    },
    ],
  }
  console.log(data.datasets)
  return (
    <div className={style.gistogram}>
      <div className={style.bar_gistogram}>
        <Bar className={style.bar} options={options} data={data} />
      </div>
    </div>
  )
}
export default Gistogram

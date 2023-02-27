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
function Gistogram() {
  ChartJS.register(
    CategoryScale,
    LinearScale,
    BarElement,
    Title,
    Tooltip,
    Legend
  )


  const labels = ["Январь", "Февраль", "Март", "Апрель", "Январь", "Февраль", "Март", "Апрель", "Май", "Январь", "Февраль", "Март", "Апрель", "Май"]
  const options = {
    barThickness: 10,
    plugins: {
      
      legend: {
        position: 'bottom',
        align: 'start',
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
        backgroundColor: 'rgba(0, 0, 0, 1)',
        borderRadius: 10,
      }
    }
  }

  //   const labels = ['January', 'February', 'March', 'April', 'May', 'June', 'July'];
  
  const data = {
    labels,
    datasets: [
      {
        label: "Dataset 1",
        data: [65, 59, 80, 81, 56, 55, 40, 65, 59, 80, 81, 56, 55, 40],
        backgroundColor: "rgb(255, 99, 132)",
      },
      {
        label: "Dataset 2",
        data: [65, 59, 80, 81, 56, 55, 40, 65, 59, 80, 81, 56, 55, 40],
        backgroundColor: "rgb(75, 192, 192)",
      },
      {
        label: "Dataset 3",
        data: [65, 59, 80, 81, 56, 55, 40, 65, 59, 80, 81, 56, 55, 40],
        backgroundColor: "rgb(53, 162, 235)",
      },
    ],
  }

  return (
    <div className={style.gistogram}>
      <div className={style.bar_gistogram}>
        <Bar
        className={style.bar} 
        options={options} 
        data={data}
        />
      </div>
      
    </div>
  )
}
export default Gistogram

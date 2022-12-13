import React from "react";
import { Chart as ChartJS, ArcElement, Tooltip, Legend } from "chart.js";
import { Doughnut } from "react-chartjs-2";
import style from "./ChartGistograms.module.css";

function ChartGistograms() {
  ChartJS.register(ArcElement, Tooltip, Legend);

  let options = {
    plugins: {
      legend: {
        display: false,
        position: "right",
        align: "end",

        // maxWidth: 150,
        labels: {
          font: {
            family: "Monserrat-Medium",
            size: 12,
          },
          padding: 20,
        },
      },
    },
  };

  const dataIncome = {
    labels: ["Зарплата", "Подработка", "Пассивный доход", "Наследство"],

    datasets: [
      {
        data: [130, 50, 60, 70],
        backgroundColor: [
          "rgb(12, 128, 80)",
          "rgb(45, 156, 110)",
          "rgb(156, 45, 69)",
          "rgb(236, 61, 99)",
        ],
        hoverOffset: 4,
      },
    ],
  };

  const dataCosts = {
    labels: ["Еда", "Одежда", "Развлечение", "ЖКХ"],

    datasets: [
      {
        data: [20, 70, 60, 40],
        backgroundColor: [
          "rgb(188,143,143)",
          "rgb(75,0,130)",
          "rgb(199,21,133)",
          "rgb(25,25,112)",
        ],
        hoverOffset: 4,
      },
    ],
  };

  // useEffect(() => {
  //     if (data) {
  //       let s = 0;
  //       data.map((el) => {
  //         return (s = s + el.value);
  //       });
  //       setSum(s);
  //     }
  //   }, [data, sum]);
  return (
    <div className={style.diagrams}>
      <div className={style.pie}>
        <label htmlFor="" className={style.title}>
          Доходы
        </label>
        <Doughnut
          width={400}
          height={400}
          data={dataIncome}
          options={options}
        />
      </div>
      <div className={style.pie}>
        <label htmlFor="" className={style.title}>
          Расходы
        </label>
        <Doughnut width={400} height={400} data={dataCosts} options={options} />
      </div>
    </div>
  );
}

export default ChartGistograms;

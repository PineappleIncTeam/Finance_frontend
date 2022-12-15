import React from "react";
import { Chart as ChartJS, ArcElement, Tooltip, Legend } from "chart.js";
import { Doughnut } from "react-chartjs-2";
import style from "./ChartGistograms.module.css";

function ChartGistograms({
  categoryNameIncome,
  resultSumIncome,
  categoryNameOutcome,
  resultSumOutcome,
}) {
  ChartJS.register(ArcElement, Tooltip, Legend);

  let options = {
    plugins: {
      legend: {
        display: false,
        position: "right",
        align: "end",

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
    labels: [...categoryNameIncome],

    datasets: [
      {
        data: [...resultSumIncome],
        backgroundColor: [
          "rgb(50,205,50)",
          "rgb(0,255,0)",
          "rgb(124,252,0)",
          "rgb(173,255,47)",
          "rgb(0,128,0)",
          "rgb(34,139,34)",
          "rgb(46,139,87)",
          "rgb(60,179,113)",
          "rgb(0,255,127)",
          "rgb(0,250,154)",
          "rgb(173,255,47)",
          "rgb(255,228,181)",
          "rgb(255,69,0)",
          "rgb(160,82,45)",
          "rgb(184,134,11)",
          "rgb(222,184,135)",
          "rgb(178,34,34)",
          "rgb(233,150,122)",
          "rgb(128,0,0)",
          "rgb(250,128,114)",
          "rgb(205,92,92)",
          "rgb(240,128,128)",
          "rgb(233,150,122)",
        ],
        hoverOffset: 4,
      },
    ],
  };

  const dataCosts = {
    labels: [...categoryNameOutcome],

    datasets: [
      {
        data: [...resultSumOutcome],
        backgroundColor: [
          "rgb(255,0,255)",
          "rgb(138,43,226)",
          "rgb(139,0,139)",
          "rgb(75,0,130)",
          "rgb(218,112,214)",
          "rgb(230,230,250)",
          "rgb(255,105,180)",
          "rgb(255,20,147)",
          "rgb(219,112,147)",
          "rgb(139,69,19)",
          "rgb(184,134,11)",
          "rgb(255,69,0)",
          "rgb(255,165,0)",
          "rgb(244,164,96)",
          "rgb(222,184,135)",
          "rgb(139,0,0)",
          "rgb(47,79,79)",
          "rgb(119,136,153)",
          "rgb(105,105,105)",
          "rgb(30,144,255)",
          "rgb(0,0,255)",
          "rgb(0,0,128)",
          "rgb(72,61,139)",
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

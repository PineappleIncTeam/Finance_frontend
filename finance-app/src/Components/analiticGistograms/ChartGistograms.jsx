import React from "react"
import { Chart as ChartJS, ArcElement, Tooltip, Legend } from "chart.js"
import { Doughnut } from "react-chartjs-2"
import style from "./ChartGistograms.module.css"

function ChartGistograms({
  categoryNameIncome,
  resultSumIncome,
  categoryNameOutcome,
  resultSumOutcome,
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
  }

  const dataIncome = {
    labels: [...checkName],

    datasets: [
      {
        data: [...checkSum],
        backgroundColor: [
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
          // "rgb(173,255,47)",
          // "rgb(255,228,181)",
          // "rgb(255,69,0)",
          // "rgb(160,82,45)",
          // "rgb(184,134,11)",
          // "rgb(222,184,135)",
          // "rgb(178,34,34)",
          // "rgb(233,150,122)",
          // "rgb(128,0,0)",
          // "rgb(250,128,114)",
          // "rgb(205,92,92)",
          // "rgb(240,128,128)",
          // "rgb(233,150,122)",
        ],
        hoverOffset: 4,
      },
    ],
  }

  const dataCosts = {
    labels: [...checkNameOut],

    datasets: [
      {
        data: [...checkSumOut],
        backgroundColor: [
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
          // "rgb(184,134,11)",
          // "rgb(255,69,0)",
          // "rgb(255,165,0)",
          // "rgb(244,164,96)",
          // "rgb(222,184,135)",
          // "rgb(139,0,0)",
          // "rgb(47,79,79)",
          // "rgb(119,136,153)",
          // "rgb(105,105,105)",
          // "rgb(30,144,255)",
          // "rgb(0,0,255)",
          // "rgb(0,0,128)",
          // "rgb(72,61,139)",
        ],
        hoverOffset: 4,
      },
    ],
  }

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
          className={style.doughnut}
          width={style.doughnut}
          height={style.doughnut}
          data={dataIncome}
          options={options}
        />
      </div>
      <div className={style.pie}>
        <label htmlFor="" className={style.title}>
          Расходы
        </label>
        <Doughnut
          className={style.doughnut}
          width={style.doughnut}
          height={style.doughnut}
          data={dataCosts}
          options={options}
        />
      </div>
    </div>
  )
}

export default ChartGistograms

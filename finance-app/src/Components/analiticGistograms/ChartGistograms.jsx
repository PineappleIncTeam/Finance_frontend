import React from "react"
import { Chart as ChartJS, ArcElement, Tooltip, Legend } from "chart.js"
import { Pie } from "react-chartjs-2"
import style from "./ChartGistograms.module.css"

function ChartGistograms({
  categoryNameIncome,
  resultSumIncome,
  categoryNameOutcome,
  resultSumOutcome,
  isActive,
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
    <div className={style.diagram_box}>
      <div className={style.diagrams}>
        <div className={style.pie}>
          {/* <label htmlFor="" className={style.title}>
          Доходы
        </label> */}
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
                <div className={style.label_element}>
                  <div
                    className={style.category_color}
                    style={{ backgroundColor: colorsIncome[index] }}
                  ></div>
                  <div className={style.category_name}>
                    {checkName[index]} {item}
                  </div>
                </div>
              )
            })
          : checkSumOut.map((item, index) => {
              return (
                <div className={style.label_element}>
                  <div
                    className={style.category_color}
                    style={{ backgroundColor: colorsOutcome[index] }}
                  ></div>
                  <div className={style.category_name}>
                    {checkNameOut[index]} {item}
                  </div>
                </div>
              )
            })}
      </div>
    </div>
  )
}

export default ChartGistograms

import React from "react"
import style from "./PercentButton.module.css"
import { getPercentFromTotalCost } from "../../functions/getPercentFromTotalCost"

const PercentButton = ({ percents, active, setAnInitialFee, totalCost }) => {
  return (
    <button
      className={style.button}
      onClick={() =>
        getPercentFromTotalCost(totalCost, percents, setAnInitialFee)
      }
      disabled={!active}
    >
      {percents}%
    </button>
  )
}

export default PercentButton

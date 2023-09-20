import { firstDayOfMonthToPDF, lastDayOfMonthToPDF } from "../urls/urlsAndDates"

const CreatePDF = ({ allOperationList, dataCalRange }) => {
  const dataStart = dataCalRange.length > 1 ? dataCalRange[0] : firstDayOfMonthToPDF
  const dataEnd = dataCalRange.length > 1 ? dataCalRange[1] : lastDayOfMonthToPDF

  const styles = {
    header: {
      fontFamily: "PlayfairDisplay-Medium",
      fontSize: "10px",
      margin: "10px auto",
    },
    introText: {
      textAlign: "center",
      margin: "10px 20px",
      fontFamily: "PlayfairDisplay-Medium",
      fontSize: "14px",
    },
    block: {
      display: "grid",
      gridTemplateColumns: "34% 33% 33%",
      textAlign: "left",
      fontFamily: "PlayfairDisplay-Medium",
      fontSize: "12px",
      margin: "1.59px 20px 1.59px 50px",
    },
    text: {
      fontFamily: "PlayfairDisplay-Medium",
      fontSize: "12px",
    },

    page: {
      display: "flex",
      flexDirection: "column",
      width: "450px",
    },
  }
  const incomeCash = allOperationList && allOperationList.income_cash
  const outcomeCash = allOperationList && allOperationList.outcome_cash
  const moneyBox = allOperationList && allOperationList.money_box

  return (
    <div style={styles.page}>
      {allOperationList && (
        <div style={styles.header}>
          Выписка по операциям Freenance за период c {dataStart} по {dataEnd}
        </div>
      )}
      {incomeCash && incomeCash.length > 0 && (
        <h3 style={styles.introText}>Операции с доходами</h3>
      )}
      {incomeCash &&
        incomeCash.map((item, index) => {
          return (
            <div style={styles.block} key={index} id={item.id}>
              <div>{item.date}</div>
              <div>{item.categoryName}</div>
              <div>
                {"+ "}
                {item.sum}
                <span style={styles.text}> руб.</span>
              </div>
            </div>
          )
        })}

      {outcomeCash && outcomeCash.length > 0 && (
        <h3 style={styles.introText}>Операции с расходами</h3>
      )}
      {outcomeCash &&
        outcomeCash.map((item, index) => {
          return (
            <div style={styles.block} key={index} id={item.id}>
              <div>{item.date}</div>
              <div>{item.categoryName}</div>
              <div>
                {"- "}
                {item.sum}
                <span style={styles.text}> руб.</span>
              </div>
            </div>
          )
        })}
      {moneyBox && moneyBox.length > 0 && (
        <h3 style={styles.introText}>Операции с накоплениями</h3>
      )}
      {moneyBox &&
        moneyBox.map((item, index) => {
          return (
            <div style={styles.block} key={index} id={item.id}>
              <div>{item.date}</div>
              <div>{item.categoryName}</div>
              <div>
                {"- "}
                {item.sum}
                <span style={styles.text}> руб.</span>
              </div>
            </div>
          )
        })}
    </div>
  )
}

export default CreatePDF

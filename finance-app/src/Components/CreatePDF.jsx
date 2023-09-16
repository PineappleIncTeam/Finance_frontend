
const CreatePDF = ({ allOperationList }) => {
  const styles = {
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
      margin: "0px 20px",
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
      {incomeCash.length > 0 && (
        <h3 style={styles.introText}>Операции с доходами</h3>
      )}
      {incomeCash.map((item, index) => {
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

        //   return <Transaction operationItem={item} index={index} symbol={"+"} /> */
      })}

      {outcomeCash.length > 0 && (
        <h3 style={styles.introText}>Операции с расходами</h3>
      )}
      {outcomeCash.map((item, index) => {
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
        // return <Transaction operationItem={item} index={index} symbol={"-"} />
      })}
      {moneyBox.length > 0 && (
        <h3 style={styles.introText}>Операции с накоплениями</h3>
      )}
      {moneyBox.map((item, index) => {
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
        // return <Transaction operationItem={item} index={index} symbol={"-"} />
      })}
    </div>
  )
}

export default CreatePDF

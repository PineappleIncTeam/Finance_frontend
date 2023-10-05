import React from "react"
import ReactHTMLTableToExcel from "react-html-table-to-excel"
import style from "./CreateXLS.module.css"

const CreateXLS = ({ allOperationList, dataCalRange }) => {
  return (
    <div>
      <ReactHTMLTableToExcel
        id="test-table-xls-button"
        className="download-table-xls-button"
        table="table-to-xls"
        filename="tablexls"
        sheet="tablexls"
        buttonText="Download as XLS"
      />
      <table id="table-to-xls" className={style.table_xls}>
        <tbody>
          <tr>
            <th>Выписка по операциям Freenance за период c</th>
          </tr>

          <tr>
            <th>Firstname</th>
            <th>Lastname</th>
            <th>Age</th>
          </tr>
          <tr>
            <td>Jill</td>
            <td>Smith</td>
            <td>50</td>
          </tr>
          <tr>
            <td>Eve</td>
            <td>Jackson</td>
            <td>94</td>
          </tr>
        </tbody>
      </table>
    </div>
  )
}

export default CreateXLS

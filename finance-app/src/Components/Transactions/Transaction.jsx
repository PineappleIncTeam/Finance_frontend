import { useSelector } from "react-redux"
import { useState } from "react"
import { numberFormatRub } from "../calculator/functions/numberFormatHalper"
import closeIcon from "../../Images/closeIcon.svg"
import Modal from "../modalWindow/Modal"
import style from "../modalWindow/Modal.module.css"
import s from "./Transaction.module.css"
import { URLS } from "../../urls/urlsAndDates"

function Transaction({ operationItem, index, symbol }) {
  const token = useSelector((state) => state.user.token)

  const [modalDeleteActive, setModalDeleteActive] = useState(false)
  const [modalMessageActive, setModalMessageActive] = useState(false)
  const [modalMessageText, setModalMessageText] = useState(false)
  const [selectedOperation, setSelectedOperation] = useState({})
  const [message, setMessage] = useState("")

  function createDeleteModal(categoryName, operationId, symbol) {
    if (categoryName === "Из Накоплений") {
      setModalMessageText(
        `В эту категорию можно только переносить данные из раздела "Накопления"`
      )
      setModalMessageActive(true)
    } else {
      console.log(operationId, symbol)
      setMessage(
        "Вы действительно хотите удалить эту запись? \n Действие не может быть отменено"
      )
      setModalDeleteActive(true)
      setSelectedOperation({ id: operationId, symbol: symbol })
    }
  }
  function cancel(e) {
    e.preventDefault()
    setSelectedOperation({})
    setModalDeleteActive(false)
  }
  function deleteCash(id, symbol) {
    const deleteOptions = {
      method: "DELETE",
      headers: {
        "Content-Type": "application/json",
        Authorization: `Token ${token}`,
      },
    }
    if (symbol === "+") {
      fetch(`${URLS.deleteIncomeCash}${id}`, deleteOptions)
      // setTimeout(() => {
      //   getOperationList(URLS.last5IncomeCash, symbol)
      //   getInputData(URLS.sumIncomeCash)
      //   getBalanceData()
      // }, 500)
    }
    if (symbol === "-") {
      fetch(`${URLS.deleteOutcomeCash}${id}`, deleteOptions)
      // setTimeout(() => {
      //   getOperationList(URLS.last5OutcomeCash, symbol)
      //   getInputData(URLS.sumOutcomeCash)
      //   getBalanceData()
      // }, 500)
    }
    if (symbol === " ") {
      fetch(`${URLS.deleteMoneyBoxCash}${id}`, deleteOptions)
      // setTimeout(() => {
      //   getOperationList(URLS.last5MoneyBoxOperation, symbol)
      //   getInputData(URLS.sumOutcomeCash)
      //   getBalanceData()
      //   getStorageCategories(typeOfCategories)
      // }, 400)
    }
    setMessage("Запись была удалена")
    setTimeout(() => setModalDeleteActive(false), 1000)
  }

  return (
    operationItem.sum !== 0 && (
      <>
        <div className={s.operation} key={index} id={operationItem.id}>
          <div className={s.operation_list_item1}>{operationItem.date}</div>
          <div className={s.operation_list_item}>
            {operationItem.categoryName}
          </div>
          <div className={s.operation_list_item}>
            {symbol}
            {numberFormatRub.format(operationItem.sum)}
            {/* <span className="ruble_icon ruble_icon_transactions">₽</span> */}
          </div>
          <div className={s.icons}>
            <button
              className={s.icon_button}
              type="submit"
              title="Удалить запись"
              onClick={() => {
                createDeleteModal(
                  operationItem.categoryName,
                  operationItem.id,
                  symbol
                )
              }}
            >
              <div className={s.operation_list_icon1}></div>
            </button>
            {/* <button
        className={s.icon_button}
        type="submit"
        title="Редактировать"
        onClick={() => {
          createModalChangeSum(
            operation.categoryName,
            operation.id,
            operation.category_id,
            operation.sum,
            symbol
          )
        }}
      >
        <div className={s.operation_list_icon2}></div>
      </button> */}
          </div>
        </div>
        <Modal
          active={modalDeleteActive}
          setActive={setModalDeleteActive}
          setInput={setModalDeleteActive}
        >
          <div
            className={style.delete_icon}
            onClick={() => setModalDeleteActive(false)}
          >
            <img src={closeIcon} alt="X" />
          </div>
          <div className={style.content_box}>
            <p className={style.modal_text}>{message}</p>
            <div>
              <button
                className={style.button}
                onClick={() =>
                  deleteCash(selectedOperation.id, selectedOperation.symbol)
                }
              >
                Удалить
              </button>
              <button
                className={style.button_cancel}
                onClick={(e) => cancel(e)}
              >
                Отмена
              </button>
            </div>
          </div>
        </Modal>
      </>
    )
  )
}

export default Transaction

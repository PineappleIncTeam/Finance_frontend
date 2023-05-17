import { useSelector } from "react-redux"
import s from "./Transactions.module.css"
import { URLS } from "../../urls/urls"
import { useState } from "react"
import CloseIcon from "../Dropdown/CloseIcon"
import Modal from "../modalWindow/Modal"
import style from "../modalWindow/Modal.module.css"

function TransactionList({
  getBalanceData,
  getOperationList,
  operationList,
  symbol,
  getInputData,
  sumIncomeCash,
  sumOutcomeCash,
}) {
  const token = useSelector((state) => state.user.token)

  const [modalDeleteActive, setModalDeleteActive] = useState(false)
  const [modalChangeSum, setModalChangeSum] = useState(false)
  const [selectedOperation, setSelectedOperation] = useState({})
  const [newSum, setNewSum] = useState("")
  const [message, setMessage] = useState("")

  function createModalChangeSum(id, category_id, sum, symbol) {
    setMessage("Введите новое числовое значение")
    setModalChangeSum(true)
    setSelectedOperation({ id, category_id, sum, symbol })
    setNewSum(sum)
  }
  function closeModalChangeSum() {
    // setNewCategory("")
    setModalChangeSum(false)
  }
  function handleInput(e) {
    e.preventDefault()
    setNewSum(
      e.target.value
        .replace(/[a-zA-Zа-яА-Я!@#$%^&*(){}[\]/<>]+/, "")
        .replace(/,/, ".")
    )
  }

  function createDeleteModal(operationId, symbol) {
    setMessage(
      "Вы действительно хотите удалить эту запись? Действие не может быть отменено"
    )
    setModalDeleteActive(true)
    setSelectedOperation({ id: operationId, symbol: symbol })
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
      setTimeout(() => {
        getOperationList(URLS.last5IncomeCash, symbol)
        getInputData(sumIncomeCash)
        getBalanceData()
      }, 500)
    }
    if (symbol === "-") {
      fetch(`${URLS.deleteOutcomeCash}${id}`, deleteOptions)
      setTimeout(() => {
        getOperationList(URLS.last5OutcomeCash, symbol)
        getInputData(sumOutcomeCash)
        getBalanceData()
      }, 500)
    }
    setMessage("Запись была удалена")
    setTimeout(() => setModalDeleteActive(false), 2000)
  }

  function updateCash(id, category, symbol) {
    let data = {
      category_id: category,
      sum: newSum,
    }
    const updateOptions = {
      method: "PUT",
      headers: {
        "Content-Type": "application/json",
        Authorization: `Token ${token}`,
      },
      body: JSON.stringify(data),
    }
    if (symbol === "+") {
      fetch(`${URLS.updateIncomeCash}${id}`, updateOptions)
      setTimeout(() => {
        getOperationList(URLS.last5IncomeCash, symbol)
        getInputData(sumIncomeCash)
        getBalanceData()
      }, 400)
    }
    if (symbol === "-") {
      fetch(`${URLS.updateOutcomeCash}${id}`, updateOptions)
      setTimeout(() => {
        getOperationList(URLS.last5OutcomeCash, symbol)
        getInputData(sumOutcomeCash)
        getBalanceData()
      }, 400)
    }
    setMessage("Запись была изменена")
    setTimeout(() => setModalChangeSum(false), 2000)
  }

  return (
    <>
      <div className={s.transactions}>
        {operationList &&
          operationList.map((operation, index) => {
            return (
              <div className={s.operation} key={index} id={operation.id}>
                <div className={s.operation_list_item1}>{operation.date}</div>
                <div className={s.operation_list_item}>
                  {operation.categoryName}
                </div>
                <div className={s.operation_list_item}>
                  {symbol}
                  {operation.sum}
                  <span className="ruble_icon ruble_icon_transactions">₽</span>
                </div>
                <div className={s.icons}>
                  <button
                    className={s.icon_button}
                    type="submit"
                    title="Удалить запись"
                    onClick={() => {
                      createDeleteModal(operation.id, symbol)
                    }}
                  >
                    <div className={s.operation_list_icon1}></div>
                  </button>
                  <button
                    className={s.icon_button}
                    type="submit"
                    title="Редактировать"
                    onClick={() => {
                      createModalChangeSum(
                        operation.id,
                        operation.category_id,
                        operation.sum,
                        symbol
                      )
                    }}
                  >
                    <div className={s.operation_list_icon2}></div>
                  </button>
                </div>
              </div>
            )
          })}
      </div>
      <Modal
        active={modalDeleteActive}
        setActive={setModalDeleteActive}
        setInput={setModalDeleteActive}
      >
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
          <button className={style.button} onClick={(e) => cancel(e)}>
            Отмена
          </button>
        </div>
      </Modal>
      <Modal active={modalChangeSum} setActive={setModalChangeSum}>
        <div className={style.delete_icon} onClick={closeModalChangeSum}>
          <CloseIcon className={style.icon_styles} />
        </div>
        <p className={style.modal_text}>{message}</p>
        <div>
          <input
            className={style.modal_input}
            type="text"
            value={newSum}
            onChange={(e) => handleInput(e)}
          />
          <button
            className={style.button}
            onClick={() =>
              updateCash(
                selectedOperation.id,
                selectedOperation.category_id,
                selectedOperation.symbol
              )
            }
          >
            Добавить
          </button>
        </div>
      </Modal>
    </>
  )
}
export default TransactionList

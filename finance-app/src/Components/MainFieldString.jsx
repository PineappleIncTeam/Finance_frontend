// import { useDispatch } from "react-redux"
// import { setDateCalendar } from "../store/dataSlice"
// import SelectElement from "./SelectElement"
import { useState } from "react"
import { useSelector } from "react-redux"
import Dropdown from "./Dropdown/Dropdown"
import Modal from "./modalWindow/Modal"
import style from "./modalWindow/Modal.module.css"
import closeIcon from "../Images/closeIcon.svg"
import { dateOnline } from "../urls/urlsAndDates"
import { getStorageSum } from "../Utils/storageFunctions"

function MainFieldString({
  title,
  type,
  income_outcome,
  endpoint,
  typeOfSum,
  getInputData,
  sumCash,
  typeForSum,
  getOperationList,
  getCategories,
  typeOfCategories,
  categories,
  symbol,
  getBalanceData,
  range,
  addActive,
  // storageType,
  placeholder,
}) {
  const token = useSelector((state) => state.user.token)
  const dataCal = useSelector((state) => state.data.data)

  const [inputDis, setInputDis] = useState(false)
  const [enterSum, setEnterSum] = useState("")
  const [selectElement, setSelectElement] = useState(null)
  //
  const [target, setTarget] = useState("")
  const [modalActive, setModalActive] = useState(false)
  const [modalMessage, setModalMessage] = useState("")
  const sumForTarget = 0
  function changeSelectElement(object) {
    setSelectElement(object)
  }

  const disInput = () => {
    setInputDis(true)
  }
  let dataCalendar = dataCal && dataCal.split(".").reverse().join("-")

  function sumSubmit(event) {
    event.preventDefault()
    let data = {
      // sum: enterSum || sumForTarget.toFixed(2),
      sum: enterSum || sumForTarget,
      category_id: selectElement.category_id || selectElement.id,
      date: dataCalendar ? dataCalendar : dateOnline,
      //
      // target: selectElement.target ? selectElement.target : Number(target).toFixed(2),
      target: selectElement.target ? selectElement.target : target,
      //
    }

    const options = {
      method: "POST",
      headers: {
        "Content-Type": "application/json",
        Authorization: `Token ${token}`,
      },
      body: JSON.stringify(data),
    }

    if (data.sum === 0 && data.target === selectElement.target) {
      setModalMessage("Вы не можете изменить цель накопления")
      setModalActive(true)
      return
    }

    fetch(typeOfSum, options)
      .then((response) => {
        if (!placeholder && response.status === 400 && title === "Накопления") {
          setModalMessage(`Вы можете добавить не более ${(
            selectElement.target - selectElement.sum
          ).toFixed(2)} руб. \n для закрытия данного
          накопления`)
          setModalActive(true)
        }
        if (response.status === 500) {
          setModalMessage(
            `Вы не задали цель для данного накопления. \n Пройдите в раздел "Накопления".`
          )
          setModalActive(true)
        } else getInputData(sumCash)
      })
      .then(() => {
        getBalanceData()
        getCategories(typeOfCategories)
        setTimeout(() => getOperationList(endpoint, symbol), 200)
      })
      .catch((error) => console.log("error", error))
    setEnterSum("")
    setTarget("")
    getStorageSum(categories)
    if (placeholder) changeSelectElement(null)
  }

  const changeHandler = (e) => {
    const value = e.target.value
    if (/,/.test(e.target.value)) e.target.value = value.replace(/,/, ".")
    if (e.target.value === "00")
      placeholder ? setTarget((prev) => prev) : setEnterSum((prev) => prev)
    else if (!/^([0-9])*[.,]{0,1}([0-9]{1,2})?$/.test(e.target.value))
      placeholder ? setTarget((prev) => prev) : setEnterSum((prev) => prev)
    else {
      placeholder ? setTarget(e.target.value) : setEnterSum(e.target.value)
    }
  }

  return (
    <>
      <form className="main_field_string" onSubmit={sumSubmit}>
        {categories && (
          <Dropdown
            categories={categories}
            category_type={type}
            income_outcome={income_outcome}
            title={title}
            changeSelectElement={changeSelectElement}
            selectElement={selectElement}
            token={token}
            getBalanceData={getBalanceData}
            getInputData={getInputData}
            sumCash={sumCash}
            typeForSum={typeForSum}
            getCategories={getCategories}
            typeOfCategories={typeOfCategories}
            disInput={disInput}
            addActive={addActive}
            // storageType={storageType}
            endpoint={endpoint}
            getOperationList={getOperationList}
            symbol={symbol}
          />
        )}

        <div className="input_container">
          <input
            type="text"
            className="main_field_string_input"
            value={placeholder ? target : enterSum}
            placeholder={placeholder}
            onInput={(event) => changeHandler(event)}
            min="1"
            // onChange={(event) => handleInputChange(event)}
            disabled={Boolean(!inputDis)}
          ></input>
          <span className="ruble_icon ruble_icon_small">₽</span>
        </div>

        <button
          type="submit"
          className="main_field_string_button"
          onKeyDown={(event) => (event.key === "Enter" ? sumSubmit : "")}
          disabled={placeholder ? target <= 0 : enterSum <= 0}
        >
          Добавить
        </button>
        <button
          type="submit"
          className="main_field_string_button_plus"
          disabled={placeholder ? target <= 0 : enterSum <= 0}
        >
          +
        </button>
      </form>
      <Modal
        active={modalActive}
        setActive={setModalActive}
        setInput={() => setModalActive(false)}
      >
        <div
          className={style.delete_icon}
          onClick={() => setModalActive(false)}
        >
          <img src={closeIcon} alt="X" />
        </div>
        <div className={style.content_box}>
          <div className={style.modal_text}>{modalMessage}</div>
        </div>
      </Modal>
    </>
  )
}
export default MainFieldString

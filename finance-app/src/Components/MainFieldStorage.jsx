// Компонент "Накопления"
import { useEffect, useState } from "react"
import { useSelector } from "react-redux"
import MainFieldString from "./MainFieldString"
import { URLS, dateOnline } from "../urls/urlsAndDates"
import Modal from "./modalWindow/Modal"
import style from "./MainFieldStorage.module.css"
import modalStyle from "./modalWindow/Modal.module.css"
import statusImage from "../Images/statusImage.svg"
import closeIcon from "../Images/closeIcon.svg"

function MainFieldStorage({
  categories,
  getCategories,
  storageCategories,
  getStorageCategories,
  setCheckMainField,
  getOperationList,
  getInputData,
  getBalanceData,
}) {
  const token = useSelector((state) => state.user.token)
  const [modalActive, setModalActive] = useState(false)
  const [modalMessage, setModalMessage] = useState("")
  const [selectedCategory, setSelectedCategory] = useState({})
  // console.log(selectedCategory)
  //

  useEffect(() => {
    getCategories(URLS.getIncomeCategories)
    console.log("useEffect", categories)
  }, [])
  function createModal(category) {
    setModalMessage(
      `Вы уверены, что хотите перевести накопление ${category.categoryName} в доходы?`
      )
      setModalActive(true)
      setSelectedCategory(category)
    }
    function sendSumToIncome(e, category, categories) {
      e.preventDefault()
      
      const categoryFromStorage = (categories)
      
      let data = {
      sum: category.sum,
      category_id: category.category_id,
      date: dateOnline,
    }
    const options = {
      method: "POST",
      headers: {
        "Content-Type": "application/json",
        Authorization: `Token ${token}`,
      },
      body: JSON.stringify(data),
    }
    fetch(URLS.POSTincomcash, options).then((result) => {
      setModalMessage(
        `Накопление ${category.categoryName} было переведено в доход в категорию "Из Накоплений"`
      )
    })
  }
  function addCategory(e) {
    e.preventDefault()

    let data = {
      categoryName: "Из Накоплений",
      category_type: "constant",
      income_outcome: "income",
      //
      // target: newTarget,
    }

    const options = {
      method: "POST",
      headers: {
        "Content-Type": "application/json",
        Authorization: `Token ${token}`,
      },
      body: JSON.stringify(data),
    }

    fetch(URLS.createCategory, options).then((result) => {
      result.json()
      // setSelectedValue("")
      // getCategories(typeOfCategories)
      // getDisplay()
      // setNewCategory("")
      setModalActive(false)
    })
  }
  function sendStorageToIncome(e, category, categories) {
    e.preventDefault()
    let count = 0
    for (let i = 0; i < categories.length; i++) {
      if (categories[i] === "Из Накоплений") {
        count += 1
      }
    }
    if (count > 0) return
    else {
      addCategory(e)
      sendSumToIncome(e, category, categories)
    }
    count = 0
  }

  useEffect(() => {
    setCheckMainField(true)
    getOperationList(URLS.last5MoneyBoxOperation, " ")
    getStorageCategories(URLS.getMoneyBoxCategories)
  }, [])

  return (
    <>
      <div className={style.main_field}>
        <h2 className={`${style.main_field_title} ${style.storage_title}`}>
          Накопления
        </h2>
        <div className={style.main_field_storage}>
          <MainFieldString
            title="Накопления"
            type="accumulate"
            income_outcome="money_box"
            symbol=" "
            endpoint={URLS.last5MoneyBoxOperation}
            getOperationList={getOperationList}
            getBalanceData={getBalanceData}
            getInputData={getInputData}
            sumCash={URLS.sumOutcomeCash}
            typeOfSum={URLS.POSTmoneyBox}
            categories={storageCategories}
            getCategories={getStorageCategories}
            typeOfCategories={URLS.getMoneyBoxCategories}
            addActive={true}
            storageType={true}
            placeholder={"Введите цель"}
          />
        </div>
        <div className={style.storage_categories}>
          {storageCategories.length > 0 && (
            <div className={`${style.categories_storage_title} ${style.fat}`}>
              <div className={`${style.category_name_storage} ${style.fat}`}>
                Категория
              </div>
              <div className={`${style.grand_total_storage} ${style.fat}`}>
                Цель, руб
              </div>
              <div className={`${style.sum_storage} ${style.fat}`}>
                Сумма, руб
              </div>
            </div>
          )}
          {storageCategories &&
            storageCategories.map((category, index) => {
              const doneStorage = category.target - category.sum
              if (!category.is_hidden)
                return (
                  <div className={style.storage_category_row} key={index}>
                    <div className={style.categories_storage_title} key={index}>
                      <div className={style.category_name_storage}>
                        {category.categoryName}
                      </div>
                      <div className={style.grand_total_storage}>
                        {category.target}
                      </div>
                      <div className={style.sum_storage}>
                        <div className={style.sum_storage_content}>
                          {category.sum}
                        </div>
                      </div>
                    </div>
                    {category.target && !doneStorage && (
                      <img
                        className={style.image}
                        src={statusImage}
                        alt="status ok"
                        onClick={() => createModal(category)}
                      />
                    )}
                  </div>
                )
            })}
        </div>
      </div>
      <Modal
        active={modalActive}
        setActive={setModalActive}
        setInput={setModalActive}
      >
        <div
          className={modalStyle.delete_icon}
          onClick={() => setModalActive(false)}
        >
          <img src={closeIcon} alt="X" />
        </div>
        <div className={modalStyle.modal_text}>{modalMessage}</div>
        <div>
          <button
            className={modalStyle.button}
            onClick={(e) => sendStorageToIncome(e, selectedCategory)}
          >
            Да
          </button>
          <button
            className={modalStyle.button_cancel}
            onClick={() => setModalActive(false)}
          >
            Нет
          </button>
        </div>
      </Modal>
    </>
  )
}
export default MainFieldStorage

// function sendToArchive(e, category) {
//   e.preventDefault()
//   const options = {
//     method: "PUT",
//     headers: {
//       "Content-Type": "application/json",
//       Authorization: `Token ${token}`,
//     },
//     body: JSON.stringify({
//       category_id: category.category_id,
//       is_hidden: true,
//     }),
//   }
//   fetch(
//     `${URLS.sendCategoryToArchive}${selectedCategory.category_id}`,
//     options
//   )
//     .then((result) => {
//       setModalMessage(
//         `Категория "${selectedCategory.categoryName}" была переведена в архив`
//       )
//     })
//     .then(() => {
//       setTimeout(() => {
//         getStorageCategories(URLS.getMoneyBoxCategories)
//         setModalActive(false)
//         setModalMessage("")
//       }, 2000)
//     })
// }

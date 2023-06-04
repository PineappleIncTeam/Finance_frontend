// Компонент "Накопления"
import { useEffect } from "react"
// import { useSelector } from "react-redux"
import MainFieldString from "./MainFieldString"
import { URLS } from "../urls/urlsAndDates"
import style from "./MainFieldStorage.module.css"
import statusImage from "../Images/statusImage.svg"

function MainFieldStorage({
  storageCategories,
  getStorageCategories,
  setCheckMainField,
  getOperationList,
  getInputData,
  getBalanceData,
}) {
  // const token = useSelector((state) => state.user.token)
  useEffect(() => {
    setCheckMainField(true)
    getOperationList(URLS.last5MoneyBoxOperation, " ")
    getStorageCategories(URLS.getMoneyBoxCategories)
  }, [])

  return (
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
                {category.target && !doneStorage && <img src={statusImage} alt="status ok" />}
              </div>
            )
          })}
      </div>
    </div>
  )
}
export default MainFieldStorage

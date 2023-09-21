// Компонент "Доходы"
// import { useSelector } from "react-redux";
import { useEffect } from "react";
import MainFieldString from "./MainFieldString";
import { URLS, months, month } from "../urls/urlsAndDates";

function MainField({
  categories,
  getCategories,
  getOperationList,
  getBalanceData,
  getInputData,
  inputData,
  changeRangeCalendar,
  range,
  setCheckMainField,
}) {
  // const token = useSelector((state) => state.user.token);

  useEffect(() => {
    getCategories(URLS.getIncomeCategories);
    changeRangeCalendar(false);
    getInputData(URLS.sumIncomeCash);
    setCheckMainField(true);
    getOperationList(URLS.last5IncomeCash, "+");
  }, []);

  return (
    <div className="main_field" key="">
      <h2 className="main_field_title">Доходы</h2>
      <div className="main_field_input">
        <input className="input_rub" value={inputData} readOnly></input>
        <span className="ruble_icon">₽</span>
      </div>
      <div className="main_field_title_label">
        Общий доход за <span className="balance_month">{months[month]}</span>
      </div>
      <MainFieldString
        title="Постоянные"
        type="constant"
        income_outcome="income"
        endpoint={URLS.last5IncomeCash}
        typeOfSum={URLS.POSTincomcash}
        getInputData={getInputData}
        sumCash={URLS.sumIncomeCash}
        typeForSum="constant_sum"
        getOperationList={getOperationList}
        getCategories={getCategories}
        typeOfCategories={URLS.getIncomeCategories}
        categories={categories}
        symbol="+"
        getBalanceData={getBalanceData}
        range={range}
        addActive={true}
      />
      <MainFieldString
        title="Временные"
        type="once"
        income_outcome="income"
        endpoint={URLS.last5IncomeCash}
        typeOfSum={URLS.POSTincomcash}
        getInputData={getInputData}
        sumCash={URLS.sumIncomeCash}
        typeForSum="onse_sum"
        getOperationList={getOperationList}
        getCategories={getCategories}
        typeOfCategories={URLS.getIncomeCategories}
        categories={categories}
        symbol="+"
        getBalanceData={getBalanceData}
        addActive={true}
      />
      <div className="mobileSum">
        <div className="mobileSum_input">
          <div className="mainTextSumm">
            Ваш общий доход за {" "}
            <span className="balance_month_mobile">{months[month]}</span>
          </div>
          <input className="input_rubMobile" value={inputData} readOnly></input>
          <span className="ruble_iconMobile">₽</span>
        </div>
      </div>
    </div>
  );
}

export default MainField;

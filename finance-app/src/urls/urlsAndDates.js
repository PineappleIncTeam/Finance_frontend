
let date = new Date()
let year = date.getFullYear()
export let month = date.getMonth() + 1
let lastDayDate = new Date(date.getFullYear(), date.getMonth() + 1, 0)
let lastDay = lastDayDate.toLocaleString().substring(0, 2)
export let firstDayOfMonth = `${year}-${month}-01`
export let lastDayOfMonth = `${year}-${month}-${lastDay}`

export let months = {
    1: "Январь",
    2: "Февраль",
    3: "Март",
    4: "Апрель",
    5: "Май",
    6: "Июнь",
    7: "Июль",
    8: "Август",
    9: "Сентябрь",
    10: "Октябрь",
    11: "Ноябрь",
    12: "Декабрь",
  }



export const URLS = {
    registration: "http://127.0.0.1:8000/api/auth/users/",
    authorisation: "http://127.0.0.1:8000/api/auth/token/login/",
    resetPassword: "http://127.0.0.1:8000/api/auth/users/reset_password/",
    resetPasswordConfirm: "http://127.0.0.1:8000/api/auth/users/reset_password_confirm/",
    balance: `http://127.0.0.1:8000/api/balance/?date_start=${firstDayOfMonth}&date_end=${lastDayOfMonth}`,
    sumIncomeCash: `http://127.0.0.1:8000/api/sum-incomecash/?date_start=${firstDayOfMonth}&date_end=${lastDayOfMonth}`,
    sumOutcomeCash: `http://127.0.0.1:8000/api/sum-outcomecash/?date_start=${firstDayOfMonth}&date_end=${lastDayOfMonth}`,
    getIncomeCategories: "http://127.0.0.1:8000/api/income-categories/",
    getOutcomeCategories: "http://127.0.0.1:8000/api/outcome-categories/",
    getMoneyBoxCategories: "http://127.0.0.1:8000/api/money-box-categories/",
    POSTincomcash: "http://127.0.0.1:8000/api/incomecash/",
    POSToutcomecash: "http://127.0.0.1:8000/api/outcomecash/",
    POSTmoneyBox: "http://127.0.0.1:8000/api/money-box/",
    deleteIncomeCash: "http://127.0.0.1:8000/api/delete-incomecash/",
    deleteOutcomeCash: "http://127.0.0.1:8000/api/delete-outcomecash/",
    deleteMoneyBoxCash: "http://127.0.0.1:8000/api/delete-money-box/",
    updateIncomeCash: "http://127.0.0.1:8000/api/update-incomecash/",
    updateOutcomeCash: "http://127.0.0.1:8000/api/update-outcomecash/",
    updateMoneyBoxCash: "http://127.0.0.1:8000/api/update-money-box/",
    last5IncomeCash: "http://127.0.0.1:8000/api/last-5-incomecash/",
    last5OutcomeCash: "http://127.0.0.1:8000/api/last-5-outcomecash/",
    last5MoneyBoxOperation: "http://127.0.0.1:8000/api/last-5-money-box/",
    createCategory: "http://127.0.0.1:8000/api/categories/",
    deleteCategory: "http://127.0.0.1:8000/api/del-category/",
    sendCategoryToArchive: "http://127.0.0.1:8000/api/update-category/",
    getSumIncomeGroup: "http://127.0.0.1:8000/api/sum-incomecash-group/",
    getSumOutcomeGroup: "http://127.0.0.1:8000/api/sum-outcomecash-group/",
    getSumMonthlyIncome: "http://127.0.0.1:8000/api/sum-monthly-income/",
    getSumMonthlyOutcome: "http://127.0.0.1:8000/api/sum-monthly-outcome/",

}
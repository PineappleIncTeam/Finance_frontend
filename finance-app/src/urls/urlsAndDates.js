let date = new Date()
let year = date.getFullYear()
let currentDay = date.getDate()
let lastDayDate = new Date(date.getFullYear(), date.getMonth() + 1, 0)
let lastDay = lastDayDate.toLocaleString().substring(0, 2)

export let month = date.getMonth() + 1
export let dateOnline = year + '-' + month + '-' + currentDay
export let currentDate = `${year}-${month}-${currentDay}`

export let firstDayOfMonth = `${year}-${month}-01`

export let lastDayOfMonth = `${year}-${month}-${lastDay}`

export let startDate = "2000-01-01"

export let balanceMonths = {
  1: "Января",
  2: "Февраля",
  3: "Марта",
  4: "Апреля",
  5: "Мая",
  6: "Июня",
  7: "Июля",
  8: "Августа",
  9: "Сентября",
  10: "Октября",
  11: "Ноября",
  12: "Декабря",
}
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
  registration: "http://92.255.79.239:8000/api/auth/users/",
  authorisation: "http://92.255.79.239:8000/api/auth/token/login/",
  resetPassword: "http://92.255.79.239:8000/api/auth/users/reset_password/",
  resetPasswordConfirm:
    "http://92.255.79.239:8000/api/auth/users/reset_password_confirm/",
  balance: `http://92.255.79.239:8000/api/balance/`,
  sumIncomeCash: `http://92.255.79.239:8000/api/sum-incomecash/?date_start=${firstDayOfMonth}&date_end=${lastDayOfMonth}`,
  sumOutcomeCash: `http://92.255.79.239:8000/api/sum-outcomecash/?date_start=${firstDayOfMonth}&date_end=${lastDayOfMonth}`,
  getIncomeCategories: "http://92.255.79.239:8000/api/income-categories/",
  getOutcomeCategories: "http://92.255.79.239:8000/api/outcome-categories/",
  getMoneyBoxCategories: "http://92.255.79.239:8000/api/money-box-categories/",
  POSTincomcash: "http://92.255.79.239:8000/api/incomecash/",
  POSToutcomecash: "http://92.255.79.239:8000/api/outcomecash/",
  POSTmoneyBox: "http://92.255.79.239:8000/api/money-box/",
  deleteIncomeCash: "http://92.255.79.239:8000/api/delete-incomecash/",
  deleteOutcomeCash: "http://92.255.79.239:8000/api/delete-outcomecash/",
  deleteMoneyBoxCash: "http://92.255.79.239:8000/api/delete-money-box/",
  updateIncomeCash: "http://92.255.79.239:8000/api/update-incomecash/",
  updateOutcomeCash: "http://92.255.79.239:8000/api/update-outcomecash/",
  updateMoneyBoxCash: "http://92.255.79.239:8000/api/update-money-box/",
  last5IncomeCash: "http://92.255.79.239:8000/api/last-5-incomecash/",
  last5OutcomeCash: "http://92.255.79.239:8000/api/last-5-outcomecash/",
  last5MoneyBoxOperation: "http://92.255.79.239:8000/api/last-5-money-box/",
  createCategory: "http://92.255.79.239:8000/api/categories/",
  deleteCategory: "http://92.255.79.239:8000/api/del-category/",
  sendCategoryToArchive: "http://92.255.79.239:8000/api/update-category/",
  getSumIncomeGroup: "http://92.255.79.239:8000/api/sum-incomecash-group/",
  getSumOutcomeGroup: "http://92.255.79.239:8000/api/sum-outcomecash-group/",
  getSumMoneyBoxGroup: "http://92.255.79.239:8000/api/sum-money-box-group/",
  getSumMonthlyIncome: "http://92.255.79.239:8000/api/sum-monthly-income/",
  getSumMonthlyOutcome: "http://92.255.79.239:8000/api/sum-monthly-outcome/",
  getSumMonthlyMoneyBox: "http://92.255.79.239:8000/api/sum-monthly-money-box/",
}

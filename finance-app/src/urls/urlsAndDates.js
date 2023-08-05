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
  registration: "https://92.255.79.239:8000/api/auth/users/",
  authorisation: "https://92.255.79.239:8000/api/auth/token/login/",
  resetPassword: "https://92.255.79.239:8000/api/auth/users/reset_password/",
  resetPasswordConfirm:
    "https://92.255.79.239:8000/api/auth/users/reset_password_confirm/",
  balance: `https://92.255.79.239:8000/api/balance/`,
  sumIncomeCash: `https://92.255.79.239:8000/api/sum-incomecash/?date_start=${firstDayOfMonth}&date_end=${lastDayOfMonth}`,
  sumOutcomeCash: `https://92.255.79.239:8000/api/sum-outcomecash/?date_start=${firstDayOfMonth}&date_end=${lastDayOfMonth}`,
  getIncomeCategories: "https://92.255.79.239:8000/api/income-categories/",
  getOutcomeCategories: "https://92.255.79.239:8000/api/outcome-categories/",
  getMoneyBoxCategories: "https://92.255.79.239:8000/api/money-box-categories/",
  POSTincomcash: "https://92.255.79.239:8000/api/incomecash/",
  POSToutcomecash: "https://92.255.79.239:8000/api/outcomecash/",
  POSTmoneyBox: "https://92.255.79.239:8000/api/money-box/",
  deleteIncomeCash: "https://92.255.79.239:8000/api/delete-incomecash/",
  deleteOutcomeCash: "https://92.255.79.239:8000/api/delete-outcomecash/",
  deleteMoneyBoxCash: "https://92.255.79.239:8000/api/delete-money-box/",
  updateIncomeCash: "https://92.255.79.239:8000/api/update-incomecash/",
  updateOutcomeCash: "https://92.255.79.239:8000/api/update-outcomecash/",
  updateMoneyBoxCash: "https://92.255.79.239:8000/api/update-money-box/",
  last5IncomeCash: "https://92.255.79.239:8000/api/last-5-incomecash/",
  last5OutcomeCash: "https://92.255.79.239:8000/api/last-5-outcomecash/",
  last5MoneyBoxOperation: "https://92.255.79.239:8000/api/last-5-money-box/",
  createCategory: "https://92.255.79.239:8000/api/categories/",
  deleteCategory: "https://92.255.79.239:8000/api/del-category/",
  sendCategoryToArchive: "https://92.255.79.239:8000/api/update-category/",
  getSumIncomeGroup: "https://92.255.79.239:8000/api/sum-incomecash-group/",
  getSumOutcomeGroup: "https://92.255.79.239:8000/api/sum-outcomecash-group/",
  getSumMoneyBoxGroup: "https://92.255.79.239:8000/api/sum-money-box-group/",
  getSumMonthlyIncome: "https://92.255.79.239:8000/api/sum-monthly-income/",
  getSumMonthlyOutcome: "https://92.255.79.239:8000/api/sum-monthly-outcome/",
  getSumMonthlyMoneyBox: "https://92.255.79.239:8000/api/sum-monthly-money-box/",
}

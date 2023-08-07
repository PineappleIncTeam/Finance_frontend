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
  registration: "https://freenance.online/api/auth/users/",
  authorisation: "https://freenance.online/api/auth/token/login/",
  resetPassword: "https://freenance.online/api/auth/users/reset_password/",
  resetPasswordConfirm:
    "https://freenance.online/api/auth/users/reset_password_confirm/",
  balance: `https://freenance.online/api/balance/`,
  sumIncomeCash: `https://freenance.online/api/sum-incomecash/?date_start=${firstDayOfMonth}&date_end=${lastDayOfMonth}`,
  sumOutcomeCash: `https://freenance.online/api/sum-outcomecash/?date_start=${firstDayOfMonth}&date_end=${lastDayOfMonth}`,
  getIncomeCategories: "https://freenance.online/api/income-categories/",
  getOutcomeCategories: "https://freenance.online/api/outcome-categories/",
  getMoneyBoxCategories: "https://freenance.online/api/money-box-categories/",
  POSTincomcash: "https://freenance.online/api/incomecash/",
  POSToutcomecash: "https://freenance.online/api/outcomecash/",
  POSTmoneyBox: "https://freenance.online/api/money-box/",
  deleteIncomeCash: "https://freenance.online/api/delete-incomecash/",
  deleteOutcomeCash: "https://freenance.online/api/delete-outcomecash/",
  deleteMoneyBoxCash: "https://freenance.online/api/delete-money-box/",
  updateIncomeCash: "https://freenance.online/api/update-incomecash/",
  updateOutcomeCash: "https://freenance.online/api/update-outcomecash/",
  updateMoneyBoxCash: "https://freenance.online/api/update-money-box/",
  last5IncomeCash: "https://freenance.online/api/last-5-incomecash/",
  last5OutcomeCash: "https://freenance.online/api/last-5-outcomecash/",
  last5MoneyBoxOperation: "https://freenance.online/api/last-5-money-box/",
  createCategory: "https://freenance.online/api/categories/",
  deleteCategory: "https://freenance.online/api/del-category/",
  sendCategoryToArchive: "https://freenance.online/api/update-category/",
  getSumIncomeGroup: "https://freenance.online/api/sum-incomecash-group/",
  getSumOutcomeGroup: "https://freenance.online/api/sum-outcomecash-group/",
  getSumMoneyBoxGroup: "https://freenance.online/api/sum-money-box-group/",
  getSumMonthlyIncome: "https://freenance.online/api/sum-monthly-income/",
  getSumMonthlyOutcome: "https://freenance.online/api/sum-monthly-outcome/",
  getSumMonthlyMoneyBox: "https://freenance.online/api/sum-monthly-money-box/",
}

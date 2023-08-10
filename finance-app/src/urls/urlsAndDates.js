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
  registration: "http://back.freenance.online/api/auth/users/",
  authorisation: "http://back.freenance.online/api/auth/token/login/",
  resetPassword: "http://back.freenance.online/api/auth/users/reset_password/",
  resetPasswordConfirm:
    "http://back.freenance.online/api/auth/users/reset_password_confirm/",
  balance: `http://back.freenance.online/api/balance/`,
  sumIncomeCash: `http://back.freenance.online/api/sum-incomecash/?date_start=${firstDayOfMonth}&date_end=${lastDayOfMonth}`,
  sumOutcomeCash: `http://back.freenance.online/api/sum-outcomecash/?date_start=${firstDayOfMonth}&date_end=${lastDayOfMonth}`,
  getIncomeCategories: "http://back.freenance.online/api/income-categories/",
  getOutcomeCategories: "http://back.freenance.online/api/outcome-categories/",
  getMoneyBoxCategories: "http://back.freenance.online/api/money-box-categories/",
  POSTincomcash: "http://back.freenance.online/api/incomecash/",
  POSToutcomecash: "http://back.freenance.online/api/outcomecash/",
  POSTmoneyBox: "http://back.freenance.online/api/money-box/",
  deleteIncomeCash: "http://back.freenance.online/api/delete-incomecash/",
  deleteOutcomeCash: "http://back.freenance.online/api/delete-outcomecash/",
  deleteMoneyBoxCash: "http://back.freenance.online/api/delete-money-box/",
  updateIncomeCash: "http://back.freenance.online/api/update-incomecash/",
  updateOutcomeCash: "http://back.freenance.online/api/update-outcomecash/",
  updateMoneyBoxCash: "http://back.freenance.online/api/update-money-box/",
  last5IncomeCash: "http://back.freenance.online/api/last-5-incomecash/",
  last5OutcomeCash: "http://back.freenance.online/api/last-5-outcomecash/",
  last5MoneyBoxOperation: "http://back.freenance.online/api/last-5-money-box/",
  createCategory: "http://back.freenance.online/api/categories/",
  deleteCategory: "http://back.freenance.online/api/del-category/",
  sendCategoryToArchive: "http://back.freenance.online/api/update-category/",
  getSumIncomeGroup: "http://back.freenance.online/api/sum-incomecash-group/",
  getSumOutcomeGroup: "http://back.freenance.online/api/sum-outcomecash-group/",
  getSumMoneyBoxGroup: "http://back.freenance.online/api/sum-money-box-group/",
  getSumMonthlyIncome: "http://back.freenance.online/api/sum-monthly-income/",
  getSumMonthlyOutcome: "http://back.freenance.online/api/sum-monthly-outcome/",
  getSumMonthlyMoneyBox: "http://back.freenance.online/api/sum-monthly-money-box/",
}

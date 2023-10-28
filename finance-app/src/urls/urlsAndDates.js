let date = new Date()
let year = date.getFullYear()
let currentDay = date.getDate()
let lastDayDate = new Date(date.getFullYear(), date.getMonth() + 1, 0)
let lastDay = lastDayDate.toLocaleString().substring(0, 2)

export let month = date.getMonth() + 1
export let monthForPDF = (date.getMonth() + 1) < 10 ?  ("0" + (date.getMonth() + 1)) : (date.getMonth() + 1)
export let dateOnline = year + '-' + month + '-' + currentDay
export let currentDate = `${year}-${month}-${currentDay}`

export let firstDayOfMonth = `${year}-${month}-01`
export let firstDayOfMonthToPDF = `01.${monthForPDF}.${year}`

export let lastDayOfMonth = `${year}-${month}-${lastDay}`
export let lastDayOfMonthToPDF = `${lastDay}.${monthForPDF}.${year}`

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
  registration: "https://dev.freenance.store/api/auth/users/",
  authorisation: "https://dev.freenance.store/api/auth/token/login/",
  resetPassword: "https://dev.freenance.store/api/auth/users/reset_password/",
  resetPasswordConfirm: "https://dev.freenance.store/api/auth/users/reset_password_confirm/",
  balance: `https://dev.freenance.store/api/balance/`,
  sumIncomeCash: `https://dev.freenance.store/api/sum-incomecash/?date_start=${firstDayOfMonth}&date_end=${lastDayOfMonth}`,
  sumOutcomeCash: `https://dev.freenance.store/api/sum-outcomecash/?date_start=${firstDayOfMonth}&date_end=${lastDayOfMonth}`,
  getIncomeCategories: "https://dev.freenance.store/api/income-categories/",
  getOutcomeCategories: "https://dev.freenance.store/api/outcome-categories/",
  getMoneyBoxCategories: "https://dev.freenance.store/api/money-box-categories/",
  POSTincomcash: "https://dev.freenance.store/api/incomecash/",
  POSToutcomecash: "https://dev.freenance.store/api/outcomecash/",
  POSTmoneyBox: "https://dev.freenance.store/api/money-box/",
  deleteIncomeCash: "https://dev.freenance.store/api/delete-incomecash/",
  deleteOutcomeCash: "https://dev.freenance.store/api/delete-outcomecash/",
  deleteMoneyBoxCash: "https://dev.freenance.store/api/delete-money-box/",
  updateIncomeCash: "https://dev.freenance.store/api/update-incomecash/",
  updateOutcomeCash: "https://dev.freenance.store/api/update-outcomecash/",
  updateMoneyBoxCash: "https://dev.freenance.store/api/update-money-box/",
  last5IncomeCash: "https://dev.freenance.store/api/last-5-incomecash/",
  last5OutcomeCash: "https://dev.freenance.store/api/last-5-outcomecash/",
  last5MoneyBoxOperation: "https://dev.freenance.store/api/last-5-money-box/",
  getAllOperations: "https://dev.freenance.store/api/report/",
  createCategory: "https://dev.freenance.store/api/categories/",
  deleteCategory: "https://dev.freenance.store/api/del-category/",
  sendCategoryToArchive: "https://dev.freenance.store/api/update-category/",
  getSumIncomeGroup: "https://dev.freenance.store/api/sum-incomecash-group/",
  getSumOutcomeGroup: "https://dev.freenance.store/api/sum-outcomecash-group/",
  getSumMoneyBoxGroup: "https://dev.freenance.store/api/sum-money-box-group/",
  getSumMonthlyIncome: "https://dev.freenance.store/api/sum-monthly-income/",
  getSumMonthlyOutcome: "https://dev.freenance.store/api/sum-monthly-outcome/",
  getSumMonthlyMoneyBox: "https://dev.freenance.store/api/sum-monthly-money-box/",
}

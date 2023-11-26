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
  registration: "https://back.freenance.online/api/auth/users/",
  authorisation: "https://back.freenance.online/api/auth/token/login/",
  resetPassword: "https://back.freenance.online/api/auth/users/reset_password/",
  resetPasswordConfirm: "https://back.freenance.online/api/auth/users/reset_password_confirm/",
  balance: `https://back.freenance.online/api/balance/`,
  sumIncomeCash: `https://back.freenance.online/api/sum-incomecash/?date_start=${firstDayOfMonth}&date_end=${lastDayOfMonth}`,
  sumOutcomeCash: `https://back.freenance.online/api/sum-outcomecash/?date_start=${firstDayOfMonth}&date_end=${lastDayOfMonth}`,
  getIncomeCategories: "https://back.freenance.online/api/income-categories/",
  getOutcomeCategories: "https://back.freenance.online/api/outcome-categories/",
  getMoneyBoxCategories: "https://back.freenance.online/api/money-box-categories/",
  POSTincomcash: "https://back.freenance.online/api/incomecash/",
  POSToutcomecash: "https://back.freenance.online/api/outcomecash/",
  POSTmoneyBox: "https://back.freenance.online/api/money-box/",
  deleteIncomeCash: "https://back.freenance.online/api/delete-incomecash/",
  deleteOutcomeCash: "https://back.freenance.online/api/delete-outcomecash/",
  deleteMoneyBoxCash: "https://back.freenance.online/api/delete-money-box/",
  updateIncomeCash: "https://back.freenance.online/api/update-incomecash/",
  updateOutcomeCash: "https://back.freenance.online/api/update-outcomecash/",
  updateMoneyBoxCash: "https://back.freenance.online/api/update-money-box/",
  last5IncomeCash: "https://back.freenance.online/api/last-5-incomecash/",
  last5OutcomeCash: "https://back.freenance.online/api/last-5-outcomecash/",
  last5MoneyBoxOperation: "https://back.freenance.online/api/last-5-money-box/",
  getAllOperations: "https://back.freenance.online/api/report/",
  createCategory: "https://back.freenance.online/api/categories/",
  deleteCategory: "https://back.freenance.online/api/del-category/",
  sendCategoryToArchive: "https://back.freenance.online/api/update-category/",
  getSumIncomeGroup: "https://back.freenance.online/api/sum-incomecash-group/",
  getSumOutcomeGroup: "https://back.freenance.online/api/sum-outcomecash-group/",
  getSumMoneyBoxGroup: "https://back.freenance.online/api/sum-money-box-group/",
  getSumMonthlyIncome: "https://back.freenance.online/api/sum-monthly-income/",
  getSumMonthlyOutcome: "https://back.freenance.online/api/sum-monthly-outcome/",
  getSumMonthlyMoneyBox: "https://back.freenance.online/api/sum-monthly-money-box/",
}

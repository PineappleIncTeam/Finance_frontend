let date = new Date();
let year = date.getFullYear();
let currentDay = date.getDate();
let lastDayDate = new Date(date.getFullYear(), date.getMonth() + 1, 0);
let lastDay = lastDayDate.toLocaleString().substring(0, 2);

export let month = date.getMonth() + 1;
export let monthForPDF =
  date.getMonth() + 1 < 10 ? "0" + (date.getMonth() + 1) : date.getMonth() + 1;
export let dateOnline = year + "-" + month + "-" + currentDay;
export let currentDate = `${year}-${month}-${currentDay}`;

export let firstDayOfMonth = `${year}-${month}-01`;
export let firstDayOfMonthToPDF = `01.${monthForPDF}.${year}`;

export let lastDayOfMonth = `${year}-${month}-${lastDay}`;
export let lastDayOfMonthToPDF = `${lastDay}.${monthForPDF}.${year}`;

export let startDate = "2000-01-01";

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
};
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
};

export const URLS = {
  registration: "https://freenance.store/api/auth/users/",
  authorisation: "https://freenance.store/api/auth/token/login/",
  resetPassword: "https://freenance.store/api/auth/users/reset_password/",
  resetPasswordConfirm:
    "https://freenance.store/api/auth/users/reset_password_confirm/",
  balance: `https://freenance.store/api/balance/`,
  sumIncomeCash: `https://freenance.store/api/sum-incomecash/?date_start=${firstDayOfMonth}&date_end=${lastDayOfMonth}`,
  sumOutcomeCash: `https://freenance.store/api/sum-outcomecash/?date_start=${firstDayOfMonth}&date_end=${lastDayOfMonth}`,
  getIncomeCategories: "https://freenance.store/api/income-categories/",
  getOutcomeCategories: "https://freenance.store/api/outcome-categories/",
  getMoneyBoxCategories: "https://freenance.store/api/money-box-categories/",
  POSTincomcash: "https://freenance.store/api/incomecash/",
  POSToutcomecash: "https://freenance.store/api/outcomecash/",
  POSTmoneyBox: "https://freenance.store/api/money-box/",
  deleteIncomeCash: "https://freenance.store/api/delete-incomecash/",
  deleteOutcomeCash: "https://freenance.store/api/delete-outcomecash/",
  deleteMoneyBoxCash: "https://freenance.store/api/delete-money-box/",
  updateIncomeCash: "https://freenance.store/api/update-incomecash/",
  updateOutcomeCash: "https://freenance.store/api/update-outcomecash/",
  updateMoneyBoxCash: "https://freenance.store/api/update-money-box/",
  last5IncomeCash: "https://freenance.store/api/last-5-incomecash/",
  last5OutcomeCash: "https://freenance.store/api/last-5-outcomecash/",
  last5MoneyBoxOperation: "https://freenance.store/api/last-5-money-box/",
  getAllOperations: "https://freenance.store/api/report/",
  createCategory: "https://freenance.store/api/categories/",
  deleteCategory: "https://freenance.store/api/del-category/",
  sendCategoryToArchive: "https://freenance.store/api/update-category/",
  getSumIncomeGroup: "https://freenance.store/api/sum-incomecash-group/",
  getSumOutcomeGroup: "https://freenance.store/api/sum-outcomecash-group/",
  getSumMoneyBoxGroup: "https://freenance.store/api/sum-money-box-group/",
  getSumMonthlyIncome: "https://freenance.store/api/sum-monthly-income/",
  getSumMonthlyOutcome: "https://freenance.store/api/sum-monthly-outcome/",
  getSumMonthlyMoneyBox: "https://freenance.store/api/sum-monthly-money-box/",
};

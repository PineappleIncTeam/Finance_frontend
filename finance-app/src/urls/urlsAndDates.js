
let date = new Date()
let year = date.getFullYear()
export let month = date.getMonth() + 1
let lastDayDate = new Date(date.getFullYear(), date.getMonth() + 1, 0)
let lastDay = lastDayDate.toLocaleString().substring(0, 2)
let firstDayOfMonth = `${year}-${month}-01`
let lastDayOfMonth = `${year}-${month}-${lastDay}`

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
    balance: `http://92.255.79.239:8000/api/balance/?date_start=${firstDayOfMonth}&date_end=${lastDayOfMonth}`,
    sumIncomeCash: `http://92.255.79.239:8000/api/sum-incomecash/?date_start=${firstDayOfMonth}&date_end=${lastDayOfMonth}`,
    sumOutcomeCash: `http://92.255.79.239:8000/api/sum-outcomecash/?date_start=${firstDayOfMonth}&date_end=${lastDayOfMonth}`,
    incomeOperations: "http://92.255.79.239:8000/api/last-5-incomecash/",
    POSTincomcash: "http://92.255.79.239:8000/api/incomecash/",
    getIncomeCategories: "http://92.255.79.239:8000/api/income-categories/",
    outcomeOperations: "http://92.255.79.239:8000/api/last-5-outcomecash/",
    POSToutcomecash: "http://92.255.79.239:8000/api/outcomecash/",
    getOutcomeCategories: "http://92.255.79.239:8000/api/outcome-categories/",
    deleteIncomeCash: "http://92.255.79.239:8000/api/delete-incomecash/",
    deleteOutcomeCash: "http://92.255.79.239:8000/api/delete-outcomecash/",
    updateIncomeCash: "http://92.255.79.239:8000/api/update-incomecash/",
    updateOutcomeCash: "http://92.255.79.239:8000/api/update-outcomecash/",
    last5IncomeCash: "http://92.255.79.239:8000/api/last-5-incomecash/",
    last5OutcomeCash: "http://92.255.79.239:8000/api/last-5-outcomecash/",
    createCategory: "http://92.255.79.239:8000/api/categories/",
    deleteCategory: "http://92.255.79.239:8000/api/del-category/",
    sendCategoryToArchive: "http://92.255.79.239:8000/api/update-category/"

}
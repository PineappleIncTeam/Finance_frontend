export function formatMoney(num: number, digits: number = 2) {
  return num.toLocaleString("ru-RU", {
    minimumFractionDigits: digits,
    maximumFractionDigits: 2,
    style: "currency",
    currency: "RUB",
  })
}
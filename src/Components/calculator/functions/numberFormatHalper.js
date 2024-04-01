export const optionsRub = { style: "currency", currency: "RUB" }
export const numberFormatRub = new Intl.NumberFormat("ru-RU", optionsRub)
export const optionsUsd = { style: "currency", currency: "USD" }
export const numberFormatUsd = new Intl.NumberFormat("ru-RU", optionsUsd)
export const optionsEur = { style: "currency", currency: "EUR" }
export const numberFormatEur = new Intl.NumberFormat("ru-RU", optionsEur)

export const numberFormatObject = {
  "rub": numberFormatRub,
  "usd": numberFormatUsd,
  "eur": numberFormatEur,
}

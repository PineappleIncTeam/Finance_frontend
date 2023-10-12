export function getRates() {
  const response = fetch("https://www.cbr-xml-daily.ru/daily_json.js")
    .then((response) => response.json())
    .then((data) => data)
  return response
}

import s from "./Transaction.module.css"

function Transaction({ operationItem, index, symbol }) {
  return (
    <div className={s.operation} key={index} id={operationItem.id}>
      <div className={s.operation_list_item1}>{operationItem.date}</div>
      <div className={s.operation_list_item}>{operationItem.categoryName}</div>
      <div className={s.operation_list_item}>
        {symbol}
        {operationItem.sum}
        <span className="ruble_icon ruble_icon_transactions">₽</span>
      </div>
      {/* <div className={s.icons}>
        <button
        className={s.icon_button}
        type="submit"
        title="Удалить запись"
        onClick={() => {
          createDeleteModal(
            operation.categoryName,
            operation.id,
            symbol
          )
        }}
      >
        <div className={s.operation_list_icon1}></div>
      </button>
      <button
        className={s.icon_button}
        type="submit"
        title="Редактировать"
        onClick={() => {
          createModalChangeSum(
            operation.categoryName,
            operation.id,
            operation.category_id,
            operation.sum,
            symbol
          )
        }}
      >
        <div className={s.operation_list_icon2}></div>
      </button>
      </div> */}
    </div>
  )
}

export default Transaction

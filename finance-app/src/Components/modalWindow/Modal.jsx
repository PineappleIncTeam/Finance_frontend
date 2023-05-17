import style from "./Modal.module.css"

const Modal = ({ active, setActive, setInput, children }) => {
  return (
    <div
      className={active ? `${style.modal} ${style.active}` : style.modal}
      onClick={() => {
        setActive(false)
        setInput(false)
      }}
    >
      <div
        className={style.modal_content}
        onClick={(event) => event.stopPropagation()}
      >
        {children}
      </div>
    </div>
  )
}

export default Modal

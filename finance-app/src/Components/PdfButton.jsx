import style from "./PdfButton.module.css"

function PdfButton({ func }) {
  return (
    <>
      <button className={style.button} onClick={func}>
        Сохранить в PDF
      </button>
      <button className={style.button_mini} onClick={func}>
        PDF
      </button>
    </>
  )
}

export default PdfButton

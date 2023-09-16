import style from './PdfButton.module.css'

function PdfButton({ func }) {
    return (
        <button className={style.button} onClick={func}>Сохранить в PDF</button>
    )
}

export default PdfButton
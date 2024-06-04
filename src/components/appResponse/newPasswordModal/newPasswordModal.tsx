import React from "react"

import style from "./newPasswordModal.module.scss"

export const NewPasswordModal = () => {
return (
    <section className={style.newPasswordResponseModalWrap}>
        <div className={style.newPasswordResponseModalContainer}>
            <h1 className={style.newPasswordResponseModalContainer__title}>Письмо отправлено</h1>
            <p className={style.newPasswordResponseModalContainer__subtitle}>На адрес t***@mail.ru выслано письмо со ссылкой для восстановления доступа. </p>
            <p className={style.newPasswordResponseModalContainer__subtitle}>В случае, если не нашли письма, проверьте папку «Спам» и правильность введенного адреса.</p>
            <button className={style.repeatSendButton} type="submit">Повторить отправку</button>
        </div>
    </section>
)
}
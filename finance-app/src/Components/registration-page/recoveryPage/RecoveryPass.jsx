import { Formik, Form, Field } from "formik"
import Logo from "../../Logo"
import style from "./RecoveryPass.module.css"
import { Link } from "react-router-dom"

const RecoveryPass = () => {
  const validateEmail = (value) => {
    if (!value) {
      return "Обязательно"
    } else if (!/^[A-Z0-9._%+-]+@[A-Z0-9.-]+\.[A-Z]{2,4}$/i.test(value)) {
      return "Invalid email address"
    }
  }

  return (
    <div className={style.root}>
      <div className={style.formRegist}>
        <div className={style.logo}>
          <Logo />
        </div>
        <div className={style.regist}>
          <h1>Восстановление пароля</h1>
          <Formik
            initialValues={{
              email: "",
            }}
            onSubmit={(values) => {
              console.log("submit", values)
            }}
          >
            {({ errors, touched, values }) => (
              <Form className={style.form}>
                <label>Введите электронную почту</label>
                <Field
                  className={
                    values.email && errors.email
                      ? style.inputError
                      : style.input
                  }
                  type="email"
                  name="email"
                  validate={validateEmail}
                  placeholder="example@mail.ru"
                />
                <div className={style.error}>
                  {values.email && errors.email}
                </div>
                <button className={style.btn} type={"submit"}>
                  <Link to="/newpass" className={style.btn_link}>Восстановить</Link>
                </button>
              </Form>
            )}
          </Formik>
          <Link to="/" className={style.recovery}>
            Вернуться назад
          </Link>
        </div>
      </div>
      <div className={style.registFon}></div>
    </div>
  )
}

export default RecoveryPass

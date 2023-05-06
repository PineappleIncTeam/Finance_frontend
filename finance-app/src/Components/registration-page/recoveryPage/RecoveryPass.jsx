import { Formik, Form, Field } from "formik"
import axios from "axios"
import Logo from "../../Logo"
import style from "./RecoveryPass.module.css"
import { Link } from "react-router-dom"


const URL = 'http://92.255.79.239:8000/api/auth/users/reset_password/'

const RecoveryPass = () => {
  const validateEmail = (value) => {
    if (!value) {
      return "Обязательно"
    } else if (!/^[A-Z0-9._%+-]+@[A-Z0-9.-]+\.[A-Z]{2,4}$/i.test(value)) {
      return "Invalid email address"
    }
  }

  const sendEmail = async (values) => {
    const data = {
      email: values.email
    }

    try {
      const response = await axios.post(URL, data)
      console.log(response)
    } catch (error) {
      console.log(error)
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
            onSubmit={sendEmail}
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
                <button className={style.btn} type="submit">Восстановить
                  {/* <Link to="/newpass" className={style.btn_link}>Восстановить</Link> */}
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

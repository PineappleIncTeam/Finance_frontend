import { Formik, Form, Field } from "formik"
import queryString from "query-string"
import Logo from "../../Logo"
import { useNavigate } from "react-router"
import { Link, useLocation } from "react-router-dom"
import style from "./RecoveryPass.module.css"
import axios from "axios"
import { useState } from "react"


const URL = "http://92.255.79.239:8000/api/auth/users/reset_password_confirm/"

const NewPass = () => {

  const [message, setMessage] = useState('')

  const navigate = useNavigate()
  const location = useLocation()
  const { uid, token} = queryString.parse(location.search)
  console.log(location)

  const changePassword = async (values) => {
    const data = {
      uid: uid,
      token: token,
      new_password: values.password,
      re_new_password: values.confirmPassword
    }
    try {
      const response = await axios.post(URL, data)
      console.log(response)
      if (response.status === 204) {
        setMessage('Ваш пароль успешно изменен')
        setInterval(() => navigate('/'), 1000)
      }

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
              <h1>Изменение пароля</h1>
              <Formik
                initialValues={{
                  password: "",
                  confirmPassword: "",
                }}
                onSubmit={changePassword}
              >
                {({ errors, touched, values }) => (
                  <Form className={style.form}>
                    <label>Пароль</label>
                    <Field
                      className={
                        values.password && errors.password
                          ? style.inputError
                          : style.input
                      }
                      type="password"
                      name="password"
                      placeholder="Введите пароль"
                    />
                    <div className={style.error}>
                      {values.password && errors.password}
                    </div>
                    <label>Пароль</label>
                    <Field
                      className={
                        values.confirmPassword && errors.confirmPassword
                          ? style.inputError
                          : style.input
                      }
                      type="password"
                      name="confirmPassword"
                      placeholder="Повторите пароль"
                    />
                    <div className={style.message}>{message}</div>
                    <button className={style.btn} type="submit">Готово
                      {/* <Link to="/" className={style.btn_link}>Готово</Link> */}
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

export default NewPass
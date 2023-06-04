import { useState } from "react"
import { Formik, Form, Field } from "formik"
import { useNavigate } from "react-router"
import { Link, useLocation } from "react-router-dom"
import { URLS } from "../../../urls/urlsAndDates"
import axios from "axios"
import queryString from "query-string"
import Logo from "../../Logo"
import passNo from "./../../../Images/passNo.png"
import passYes from "./../../../Images/passYes.png"
import style from "./RecoveryPass.module.css"


const NewPass = () => {
  const [message, setMessage] = useState("")
  const [passwordType, setPasswordType] = useState({
    eye: passNo,
    type: "password",
  })
  const [confirmType, setConfirmType] = useState({
    eye: passNo,
    type: "password",
  })

  const navigate = useNavigate()
  const location = useLocation()
  const { uid, token } = queryString.parse(location.search)
  console.log(location)

  const changePassword = async (values) => {
    const data = {
      uid: uid,
      token: token,
      new_password: values.password,
      re_new_password: values.confirmPassword,
    }
    try {
      const response = await axios.post(URLS.resetPasswordConfirm, data)
      console.log(response)
      if (response.status === 204) {
        setMessage("Ваш пароль успешно изменен")
        setTimeout(() => navigate("/"), 3000)
      }
    } catch (error) {
      console.log(error)
    }
  }

  const togglePassInput = () => {
    if (passwordType.eye === passNo) {
      setPasswordType({ eye: passYes, type: "text" })
    } else if (passwordType.eye === passYes) {
      setPasswordType({ eye: passNo, type: "password" })
    }
  }

  const toggleConfirmInput = () => {
    if (confirmType.eye === passNo) {
      setConfirmType({ eye: passYes, type: "text" })
    } else if (confirmType.eye === passYes) {
      setConfirmType({ eye: passNo, type: "password" })
    }
  }

  function validatePass(value) {
    if (!value) return "Обязательно"
  }

  function validateConfirmPass(password, value) {
    if (!value) return "Обязательно"
    if (password !== value) return "Пароли не совпадают"
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
                <div className={style.pass}>
                  <Field
                    className={
                      touched.password && errors.password
                        ? style.inputError
                        : style.input
                    }
                    type={passwordType.type}
                    name="password"
                    placeholder="Введите пароль"
                    validate={validatePass}
                  />
                  <img
                    className={style.icon}
                    src={passwordType.eye}
                    alt="eye"
                    onClick={() => togglePassInput()}
                  ></img>
                  <div className={style.error}>
                    {touched.password && errors.password}
                  </div>
                </div>
                <label>Повторите пароль</label>
                <div className={style.pass}>
                  <Field
                    className={
                      touched.confirmPassword && errors.confirmPassword
                        ? style.inputError
                        : style.input
                    }
                    type={confirmType.type}
                    name="confirmPassword"
                    placeholder="Повторите пароль"
                    validate={(value) =>
                      validateConfirmPass(values.password, value)
                    }
                  />
                  <img
                    className={style.icon}
                    src={confirmType.eye}
                    alt="eye"
                    onClick={() => toggleConfirmInput()}
                  ></img>
                  <div className={style.error}>
                    {touched.confirmPassword && errors.confirmPassword}
                  </div>
                </div>
                <div className={style.message}>{message}</div>
                <button className={style.btn} type="submit">
                  Готово
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

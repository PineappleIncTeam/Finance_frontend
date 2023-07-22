import { Formik, Form, Field, ErrorMessage } from "formik"
import style from "./RegistPage.module.css"
import * as Yup from "yup"
import YupPassword from "yup-password"
import Logo from "../../Logo"
import axios from "axios"
import { Link, useNavigate } from "react-router-dom"
import { useState } from "react"
import { useDispatch } from "react-redux"
import { setUser } from "../../../store/slice"
import passNo from "./../../../Images/passNo.png"
import passYes from "./../../../Images/passYes.png"
import { useRef } from "react"
import { URLS } from "../../../urls/urlsAndDates"

YupPassword(Yup)

const RegistPage = () => {
  const [reply, setReply] = useState("")
  const [passwordType, setPasswordType] = useState(passNo)
  const [confirmType, setConfirmType] = useState(passNo)

  const dispatch = useDispatch()
  const navigate = useNavigate()
  const passRef = useRef(null)
  const confirmRef = useRef(null)
  const togglePassInput = () => {
    if (passwordType === passNo) {
      passRef.current.type = "text"
      setPasswordType(passYes)
    } else if (passwordType === passYes) {
      passRef.current.type = "password"
      setPasswordType(passNo)
    }
  }

  const toggleConfirmInput = () => {
    if (confirmType === passNo) {
      confirmRef.current.type = "text"
      setConfirmType(passYes)
    } else if (confirmType === passYes) {
      confirmRef.current.type = "password"
      setConfirmType(passNo)
    }
  }

  const registerHandler = async (values, { setSubmitting }) => {
    setPasswordType(passNo)
    setConfirmType(passNo)
    const payload = {
      email: values.email,
      username: values.username,
      password: values.password,
    }
    const payload2 = {
      username: values.username,
      password: values.password,
    }
    try {
      const response = await axios.post(URLS.registration, payload)

      response.data.email && setReply("Регистрация прошла успешно")
      axios.post(URLS.authorisation, payload2).then((response2) => {
        dispatch(
          setUser({
            token: response2.data.auth_token,
          })
        )
        response.data.auth_token &&
          setReply(
            `Пользователь ${payload.username} вошел в свою учетную запись`
          )

        navigate("/rectangle")
      })
    } catch (e) {
      console.log(e)
      e.response.data.username
        ? setReply(`Пользователь с логином ${payload.username} уже зарегистрирован`)
        : setReply(`Пользователь с таким Email уже зарегистрирован`)
    } finally {
      setSubmitting(false)
    }
  }

  const validationSchema = Yup.object({
    email: Yup.string()
      .email("Введен некорректный символ")

      .required("Обязательное поле"),
    username: Yup.string()
      .matches(/^[A-Za-z0-9_-]+$/, "Логин может содержать только латинские буквы и цифры")
      .min(6, "Логин должен состоять из 6 и более символов")
      .max(32, "Логин должен содержать от 6 до 32 символов")
      .required("Обязательное поле"),
    password: Yup.string()
      .matches(/^[A-Za-z0-9_-]+$/, "Введен некорректный символ")
      .required("Обязательное поле")
      .min(
        6,
        "Пароль должен состоять из 6 из более символов, среди которых хотя бы одна буква верхнего регистра и хотя бы одна цифра"
      )

      .minNumbers(
        1,
        "Пароль должен состоять из 6 из более символов, среди которых хотя бы одна буква верхнего регистра и хотя бы одна цифра"
      )
      .minUppercase(
        1,
        "Пароль должен состоять из 6 из более символов, среди которых хотя бы одна буква верхнего регистра и хотя бы одна цифра"
      )
      .max(32, "Не более 32 символов"),
    confirmPassword: Yup.string()
      .oneOf([Yup.ref("password")], "Пароли не совпадают")
      .required("Обязательное поле"),
  })

  return (
    <div className={style.root}>
      <div className={style.formRegist}>
        <div className={style.logo}>
          <Logo />
        </div>
        <div className={style.regist}>
          <h1>Регистрация</h1>
          <Formik
            initialValues={{
              email: "",
              username: "",
              password: "",
            }}
            validateOnBlur
            validationSchema={validationSchema}
            onSubmit={registerHandler}
          >
            {({ isValid, dirty, isSubmiting, values, errors }) => (
              <Form className={style.form} onChange={() => setReply("")}>
                <label>Адрес эл. почты</label>
                <Field
                  type="email"
                  name="email"
                  className={
                    values.email && errors.email
                      ? style.inputError
                      : style.input
                  }
                  placeholder={"Введите адрес эл. почты..."}
                />

                <div className={style.error}>
                  {values.email && errors.email}
                </div>

                {!values.email && (
                  <ErrorMessage
                    name="email"
                    component="div"
                    className={style.error}
                  />
                )}
                <br />
                <label>Логин</label>
                <Field
                  type="username"
                  name="username"
                  className={
                    values.username && errors.username
                      ? style.inputError
                      : style.input
                  }
                  placeholder={"Введите логин..."}
                />

                <div className={style.error}>
                  {values.username && errors.username}
                </div>
                {!values.username && (
                  <ErrorMessage
                    name="username"
                    component="div"
                    className={style.error}
                  />
                )}
                <br />
                <label>Пароль</label>
                <div className={style.pass}>
                  <Field
                    type="password"
                    name="password"
                    className={
                      values.password && errors.password
                        ? style.inputError
                        : style.input
                    }
                    placeholder={"Введите пароль..."}
                    innerRef={passRef}
                  />
                  <img
                    className={style.icon}
                    src={passwordType}
                    onClick={() => togglePassInput()}
                    alt="eye"
                  ></img>
                  <div className={style.error}>
                    {values.password && errors.password}
                  </div>
                  {!values.password && (
                    <ErrorMessage
                      name="password"
                      component="div"
                      className={style.error}
                    />
                  )}
                </div>
                <br />
                <label>Подтвердите пароль</label>
                <div className={style.pass}>
                  <Field
                    type="password"
                    name="confirmPassword"
                    className={
                      values.confirmPassword && errors.confirmPassword
                        ? style.inputError
                        : style.input
                    }
                    placeholder={"Введите пароль повторно..."}
                    innerRef={confirmRef}
                  />
                  <img
                    className={style.icon}
                    src={confirmType}
                    onClick={() => toggleConfirmInput()}
                    alt="eye"
                  ></img>
                  <div className={style.error}>
                    {values.confirmPassword && errors.confirmPassword}
                  </div>
                  {!values.confirmPassword && (
                    <ErrorMessage
                      name="confirmPassword"
                      component="div"
                      className={style.error}
                    />
                  )}
                </div>
                <br />
                <p className={style.textReg}>
                  <br />
                  <Link to="/" className={style.reg}>
                    {" "}
                    Я уже зарегистрирован
                  </Link>
                </p>
                <div className={style.only_lat_message}>*только латиница</div>
                <div className={style.reply}>{reply}</div>
                <button
                  className={style.btn}
                  type={"submit"}
                  disabled={!(isValid && dirty)}
                >
                  Вперед
                </button>
              </Form>
            )}
          </Formik>
        </div>
      </div>
      <div className={style.registFon}></div>
    </div>
  )
}

export default RegistPage

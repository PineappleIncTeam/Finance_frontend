import style from "./AuthReg.module.css"
import { Formik, Form, Field, ErrorMessage } from "formik"
import * as Yup from "yup"
import Logo from "../../Logo"
import axios from "axios"
import { useNavigate } from "react-router"
import { Link } from "react-router-dom"
import { useRef, useState } from "react"
import { useDispatch } from "react-redux"
import { setUser } from "../../../store/slice"
import { URLS } from "../../../urls/urlsAndDates"
import passNo from "./../../../Images/passNo.png"
import passYes from "./../../../Images/passYes.png"

const AuthReg = () => {
  const [reply, setReply] = useState("")
  const [passwordType, setPasswordType] = useState(passNo)
  const dispatch = useDispatch()
  const navigate = useNavigate()
  const passRef = useRef(null)

  const togglePassInput = () => {
    if (passwordType === passNo) {
      passRef.current.type = "text"
      setPasswordType(passYes)
    } else if (passwordType === passYes) {
      passRef.current.type = "password"
      setPasswordType(passNo)
    }
  }
  const registerHandler = async (values, { setSubmitting }) => {
    const payload = {
      username: values.username,
      password: values.password,
    }
    try {
      const response = await axios.post(URLS.authorisation, payload)
      dispatch(
        setUser({
          token: response.data.auth_token,
        })
      )

      response.data.auth_token &&
        setReply(`Пользователь ${payload.username} вошел в свою учетную запись`)

      navigate("/rectangle")
    } catch (e) {
      console.log(e)
      setReply(`Неверно введен логин или пароль`)
    } finally {
      setSubmitting(false)
    }
  }

  function resetReply() {
    setReply("")
  }
  const validationSchema = Yup.object({
    username: Yup.string()
      .matches(/^[A-Za-z0-9А-Яа-я@.]+$/, "Логин введен некорректно")
      .min(6, "Логин должен состоять из 6 и более символов")
      .max(32, "Логин должен содержать от 6 до 32 символов")
      .required("Обязательное поле"),
    // .minLowercase(
    //   1,
    //   "Логин должен содержать от 6 до 32 символов, включать хотя бы одну букву и одну цифру"
    // )
    // // .minUppercase(1, "password must contain at least 1 upper case letter")
    // .minNumbers(
    //   1,
    //   "Логин должен содержать от 6 до 32 символов, включать хотя бы одну букву и одну цифру"
    // )

    password: Yup.string()
      .matches(/^[A-Za-z0-9А-Яа-я]+$/, "Пароль введен некорректно")
      .min(6, "Слишком короткий пароль")
      .max(32, "Слишком длинный пароль")
      // .minLowercase(
      //   1,
      //   "Пароль должен содержать от 6 до 32 символов, включать хотя бы одну заглавную букву, одну строчную и одну цифру"
      // )
      // .minUppercase(
      //   1,
      //   "Пароль должен содержать от 6 до 32 символов, включать хотя бы одну заглавную букву, одну строчную и одну цифру"
      // )
      .minNumbers(
        1,
        "Пароль должен содержать от 6 до 32 символов, включать хотя бы одну букву и одну цифру"
      )
      .required("Обязательное поле"),
  })

  return (
    <div className={style.root}>
      <div className={style.formRegist}>
        <div className={style.logo}>
          <Logo />
        </div>
        <div className={style.regist}>
          <h1>Вход</h1>
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
            {({ isValid, dirty, isSubmiting }) => (
              <Form className={style.form} onChange={resetReply}>
                <br />
                <label>Логин</label>
                <Field
                  type="username"
                  name="username"
                  className={style.input}
                  placeholder={"Введите логин..."}
                />
                <ErrorMessage
                  name="username"
                  component="div"
                  className={style.error}
                />
                <br />
                <div className={style.password_recovery}>
                  <label>Пароль</label>
                  <Link to="recovery" className={style.recovery}>
                    Забыли пароль?
                  </Link>
                </div>
                <div className={style.pass}>
                  <Field
                    type="password"
                    name="password"
                    className={style.input}
                    placeholder={"Введите пароль..."}
                    innerRef={passRef}
                  />
                  <img
                    className={style.icon}
                    src={passwordType}
                    onClick={() => togglePassInput()}
                    alt="eye"
                  ></img>
                  <ErrorMessage
                    name="password"
                    component="div"
                    className={style.error}
                  />
                </div>

                <br />
                <p className={style.textReg}>
                  Если у вас нет учетной записи, <br />
                  <Link to="/login" className={style.reg}>
                    {" "}
                    зарегистрируйтесь
                  </Link>
                </p>
                <br />
                <div className={style.only_lat_message}>*только латиница</div>
                <div className={style.reply}>{reply}</div>
                <button
                  className={style.btn}
                  type={"submit"}
                  disabled={isSubmiting}
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

export default AuthReg

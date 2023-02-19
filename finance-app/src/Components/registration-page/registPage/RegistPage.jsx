import { Formik, Form, Field, ErrorMessage } from "formik";
import style from "./RegistPage.module.css";
import * as Yup from "yup";
import YupPassword from "yup-password";
import Logo from "../../Logo";
import axios from "axios";
import { Link, useNavigate } from "react-router-dom";
import { useState } from "react";
import { useDispatch } from "react-redux";
import { setUser } from "../../../store/slice";
import passNo from "./../../../Images/passNo.png";
import passYes from "./../../../Images/passYes.png";
import { useRef } from "react";

const URL = "http://92.255.79.239:8000/api/auth/users/";
const URL2 = "http://92.255.79.239:8000/api/auth/token/login/";
YupPassword(Yup);

const RegistPage = () => {
  const [reply, setReply] = useState("");
  const [passwordType, setPasswordType] = useState(passNo);
  const [confirmType, setConfirmType] = useState(passNo);
  const dispatch = useDispatch();
  const navigate = useNavigate();
  const passRef = useRef(null);
  const confirmRef = useRef(null);
  const togglePassInput = () => {
    if (passwordType === passNo) {
      passRef.current.type = "text";
      setPasswordType(passYes);
    } else if (passwordType === passYes) {
      passRef.current.type = "password";
      setPasswordType(passNo);
    }
  };

  const toggleConfirmInput = () => {
    if (confirmType === passNo) {
      confirmRef.current.type = "text";
      setConfirmType(passYes);
    } else if (confirmType === passYes) {
      confirmRef.current.type = "password";
      setConfirmType(passNo);
    }
  };

  const registerHandler = async (values, { setSubmitting }) => {
    setPasswordType(passNo);
    setConfirmType(passNo);
    const payload = {
      email: values.email,
      username: values.username,
      password: values.password,
    };
    const payload2 = {
      username: values.username,
      password: values.password,
    };
    try {
      const response = await axios.post(URL, payload);

      response.data.email && setReply("Регистрация прошла успешно");
      axios.post(URL2, payload2).then((response2) => {
        dispatch(
          setUser({
            token: response2.data.auth_token,
          })
        );
        response.data.auth_token &&
          setReply(
            `Пользователь ${payload.username} вошел в свою учетную запись`
          );

        navigate("/rectangle");
      });
    } catch (e) {
      console.log(e);
      setReply(`Пользователь с логином ${payload.username} существует`);
    } finally {
      setSubmitting(false);
    }
  };

  const validationSchema = Yup.object({
    email: Yup.string()
      .email("Введите верный email")
      .required("Обязательное поле"),
    username: Yup.string()
      .matches(/^[A-Za-z0-9А-Яа-я]+$/, "Логин введен некорректно")
      .min(6, "Слишком короткое имя")
      .max(32, "Слишком длинное имя")
      .minLowercase(
        1,
        "Логин должен содержать от 6 до 32 символов, включать хотя бы одну букву латинского алфавита и одну цифру"
      )
      // .minUppercase(1, "password must contain at least 1 upper case letter")
      .minNumbers(
        1,
        "Логин должен содержать от 6 до 32 символов, включать хотя бы одну букву латинского алфавита и одну цифру"
      )

      .required("Обязательное поле"),
    password: Yup.string()
      .required("Обязательное поле")
      .min(6, "Пароль должен содержать минимум шесть символов")
      .max(32, "Слишком длинный пароль")
      .minNumbers(1, "Пароль должен содержать хотя бы одну цифру")
      .minLowercase(
        1,
        "Пароль должен содержать символ с маленькой буквой латинского алфавита"
      ),
    confirmPassword: Yup.string()
      .oneOf([Yup.ref("password")], "Пароли не совпадают")
      .required("Обязательно"),
  });

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
            {({ isValid, dirty, isSubmiting }) => (
              <Form className={style.form}>
                <label>Адрес эл. почты</label>
                <Field
                  type="email"
                  name="email"
                  className={style.input}
                  placeholder={"Введите адрес эл. почты..."}
                />
                <ErrorMessage
                  name="email"
                  component="div"
                  className={style.error}
                />
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
                <label>Пароль</label>
                <span className={style.pass}>
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
                  ></img>
                  <ErrorMessage
                    name="password"
                    component="div"
                    className={style.error}
                  />
                </span>

                <br />
                <label>Подтвердите пароль</label>
                <div className={style.pass}>
                  <Field
                    type="password"
                    name="confirmPassword"
                    className={style.input}
                    placeholder={"Введите пароль повторно..."}
                    innerRef={confirmRef}
                  />
                  <img
                    className={style.icon}
                    src={confirmType}
                    onClick={() => toggleConfirmInput()}
                  ></img>
                  <ErrorMessage
                    name="confirmPassword"
                    component="div"
                    className={style.error}
                  />
                </div>

                <br />
                <p className={style.textReg}>
                  <br />
                  <Link to="/" className={style.reg}>
                    {" "}
                    Я уже зарегистрирован
                  </Link>
                </p>
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
      <div className={style.registFon}>
        {/* <div className={style.textFon}>
          <div className={style.welcome}>Добро пожаловать в FREENANCE</div>
          <div className={style.textConcept}>Помогаем cчитать быстро!</div>
        </div> */}
      </div>
    </div>
  );
};

export default RegistPage;

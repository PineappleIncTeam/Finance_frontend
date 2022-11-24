import { Formik, Form, Field, ErrorMessage } from "formik";
import style from "./RegistPage.module.css";
import * as Yup from "yup";
import Logo from "../../Logo";
import axios from "axios";
import { useNavigate } from "react-router-dom";
import { useState } from "react";
const URL = "http://92.255.79.239:8000/api/auth/users/";

const RegistPage = () => {
  const [reply, setReply] = useState("");

  const navigate = useNavigate();
  const registerHandler = async (values, { setSubmitting }) => {
    const payload = {
      email: values.email,
      username: values.username,
      password: values.password,
    };
    try {
      const response = await axios.post(URL, payload);

      console.log(response.data);
      response.data.email && setReply("Регистрация прошла успешно");
      navigate("/");
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
      .min(2, "Слишком короткое имя")
      .max(10, "Слишком длинное имя")
      .required("Обязательное поле"),
    password: Yup.string().required("Обязательное поле"),
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
                <Field
                  type="password"
                  name="password"
                  className={style.input}
                  placeholder={"Введите пароль..."}
                />
                <ErrorMessage
                  name="password"
                  component="div"
                  className={style.error}
                />
                <br />
                <label>Подтвердите пароль</label>
                <Field
                  type="password"
                  name="confirmPassword"
                  className={style.input}
                  placeholder={"Введите пароль повторно..."}
                />
                <ErrorMessage
                  name="confirmPassword"
                  component="div"
                  className={style.error}
                />
                <br />
                <div className={style.reply}>{reply}</div>
                <button
                  className={style.btn}
                  type={"submit"}
                  disabled={isSubmiting}
                >
                  Submit
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

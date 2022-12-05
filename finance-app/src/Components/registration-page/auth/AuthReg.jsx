import style from "./AuthReg.module.css";
import { Formik, Form, Field, ErrorMessage } from "formik";
import * as Yup from "yup";
import Logo from "../../Logo";
import axios from "axios";
import { useNavigate } from "react-router";
import { Link } from "react-router-dom";
import { useState } from "react";
import { useDispatch } from "react-redux";
import { setUser } from "../../../store/slice";

const URL = "http://92.255.79.239:8000/api/auth/token/login/";

const AuthReg = () => {
  const [reply, setReply] = useState("");
  const dispatch = useDispatch();
  const navigate = useNavigate();
  const registerHandler = async (values, { setSubmitting }) => {
    const payload = {
      username: values.username,
      password: values.password,
    };
    try {
      const response = await axios.post(URL, payload);
      dispatch(
        setUser({
          token: response.data.auth_token,
        })
      );

      response.data.auth_token &&
        setReply(
          `Пользователь ${payload.username} вошел в свою учетную запись`
        );

      navigate("/rectangle");
    } catch (e) {
      console.log(e);
      setReply(`Неверно введен логин или пароль`);
    } finally {
      setSubmitting(false);
    }
  };

  const validationSchema = Yup.object({
    username: Yup.string()
      .min(2, "Слишком короткое имя")
      .max(50, "Слишком длинное имя")
      .required("Обязательное поле"),
    password: Yup.string().required("Обязательное поле"),
  });

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
              <Form className={style.form}>
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
                <p className={style.textReg}>
                  Если у вас нет учетной записи, <br />
                  <Link to="/login" className={style.reg}>
                    {" "}
                    ЗАРЕГИСТРИРУЙТЕСЬ
                  </Link>
                </p>
                <br />
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

export default AuthReg;

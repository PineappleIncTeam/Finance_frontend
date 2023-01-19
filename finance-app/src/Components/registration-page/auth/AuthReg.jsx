import style from "./AuthReg.module.css";
import { Formik, Form, Field, ErrorMessage } from "formik";
import * as Yup from "yup";
import Logo from "../../Logo";
import axios from "axios";
import { useNavigate } from "react-router";
import { Link } from "react-router-dom";
import { useRef, useState } from "react";
import { useDispatch } from "react-redux";
import { setUser } from "../../../store/slice";
import passNo from "./../../../Images/passNo.png";
import passYes from "./../../../Images/passYes.png";

const URL = "http://92.255.79.239:8000/api/auth/token/login/";

const AuthReg = () => {
  const [reply, setReply] = useState("");
  const [passwordType, setPasswordType] = useState(passNo);
  const dispatch = useDispatch();
  const navigate = useNavigate();
  const passRef = useRef(null);

  const togglePassInput = () => {
    if (passwordType === passNo) {
      passRef.current.type = "text";
      setPasswordType(passYes);
    } else if (passwordType === passYes) {
      passRef.current.type = "password";
      setPasswordType(passNo);
    }
  };
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
      .matches(/^[A-Za-z0-9А-Яа-я]+$/, "Логин введен некорректно")
      .min(6, "Слишком короткое имя")
      .max(32, "Слишком длинное имя")
      .minLowercase(
        1,
        "Логин должен содержать от 6 до 32 символов, включать хотя бы одну букву и одну цифру"
      )
      // .minUppercase(1, "password must contain at least 1 upper case letter")
      .minNumbers(
        1,
        "Логин должен содержать от 6 до 32 символов, включать хотя бы одну букву и одну цифру"
      )

      .required("Обязательное поле"),
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

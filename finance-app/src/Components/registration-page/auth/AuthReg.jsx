import style from "./AuthReg.module.css";

import Logo from "../../Logo";
import axios from "axios";
import { useNavigate } from "react-router";
import { Link } from "react-router-dom";
import { useState } from "react";
import { useDispatch } from "react-redux";
import { setUser } from "../../../store/slice";

const URL = "http://127.0.0.1:8000/api/auth/token/login/";

const AuthReg = () => {
  const dispatch = useDispatch();
  const [reply, setReply] = useState("");
  const [login, setLogin] = useState("");
  const [pass, setPass] = useState("");

  const navigate = useNavigate();
  const handleClick = (login, pass) => {
    const payload = {
      username: login,
      password: pass,
    };

    axios
      .post(URL, payload)
      .then((response) => {
        console.log(response.data.auth_token);

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
      })
      .catch(() => setReply(`Логин или пароль введены неверно`));
  };

  return (
    <div className={style.root}>
      <div className={style.formRegist}>
        <div className={style.logo}>
          <Logo />
        </div>
        <div className={style.regist}>
          <h1>Вход</h1>
          <div className={style.form}>
            <br />
            <label className={style.label}>Логин</label>
            <input
              placeholder={"Введите логин..."}
              className={style.input}
              type="login"
              value={login}
              onChange={(e) => setLogin(e.target.value)}
            />
            <br />
            <label className={style.label}>Пароль</label>
            <input
              placeholder={"Введите пароль..."}
              className={style.input}
              type="password"
              value={pass}
              onChange={(e) => setPass(e.target.value)}
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
            <br />
            <button
              className={style.btn}
              type={"submit"}
              onClick={() => handleClick(login, pass)}
            >
              Вперед
            </button>
          </div>

          {/* <Formik
            initialValues={{
              username: "",
              password: "",
              confirmPassword: "",
            }}
            validateOnBlur
            validationSchema={validationSchema}
            onSubmit={registerHandler}
          >
            {({ isValid, dirty, isSubmiting }) => (
              <Form className={style.form}>
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
                  Submit
                </button>
              </Form>
            )}
          </Formik> */}
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

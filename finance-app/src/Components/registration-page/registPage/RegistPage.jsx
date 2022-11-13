import { Formik, Form, Field, ErrorMessage } from "formik";
import style from "./RegistPage.module.css";
import * as Yup from "yup";
import Logo from "../../Logo";
import axios from "axios";
import { useNavigate } from "react-router-dom";
const URL = "http://127.0.0.1:8000/api/auth/users/";

const RegistPage = () => {
  const navigate = useNavigate();
  const registerHandler = async (values, { setSubmitting }) => {
    const payload = {
      email: values.email,
      username: values.username,
      password: values.password,
    };
    try {
      const response = await axios.post(URL, payload);

      console.log(response.data.email.length);

      if (response.data.email.length > 0) {
        return navigate("/");
      }
    } catch (e) {
      console.log(e);
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
                <label>Логин</label>
                <Field type="email" name="email" className={style.input} />
                <ErrorMessage
                  name="email"
                  component="div"
                  className={style.error}
                />
                <br />
                <label>Имя</label>
                <Field
                  type="username"
                  name="username"
                  className={style.input}
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
                />
                <ErrorMessage
                  name="password"
                  component="div"
                  className={style.error}
                />
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
        <div className={style.textFon}>
          <div className={style.welcome}>Добро пожаловать в FREENANCE</div>
          <div className={style.textConcept}>Помогаем cчитать быстро!</div>
        </div>
      </div>
    </div>
  );
};

export default RegistPage;
